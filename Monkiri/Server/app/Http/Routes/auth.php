<?php

/*
|--------------------------------------------------------------------------
| Authorization Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::group(['prefix' => 'auth', 'middleware' => 'guest'], function() {
    Route::get('/login', 'Auth\LoginController@getLogin')->name('login');
});

Route::group(['prefix' => 'auth'], function() {
    Route::get('{social}', 'Auth\LoginController@getSocialRedirect');
    Route::get('{social}/callback', 'Auth\LoginController@getSocialCallback');
    
    Route::get('logout', 'Auth\LoginController@logout');
    Route::post('auth/login/facebook', 'Auth\LoginController@socialLoginFacebook');
    Route::delete('auth/logout/facebook', 'Auth\LoginController@socialLogoutFacebook');

    
    Route::get('user/categorieswithfavorites/{userId}', 'UserDataController@getCategoriesWithfavorites');

    Route::get('user/favoritecategories/{userId}', 'UserDataController@getFavoriteCategories');
    Route::post('user/favoritecategories', 'UserDataController@setFavoriteCategory');
    Route::put('user/favoritecategories', 'UserDataController@updateFavoriteCategory');
    Route::delete('user/favoritecategories', 'UserDataController@unsetFavoriteCategory');

    Route::post('user/sendfeedback', 'EmailController@sendFeedback');
    
    //temp    
    Route::get('auth/login/fakefacebook', 'Auth\LoginController@fakeLoginFacebook');
});

