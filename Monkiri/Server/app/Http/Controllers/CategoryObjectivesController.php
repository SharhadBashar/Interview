<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\CategoryObjectives;
use Response;
use DB;

class CategoryObjectivesController extends Controller
{
    /**
     * Get a list of objectives for a particular lesson
     * 
     * @return \Illuminate\Http\Response
     */
    public function getCategoryObjectives(Request $request, $id) {
        $objectives = CategoryObjectives::where('categoryId', '=', $id)->get()->all();

        return Response::json($objectives);
    }
}
