<?php


namespace App\Pipeline\Kelompokdata;
use App\Pipeline\PipelineTrait;
use Closure;
use Illuminate\Database\Eloquent\Builder;

class QueryTipe
{
    use PipelineTrait;
    public function handle(Builder $model, Closure $next){
        if (request()->has('tipe')){
            $tipe = request()->query('tipe');
            if (! in_array($tipe, ['masyarakat','pendidikan'])){
                response(['bad-query'=>"tipe can only masyarakat or pendidikan"])->send();
            }
            $model = $model->where('tipe',$tipe == "pendidikan" );
        }
        return $next($model);
    }
}