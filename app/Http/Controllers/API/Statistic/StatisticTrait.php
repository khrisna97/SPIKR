<?php


namespace App\Http\Controllers\API\Statistic;


trait StatisticTrait
{
    public function sent(){
        $request = request();
        if ($count = $request->query("count")){
            $this->repo = $this->repo->getCount();
        }
        if ($count = $request->query("get"))
            $this->repo = $this->repo->getResult();
        return response($this->repo, 200);
    }
}