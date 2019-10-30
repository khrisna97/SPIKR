<?php


namespace App\Pipeline;


use Closure;

class QueryTipeKasus
{
    public function handle($model, Closure $next){
        if (request()->has('tipe')){
            $tipe = request()->query('tipe');
            $model->whereTipeKasus($tipe);
        }
        return $next($model);
    }
}