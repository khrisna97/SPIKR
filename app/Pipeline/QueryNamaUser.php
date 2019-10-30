<?php


namespace App\Pipeline;


use Closure;

class QueryNamaUser
{
    public function handle($model, Closure $next){
        if (request()->has('nama')){
            $nama_user = request()->query('nama');
            $model->whereUserNama($nama_user);
        }
        return $next($model);
    }
}