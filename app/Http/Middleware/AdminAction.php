<?php

namespace App\Http\Middleware;

use Closure;

class AdminAction
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
//    Tambah kelompok
//    Tambah konselor

    public function handle($request, Closure $next)
    {
        return $next($request);
    }
}
