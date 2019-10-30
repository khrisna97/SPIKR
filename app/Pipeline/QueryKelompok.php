<?php


namespace App\Pipeline;


use Closure;

class QueryKelompok
{
    public function handle ($model, Closure $next){
        if (request()->has('kelompok')){
            $kelompok = request()->query('kelompok');
            if ($kelompok!=="false"){
                $model->WhereKelompok($kelompok);
            }
        }
        return $next($model);
    }
}