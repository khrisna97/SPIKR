<?php

namespace App\Http\Controllers\API;

use App\Content;
use App\Http\Controllers\Controller;

class ContentController extends Controller
{
    public function index(){
        $paginate = Content::query()->orderBy('id','DESC')->paginate(request()->input('per_page')?:10);
        $paginate->transform(function ($item){
            return $item->paginateformat();
        });

        return response($paginate);
    }
}