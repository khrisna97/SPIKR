<?php


namespace App\Pipeline;
use Closure;
class QueryKetuaKelompok
{
    public function handle ($model, Closure $next){
        if (request()->has('ketua')){
            $ketua_id = request()->query('ketua');
             $model->whereKetuaKelompok($ketua_id);
        }
        return $next($model);
    }
}