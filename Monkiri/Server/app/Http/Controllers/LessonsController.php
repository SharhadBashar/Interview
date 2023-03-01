<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Lessons;
use App\LessonQuestions;
use Response;
use DB;
use Carbon\Carbon;
use Log;

class LessonsController extends Controller
{
    /**
     * Get a list of all lessons for a category
     *
     * @return \Illuminate\Http\Response
     */
    public function getLesson(Request $request, $id)
    {
        				
        $lessons = Lessons::where('categoryId', '=', $id)
            ->join('images', 'lessons.image_id', '=', 'images.id')
            ->select('lessons.*', 'images.image_link')
            ->get();
												
        return Response::json($lessons);	
        
       // return Response::json(Lessons::where('categoryId', '=', $id)->get()->all());
    }

    /**
     * Get a list of questions for a particular lesson
     * 
     * @return \Illuminate\Http\Response
     */
    public function getLessonQuestions(Request $request, $id) {
        $questions = LessonQuestions::where('lessonId', '=', $id)->get()->all();
        // Loop through all the questions and populate extra fields by type
        foreach($questions as &$q) {
            $q->questionData = $q->getQuestion();
        }

        return Response::json($questions);
    }

    /**
     * Create a new lesson
     * 
     * @return \Illuminate\Http\Response
     */
    public function createLesson(Request $request) {        
		$lesson = new Lessons;
        $current_date_time = Carbon::now()->toDateTimeString(); 
        if(isset($request['name'])){
            $lesson->name = $request['name'];
        }   
        if(isset($request['categoryID'])){
            $lesson->categoryId = $request['categoryID'];
        }   
        $lesson->image_id = 1; //todo:get image
        $lesson->created_at = $current_date_time;
        $lesson->updated_at = $current_date_time;
        
        $lesson->save();
        
        return ['response' => ('Create successful ('.$lesson->name.')')];
    }
    
    /**
     * Update an existing lesson
     * 
     * @return \Illuminate\Http\Response
     */
    public function updateLesson(Request $request, $id)
    {        
        $lesson = Lessons::find($id);
        //set data
        $current_date_time = Carbon::now()->toDateTimeString(); 
        $lesson->updated_at = $current_date_time;
        
        if(isset($request['name'])){
            $lesson->name = $request['name'];
        }   
        
        $lesson->update();
        
        return ['response' => ('Update successful ('.$lesson->name.')')];
    }

    
    /**
     * Remove an existing lesson
     * 
     * @return \Illuminate\Http\Response
     */
    public function destroyLesson($id)
    {
        $lesson = Lessons::find($id);
		$lesson->delete();
        return ['response' => ('Lesson record successfully deleted (id:'.$id.')')];
    }
    
    
    /**
     * Create a new question. Answer data is handled in createQuestionData()
     * 
     * @return \Illuminate\Http\Response
     */
    public function createQuestion(Request $request) {      
        $question = new LessonQuestions;
        
        if(isset($request['name'])){
            $question->name = $request['name'];
            $question->question = $request['question'];
        }   
        if(isset($request['lessonID'])){
            $question->lessonId = $request['lessonID'];
        }   
        $question->type = $request['type'];
        $question->save();
        $question->createQuestionData($question->getKey(), $question->type, $request['answerData']);
        return ['response' => ('Question creation successful ('.$question->name.')')];
    }
    
    /**
     * Update an existing question
     * 
     * @return \Illuminate\Http\Response
     */
    public function updateQuestion(Request $request, $id)
    {        
        $question = LessonQuestions::find($id);
        //set data
        
        if(isset($request['name'])){
            $question->name = $request['name'];
            $question->question = $request['question'];
        }   
        if(isset($request['type'])){
            $question->type = $request['type'];
        }   
        $question->update();
        $question->updateQuestionData($question->getKey(), $question->type, $request['answerData']);
        return ['response' => ('Update successful (id:'.$id.')')];
    }
    
    
    /**
     * Remove an existing question
     * 
     * @return \Illuminate\Http\Response
     */
    public function destroyQuestion($id)
    {
        $question = LessonQuestions::find($id);
        if($question){
            $question->delete();
            return ['response' => ('Question record successfully deleted (id:'.$id.').')];
        } else {
            return ['response' => ('Cannot find record with id ='.$id.'.')];            
        }
    }
}
