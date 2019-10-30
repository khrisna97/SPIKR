<?php


namespace App\Pipeline\Kelompok;

use App\Repository\Statistic\KelompokStatistic;
use Closure;

class QueryType
{
    public function handle(KelompokStatistic $model, Closure $next){
        if (request()->has('tipe')){
            $tipe = request()->query('tipe');
            if (! in_array($tipe, ['masyarakat','pendidikan'])){
                response(['bad-query'=>"tipe can only masyarakat or pendidikan"])->send();
            }
            $model->WhereEqual('tipe',$tipe == "pendidikan" );
            return $next($model);
        }
        return $next($model);
    }
}