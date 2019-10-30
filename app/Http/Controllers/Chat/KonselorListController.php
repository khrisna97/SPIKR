<?php

namespace App\Http\Controllers\Chat;

use App\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Http\Response;

class KonselorListController extends Controller
{
    //
    final public function __invoke() : Response
    {

        $konselorlist = User::whereRole(2)->join('userdata','users.id','=','userdata.id');
        if (request()->has('name')){
            $konselorlist = $konselorlist->where('userdata.nama', 'like', '%' . request()->query('name') . '%');
        }
        $konselorlist->orderBy('userdata.online','DESC')->orderBy('userdata.nama','ASC');

        $paginator = $konselorlist->paginate(10);

        $paginator->transform(static function (User $user){
            return $user->web_socket();
        });

        return response($paginator);
    }
}