<?php


namespace App\Pipeline\Registration;
use App\User;
use Closure;
use RuntimeException;

class Account_pipe
{
    final public function handle(array $data , Closure $next)  {
        $auth = User::create($data);
        if (!$auth) {
            throw new RuntimeException('Account not registered');
        }
        request()->merge(['userdata' =>$data]);
        return $next($auth);
    }
}