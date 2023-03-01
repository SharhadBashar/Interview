<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use stdClass;
use DB;
use Log;

/**
 * Define the types of questions as constant. Should match up with the
 * 'lessonquestions' question type enum in the database
 */
class QuestionType
{
    const MULTIPLE_CHOICE = 'multiplechoice';
    const TRUE_FALSE = 'truefalse';
    const VIDEO = 'video';
	const WORDIMAGE = 'wordimage';
	const INPUT = 'input';
	const TEXT = 'text';
}

class QuestionTable{
    const MC = "questions_multiplechoice";
    const TF = "questions_truefalse";
    const Word = "questions_word";
}

class QuestionDataTable{
    const MC = "questions_multiplechoice_options";
    const Word = "questions_word_data";    
}

class LessonQuestions extends Model
{
    public $timestamps = false;
    protected $table = 'lessonquestions';

    /**
     * Get the stuctured question of this particular question
     * 
     * @return stdClass The question based off the type
     */
    public function getQuestion() {
        switch($this->type) {
            case QuestionType::TRUE_FALSE:
                return $this->getTrueFalseQuestion();
            case QuestionType::MULTIPLE_CHOICE:
                return $this->getMultipleChoiceQuestion();
			case QuestionType::WORDIMAGE:
                return $this->getWordImageQuestion();
            case QuestionType::INPUT:
                return $this->getWordImageQuestion();
            default:
                return $this->type;
        }
    }
    
    /**
     * Create the stuctured question of this particular question
     */
    public function createQuestionData($questionId, $questionType, $answerData){

        if($questionType == QuestionType::WORDIMAGE){
            $id = $this->createQuestionTableID($questionId, QuestionTable::Word);            
            $components = array();
            foreach($answerData as &$component){
                $components[] = array('questionsWordId'=>$id, 'type'=> $component['type'], 'value'=>$component['value']);            
            }
            $this->createQuestionTableData($components, QuestionDataTable::Word);
        }else if($questionType == QuestionType::INPUT){
            
            $id = $this->createQuestionTableID($questionId, QuestionTable::Word);  
            $components = array();
            foreach($answerData as &$component){
                
                $answers = implode("|", $component['extra']); //convert array to string (reconverted to array on 'get')
                $components[] = array('questionsWordId'=>$id, 'type'=> $component['type'], 'value'=>$component['value'], 'extra'=>$answers);            
            }
            $this->createQuestionTableData($components, QuestionDataTable::Word);
        }else if($questionType == QuestionType::MULTIPLE_CHOICE){
            
            $id = $this->createQuestionTableID($questionId, QuestionTable::MC);                
             $components = array();
            foreach($answerData as $component){
                $components[] = array('questionsMultipleChoiceId'=>$id, 'value'=>$component['value'], 'answer'=> $component['answer']);            
            }
            $this->createQuestionTableData($components, QuestionDataTable::MC);            
            
        }else if ($questionType == QuestionType::TRUE_FALSE){
            //answer is a boolean for t/f questions            
            $isTrue = $answerData[0]; //get 'TRUE' key       
            DB::table(QuestionTable::TF)->insertGetId(
                ['lessonQuestionsId' => $questionId,
                'answer'=> $isTrue['answer']]);            
        }
        
        return true;
    }
    
     
    /**
     * Update the stuctured question of this particular question
     */
    public function updateQuestionData($questionId, $questionType, $answerData){
        
        if($questionType == QuestionType::WORDIMAGE || $questionType == QuestionType::INPUT){
            $qw = $this->getQuestionsWordID($questionId);        
            if($qw){// delete all occurences of questions_word where lessonQuestionid = $questionid
                //remove previous questionData if they exist
                DB::table('questions_word_data')->where('questionsWordId', '=', $qw->id)->delete();
            } else {
                //create new questionData if it does not exist
                $qwid = $this->createQuestionTableID($questionId, QuestionTable::Word);  
                $qw = new stdClass();  
                $qw->id = $qwid;
            }

            // create row data
            $components = array();        
            foreach($answerData as $component){
                $type = $component['type'];
                if($type=="input"){ //input type questions have 
                    $answers = implode("|", $component['extra']); //convert array to string (reconverted to array on 'get')
                    $components[] = array('questionsWordId'=>$qw->id, 'type'=> $component['type'], 'value'=>$component['value'], 'extra'=> $answers);
                }else{
                    $components[] = array('questionsWordId'=>$qw->id, 'type'=> $component['type'], 'value'=>$component['value'], 'extra'=> null);  
                }
            }

            $this->createQuestionTableData($components, QuestionDataTable::Word);

        }else if ($questionType == QuestionType::MULTIPLE_CHOICE){
            $qmc = $this->getQuestionTableID($questionId, QuestionTable::MC);
            if($qmc){//delete all occurences of questions_multiplechoice where lessonQuestionid = $questionid
                DB::table(QuestionDataTable::MC)->where('questionsMultipleChoiceId', '=', $qmc->id)->delete();
            }else{
                //create new questionData if it does not exist
                $qmcId = $this->createQuestionTableID($questionId, QuestionTable::MC);//18
                $qmc = new stdClass();
                $qmc->id = $qmcId;
            }
            
            // create row data
            $compoenents = array();
            foreach($answerData as &$component){
                $components[] = array('questionsMultipleChoiceId'=>$qmc->id, 'value'=>$component['value'], 'answer'=> $component['answer']);    
            }
            
            $this->createQuestionTableData($components, QuestionDataTable::MC);    
        }else if ($questionType == QuestionType::TRUE_FALSE){
            
            $qtf = $this->getQuestionTableID($questionId, QuestionTable::TF);
             $isTrue = $answerData[0]; //get 'TRUE' key           
            
            DB::table(QuestionTable::TF)
            ->where('lessonQuestionsId', $questionId)
            ->update(['answer' => $isTrue['answer']]);            
        }
    }
    
    /**
     * Create new instance in 'QuestionTable' with the question ID
     */
    public function createQuestionTableID($questionId, $questionTable){
        return DB::table($questionTable)->insertGetId(
                ['lessonQuestionsId' => $questionId]
        );        
    }
    
    /**
     * Create new instance in the questions_word_data table for a new question 
     */
    public function createQuestionTableData($components, $questionDataTable){
        DB::table($questionDataTable)->insert($components);            
    }
    
    public function getQuestionTableID($questionId, $questionTable){
        return DB::table($questionTable)
            ->where('lessonQuestionsId', '=', $questionId)
            ->select(['id', 'lessonQuestionsId'])
            ->first();           
    }
    
    
    /**
     * Get ID for questions_word table by question ID 
TODO - REPLACE WITH getQuestionTableID  
     */
    public function getQuestionsWordID($questionId){
        return DB::table('questions_word')
            ->where('lessonQuestionsId', '=', $questionId)
            ->select(['id', 'lessonQuestionsId'])
            ->first();   
    }
    

    /**
     * Generate the structure of a multiple choice question
     * 
     * @return stdClass The question 
     */
    private function getMultipleChoiceQuestion() {
        
        // Get the MC question
        $question = DB::table('questions_multiplechoice')
            ->where('lessonQuestionsId', '=', $this->id)
            ->select(['id', 'lessonQuestionsId'])
            ->first();
        
        if($question){      
            // Get the possible answers for the question
            $options = DB::table('questions_multiplechoice_options')
                ->where('questionsMultipleChoiceId', '=', $question->id)
                ->get(['id', 'value', 'answer']);
            
            // Add the options to the question data
            $question->options = $options;
        }
        Log::debug((array) $question);

        return $question;
    }

    /**
     * Generate the structure of a true/false question
     * 
     * @return stdClass The question 
     */
    private function getTrueFalseQuestion() {    
        $question = DB::table(QuestionTable::TF)
            ->where('lessonQuestionsId', '=', $this->id)
            ->select(['id', 'lessonQuestionsId', 'answer'])            
            ->first();
        
        return $question;
    }
	
	 /**
     * Generate the structure of a word/image/input question
     * 
     * @return stdClass The question 
     */
    private function getWordImageQuestion() {        
        // Get the MC question
        $question = DB::table('questions_word')
            ->where('lessonQuestionsId', '=', $this->id)
            ->select(['id', 'lessonQuestionsId'])
            ->first();
        
        if($question){
            // Get the content the question
            $options = DB::table('questions_word_data')
                ->where('questionsWordId', '=', $question->id)
                ->get(['id', 'type', 'value', 'extra']);
            
            
            $components = array();          
            foreach($options as &$component){            
                $answers = explode("|", $component->extra);
                $component->extra = $answers;      
            }
                
            // Add the options to the question data
            $question->options = $options;
            Log::debug((array) $question);
        }
        
        return $question;
    }    
}
