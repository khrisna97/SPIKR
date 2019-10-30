<?php

use App\Events\MyEvent;
use App\Events\UserOnline;
use App\Model\AnggotaKelompok;
use App\Model\Kelompok;
use App\Repository\Data\Kelompokdatarepo;
use App\Repository\Data\UserdataRepo;
use App\User;
use Illuminate\Http\Request;
use Pusher\Pusher;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
where konselor did not have kelompok
SELECT * FROM `users` WHERE users.id not in (SELECT anggota_kelompok.user FROM anggota_kelompok) and users.role = 2
*/

Route::post('test/chat', function (){

    event(new MyEvent('hello world'));

});


Route::group(['middleware'=>'auth:api'],  static function (){

    Route::group(['prefix'=>'messages'], static function(){
        Route::get('','Chat\MessagesController@index');

        Route::get('{other_user_id}','Chat\PersonalMessageController@index');

        Route::put('','Chat\MessagesController@create');
    });

    Route::group(['prefix'=> 'websocket'], static function () {

        Route::group(['prefix'=>'kelompok'], static function (){
            Route::get('{id}', 'Chat\GroupChatController@index')->where('id', '[0-9]+');

            Route::group(['prefix'=>'chats'], static function () {

                Route::get('{id}', 'Chat\GroupChatController@chat_index')->where('id', '[0-9]+');
                Route::post('{id}', 'Chat\GroupChatController@create')->where('id', '[0-9]+');

            });
        });

        Route::group(['prefix'=> 'group'], static function () {

            Route::get('{id}','Chat\GroupChat@join');
            Route::post('message/{id}', 'Chat\GroupChat@message');
            Route::post('leave', 'API\C_pengguna@index');

        });

        Route::group(['prefix'=> 'konseling'], static function () {

            Route::group(['prefix'=> 'chat'], static function () {
                Route::get('{anggota_id}','Chat\KonselingChatController@index');
                Route::post('{receiver_id}','Chat\KonselingChatController@create');
            });
            Route::get('{konselor_id}','Chat\KonselingController@index');
            Route::get('{konselor_id}/{anggota_id}','Chat\KonselingController@userIndex');
        });
    });

    Route::get('konselorlist','Chat\KonselorListController');

    Route::group(['prefix'=> 'konselor'], static function () {
        Route::put('','Auth\RegisterController@KonselorRegistration');
        Route::group(['prefix'=> 'inbox'], static function () {
            Route::get('ingroup','Chat\KonselorMemberList@index');
            Route::get('all','Chat\KonselorMemberList@index1');
        });
    });

    Route::group(['prefix'=> 'pengguna'], static function () {
        Route::get('', 'API\C_pengguna@index');
        Route::get('{id}', 'API\C_pengguna@index');
        Route::post('{id}','API\C_pengguna@update');
        Route::put('create','API\C_pengguna@create');
    });

    Route::group(['prefix'=> 'kelompok'], static function () {
        Route::get('', 'API\C_kelompok@index');
        Route::get('{id}', 'API\C_kelompok@index');
        Route::post('join/{id}', 'API\C_kelompok@join')->where('id', '[0-9]+');
        Route::post('{id}', 'API\C_kelompok@update');
        Route::get('{id}/chat', 'Chat\GroupChat@index');
        Route::put('', 'API\C_kelompok@create');
    });

    Route::post('konselor/registration','Auth\RegisterController@KonselorRegistration');
    Route::group(['prefix'=> 'pengguna'], static function () {
        Route::get('', 'API\C_pengguna@index');
        Route::get('{id}', 'API\C_pengguna@index');
        Route::post('{id}','API\C_pengguna@update');
        Route::put('create','API\C_pengguna@create');
    });
    Route::group(['prefix'=> 'kasus'], static function () {

        Route::post('','API\C_kasus@create');

    });

    Route::group(['prefix'=>'statistik'], static function (){
        Route::get('', 'HomeController@QuickStats');
        Route::get('/kasus',"API\Statistic\C_KasusStats@index");
    });

});





Route::post('user/registration','Auth\RegisterController@UserRegistration');
Route::post('konselor/registration','Auth\RegisterController@KonselorRegistration');

Route::group(['prefix'=> 'kecamatan'], static function () {
    Route::get('', 'API\C_kecamatan@index');
});
Route::group(['prefix'=> 'pengguna'], static function () {
    Route::get('', 'API\C_pengguna@index');
    Route::get('{id}', 'API\C_pengguna@index');
    Route::post('{id}','API\C_pengguna@update');
    Route::put('create','API\C_pengguna@create');
    Route::delete('','API\C_pengguna@delete');
});

Route::group(['prefix'=> 'anggota'], static function () {
    Route::get('find/kelompok/{id}', static function ($id){
        $repo = new Kelompokdatarepo();
        return $repo->getkelompok($id);
    });
});

Route::get('kasus',"API\C_kasus@index");

Route::get('allkecamatan','HomeController@allKecamatan');
Route::group(['prefix'=>'galeri'], function (){
    Route::get('{galeri}','API\GalleryManagementController@index');
    Route::get('','API\GalleryController@index');
    Route::post('','API\GalleryManagementController@create');
    Route::delete('{galeri}','API\GalleryManagementController@delete');
});
Route::group(['prefix'=>'berita'], function (){
    Route::get('{content}','API\ContentManagementController@index');
    Route::get('','API\ContentController@index');
    Route::post('','API\ContentManagementController@create');
    Route::delete('{berita}','API\ContentManagementController@delete');
});