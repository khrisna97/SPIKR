<?php


namespace App\Repository\Statistic;


use App\Repository\RepoTrait;

class KelompokStatistic
{
    use RepoTrait;
    public function __construct($model)
    {
        $this->model = $model;
    }
}