<?php

namespace App\Http\Controllers\Chat;


use App\Repository\MessenggerRepository;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Http\Response;

class KonselorMemberList extends Controller
{
    final public function index (Request $request) : Response {

        $repo = new MessenggerRepository();

        return response($repo->konselorGetInGroup());
    }

    final public function index1 (Request $request) : Response {

        $repo = new MessenggerRepository();

        return response($repo->konselorAllInbox());
    }
}