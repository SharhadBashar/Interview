<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', function () {
    return view('welcome');
});


Route::group(['prefix' => 'api'], function() {
    Route::resource('lessoncategories', 'LessonCategoriesController');
    Route::resource('challenges', 'ChallengesController');
    Route::resource('servicecategories', 'ServiceCategoriesController');
    
    Route::get('lesson/{id}', 'LessonsController@getLesson');
    Route::put('lesson/{id}' , 'LessonsController@updateLesson');
    Route::post('lesson' , 'LessonsController@createLesson');
    Route::delete('lesson/{id}' , 'LessonsController@destroyLesson');
    
    Route::get('lessonquestions/{id}', 'LessonsController@getLessonQuestions');
    Route::put('lessonquestions/{id}', 'LessonsController@updateQuestion');
    Route::post('lessonquestions' , 'LessonsController@createQuestion');
    Route::delete('lessonquestions/{id}' , 'LessonsController@destroyQuestion');
    
    Route::get('objectives_lesson/{id}', 'LessonObjectivesController@getLessonObjectives');
    Route::get('objectives_category/{id}', 'CategoryObjectivesController@getCategoryObjectives');	
});

