<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\LessonCategories;
use App\Lessons;
use App\User;
use App\UserDataModels\FavoriteCategories;
use Response;
use Log;
use DB;
use Carbon\Carbon;

use stdClass;

class UserDataController extends Controller
{
    public $timestamps = false;
    /**
     * Display the user's favorite categories.
     *
     * @param  userID
     * @return array of favorited lessons
     */
    public function getFavoriteCategories($uId)
    {
        $userId = User::where('provider_id', $uId)->select('id')->get()->first();
        //get user's categories ordered by usage
        $favCategoryData = FavoriteCategories::where('userId', $userId->id)->select('categoryId', 'progress')
        ->orderBy('updated_at', 'DESC')->get();
        
        $favCategories = array();
        if ($favCategoryData) {
            
            //for each id get the category data for it along with user progress
            foreach ($favCategoryData as $catData) {
                $category = LessonCategories::where('lessoncategories.id', $catData->categoryId)
                ->join('images', 'lessoncategories.image_id', '=', 'images.id')
                ->select('lessoncategories.*', 'images.image_link')
                ->first();

                $category->progress = $catData->progress;
                $category->lessonCount = Lessons::where('categoryId', $category->id)->count();

                array_push($favCategories, $category);
            }
        }
        return $favCategories;
    }
            
    /**
     * Add category to the user's favorite category list.
     *
     * @return \Illuminate\Http\Request userID and categoryID
     * @return Array response: status code
     */
    public function setFavoriteCategory(Request $request)
    {
        Log::debug('id:'.$request['userID']);
        $user = User::where('provider_id', $request['userID'])->get()->first();
        Log::debug('userisd:');
        Log::debug((array) $user);
        
        if (isset($request['categoryID'])) {
            $catId = $request['categoryID'];
            $userID = $user->id;
            $current_date_time = Carbon::now()->toDateTimeString();
            //if it exists, update
            Log::debug("catID:".$catId.', userid:'.$userID);
            $doesExist = ['userId' => $userID, 'categoryId' => $catId];
            $favoriteCategory = FavoriteCategories::where($doesExist)->first();
            if ($favoriteCategory) {
                Log::debug((array) $favoriteCategory);
                $favoriteCategory->updated_at = $current_date_time;
                $favoriteCategory->update();
                return ['response' => 'category updated'];
            } else {
                $favoriteCategory = new FavoriteCategories;
                $favoriteCategory->userId = $userID;
                $favoriteCategory->categoryId = $catId;
                $favoriteCategory->progress = 0;
                $favoriteCategory->created_at = $current_date_time;
                $favoriteCategory->updated_at = $current_date_time;
                $favoriteCategory->save();
                return ['response' => 'category saved'];
            }
        }

        return ['response' => 'categoryID not set'];//TODO error checking
    }
           
    /**
     * Removed category from user's favorite category list.
     *
     * @return \Illuminate\Http\Request userID and categoryID
     * @return Array response: status code
     */
    public function unsetFavoriteCategory(Request $request)
    {
        $userId = User::where('provider_id', $request['userID'])->select('id')->get()->first();
        $catId = $request['categoryID'];
        $userID = $userId->id;
        $favoriteCategory = FavoriteCategories::where('userId', $userID)->where('categoryId', $catId)->first();
        $favoriteCategory->delete();
        return ['response' => ('Favorite category record successfully deleted')];//TODO error checking
    }

    /**
     * update the user's favorite category list.
     *
     * @return \Illuminate\Http\Request userID and categoryID
     * @return Array response: status code
     */
    public function updateFavoriteCategory(Request $request)
    {

        $userId = User::where('provider_id', $request['userID'])->select('id')->get()->first();
                
        if (isset($request['categoryID'])) {
            $catId = $request['categoryID'];
            $userID = $userId->id;
            $current_date_time = Carbon::now()->toDateTimeString();
            Log::debug("catID:".$catId.', userid:'.$userID);
            $doesExist = ['userId' => $userID, 'categoryId' => $catId];
            $favoriteCategory = FavoriteCategories::where($doesExist)->first();
            if ($favoriteCategory) {
                Log::debug((array) $favoriteCategory);
                Log::debug('current'. $favoriteCategory->progress. ', new:'. $request['progress']);
                $favoriteCategory->updated_at = $current_date_time;
                $favoriteCategory->progress = $request['progress'];
                $favoriteCategory->update();
                return ['response' => 'category updated'];
            } else {//doesn't exist so add the category to their favorites
                $favoriteCategory = new FavoriteCategories;
                $favoriteCategory->userId = $userID;
                $favoriteCategory->categoryId = $catId;
                $favoriteCategory->progress = $request['progress'];
                $favoriteCategory->created_at = $current_date_time;
                $favoriteCategory->updated_at = $current_date_time;
                $favoriteCategory->save();
                return ['response' => 'category saved'];
            }
        }

        return ['response' => 'categoryID not set'];
    }

    /**
    * Get all favorite categories along with the user's progress.
    *
    * @param  userID
    * @return array of favorited lessons
    */
    public function getCategoriesWithfavorites($uId)
    {
        $user = User::where('provider_id', $uId)->select('id')->get()->first();

        $categories = LessonCategories::join('images', 'lessoncategories.image_id', '=', 'images.id')
                ->join('lessons', 'lessoncategories.id', '=', 'lessons.categoryId')
                ->leftJoin('monkiri_users.user_favorite_categories as ufc', function($join) use ($user) {
                    $join->on('lessoncategories.id', '=', 'ufc.categoryId');
                    $join->where('ufc.userId', '=', $user->id);
                })
                ->select('lessoncategories.*', 'images.image_link', 'ufc.progress', DB::raw("(SELECT count(*) from lessons WHERE lessoncategories.id = lessons.categoryId) count"))
                ->groupBy('lessoncategories.id')
                ->orderBy('ufc.progress', 'DESC')->get();

        return Response::json($categories);
    }
}
