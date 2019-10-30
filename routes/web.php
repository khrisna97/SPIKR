<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


Route::auth();


Route::group(['prefix'=> 'pengguna','middleware'=>['auth']], static function () {
    Route::post('delete','API\C_pengguna@delete');
});


Route::view('/{path?}', 'layouts.app')
    ->where('path', '.*')
    ->where('path', '^((?!api).)*$')
    ->where('path', '^((?!storage).)*$');