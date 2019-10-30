<?php

namespace App\Http\Controllers\API;

use App\DataGaleri;
use App\Galeri;
use App\Http\Requests\GalariesRequest;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\VarDumper\Cloner\Data;

class GalleryManagementController extends Controller
{

    final public function index(Galeri $galeri){

        $disk = Storage::disk('galeri');

        $direktori = $disk->allFiles($galeri->id);
        $captions = $galeri->Captions;

        collect($direktori)->each(function ($file, $index) use ($disk, $captions){

            $path = url($disk->url('galeri/'.$file));
            $captions[$index] = $captions[$index]->format($path);

        });

        return response(
            [
                'id'=>$galeri->id,
                'judul'=>$galeri->judul,
                'images'=>$captions,
                'waktu'=>$galeri->created_at->locale('ID')->isoFormat('dddd, D MMMM Y')
            ]
        );

    }

    final public function create(GalariesRequest $request) {

        $creating = Galeri::create(
            [
                'judul'=>$request->input('judul')
            ]
        );

        if ($creating){

            $path = $creating->id;

            Storage::disk('galeri')->makeDirectory($path);

            $images = $request->allFiles()['images'];
            $captions = $request->input('captions');

            foreach ($images as $index=>$image){
                $create = DataGaleri::create(
                    [
                        'caption'=>$captions[$index],
                        'galeri_id'=>$creating->id,
                    ]
                );
                if ($create){
                    $image->storeAs('public/galeri/'.$path , $create->id.'.'.$image->getClientOriginalExtension());
                }
            }
        }
    }

    final public function delete(Galeri $galeri){
        $disk = Storage::disk('galeri');

        if (!$galeri->Captions()->delete()){
            return response(['status'=>'data gallery not deleted'], 500);
        }

        if (!$galeri->delete()){
            return response(['status'=>'gallery not deleted'], 500);
        }

        $disk->deleteDirectory($galeri->id);
        return response(['status'=>'deleted']);
    }
}