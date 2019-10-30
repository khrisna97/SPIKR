<?php

namespace App\Http\Middleware;

use App\User;
use Auth;
use Closure;

class Admin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if (! Auth::user()->hasRole('dinas')){
            return ['message'=>'you did not have permission'];
        }
        return $next($request);
    }
}
