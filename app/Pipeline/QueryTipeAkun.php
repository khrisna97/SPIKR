<?php


namespace App\Pipeline;


use Closure;

class QueryTipeAkun
{
    public function handle($model, Closure $next){
        if (request()->has('tipe')){
            $tipe = request()->query('tipe');
            $model->whereRole( (int) $tipe);
        }
        return $next($model);
    }
}