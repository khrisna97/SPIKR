<?php

namespace App\Http\Controllers\API;

use App\Galeri;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class GalleryController extends Controller
{
    public function index(){
        $paginate = Galeri::query()->orderBy('id','DESC')->paginate(request()->input('per_page')?:10);

        $paginate->transform(function ($item){
            return $item->paginateFormat();
        });

        return response($paginate);

    }
}
