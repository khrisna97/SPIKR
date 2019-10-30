<?php

namespace App\Http\Controllers\API;

use App\Content;
use App\Http\Requests\CreateContentRequest;
use App\Http\Controllers\Controller;
use File;
use Storage;

class ContentManagementController extends Controller
{

    public function index(Content $content){
        return response($content->format());
    }

    public function create(CreateContentRequest $request){
        $disk = Storage::disk('konten');

        $create = Content::create(
            ['judul'=>$request->input('judul')]
        );

        if ($create){
            $disk->makeDirectory($create->id);
            $disk->put($create->id.'/delta.json', ($request->input('konten')) );
        }
        return response(['status'=>'created']);
    }

    public function delete(Content $berita){
        $disk = Storage::disk('konten');

        $berita->delete();

        if (!$disk->deleteDirectory($berita->id)){
            return response(['status'=>'cannot be delete'], 500);
        }

        return response(['status'=>'deleted']);
    }


}