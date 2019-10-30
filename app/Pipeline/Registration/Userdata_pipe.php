<?php

namespace App\Pipeline\Registration;
use App\Model\Userdata;
use App\User;
use Closure;
use RuntimeException;

class Userdata_pipe
{
    final public function handle(User $user, Closure $next)  {
        $userdata = Userdata::create(array_merge(['id' =>$user->id], request()->input('userdata')));
        if (!$userdata){
            $user->delete();
            throw new RuntimeException('User data not saved');
        }
        return $next($user);
    }
}