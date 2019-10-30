<?php


namespace App\Pipeline\Registration;


use App\User;
use Closure;

class AssignRole_pipe
{
    final public function handle(User $user, Closure $next)  {
        switch ((int)$user->role){
            case 1:{
                $user->assignRole('dinas');
                break;
            }
            case 2:{
                $user->assignRole('konselor');
                break;
            }
            case 3:{
                $user->assignRole('user');
                break;
            }
        }
        return $next($user);
    }
}