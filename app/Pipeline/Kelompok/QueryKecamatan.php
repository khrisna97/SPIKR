<?php


namespace App\Pipeline\Kelompok;
use App\Pipeline\PipelineTrait;
use App\Repository\Statistic\KelompokStatistic;
use Closure;

class QueryKecamatan
{
    use PipelineTrait;
    public function handle (KelompokStatistic $model, Closure $next){
        if (request()->has('kecamatan')){

            $kecamatan_query = request()->query('kecamatan');

            $this->checkKecamatan($kecamatan_query);

            $model->WhereEqual('kecamatan',$kecamatan_query);
            return $next($model);
        }
        return $next($model);
    }
}