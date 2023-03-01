<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Lessons;
use App\LessonObjectives;
use Response;
use DB;

class LessonObjectivesController extends Controller
{
    /**
     * Get a list of objectives for a particular lesson
     * 
     * @return \Illuminate\Http\Response
     */
    public function getLessonObjectives(Request $request, $id) {
        $objectives = LessonObjectives::where('lessonId', '=', $id)->get()->all();

        return Response::json($objectives);
    }
}
