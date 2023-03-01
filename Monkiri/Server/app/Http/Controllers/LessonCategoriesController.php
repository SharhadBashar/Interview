<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\LessonCategories;
use App\Lessons;
use Response;
use DB;
class LessonCategoriesController extends Controller
{
    /**
     * Get a list of all lessons along with images associated with them
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {						
        $lessoncategories = DB::table('lessoncategories')
                ->join('images', 'lessoncategories.image_id', '=', 'images.id')
				->select('lessoncategories.*', 'images.image_link')
                ->get();
                                          
        return Response::json($lessoncategories);		
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
	public function store(Request $request)
    {
        
		$category = new LessonCategories;
        
        if(isset($request['name'])){
            $category->name = $request['name'];
        }   
        if(isset($request['color'])){
            $category->color = $request['color'];
        }   
        $category->image_id = 1;
        $category->save();
        
        return ['response' => ('Create successful ('.$category->name.', '.$category->color.')')];
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {        
        $category = LessonCategories::find($id);
        
        //set data
        if(isset($request['name'])){
            $category->name = $request['name'];
        }        
        
        if(isset($request['color'])){
            $category->color = $request['color'];
        }
        
        $category->update();
        
        return ['response' => ('Update successful ('.$category->name.', '.$category->color.')')];
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $category = LessonCategories::find($id);
		$category->delete();
        return ['response' => ('Category record successfully deleted (id:'.$id.')')];
    }
}
