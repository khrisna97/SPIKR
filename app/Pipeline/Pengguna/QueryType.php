<?php


namespace App\Pipeline\Pengguna;


use App\Pipeline\PipelineTrait;
use App\Repository\Data\UserdataRepo;
use Closure;

class QueryType
{
    use PipelineTrait;
    public function handle(UserdataRepo $model, Closure $next){

        if (request()->has('role')){
            $role = request()->query("role");
            if ($role == 2){
                $model->getListKonselor();
            }elseif ($role == 3){
                $model->getListPengguna();
            }else{
                response(["bad-query"=>"role can be only 2 or 3"])->send();
            }
            return $next($model);
        }else{
            response(["bad-query"=>"role is required"])->send();
        }

    }
}