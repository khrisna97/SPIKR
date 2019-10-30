<?php


namespace App\Pipeline;


use Closure;

class QueryTipeKelompok
{
    public function handle($model, Closure $next){
        if (request()->has('tipe')){
            $tipe = request()->query('tipe');
            $model->whereKelompokTipe($tipe);
        }
        return $next($model);
    }
}