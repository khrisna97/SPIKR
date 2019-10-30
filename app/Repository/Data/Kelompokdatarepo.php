<?php


namespace App\Repository\Data;


use App\Model\Kelompok;
use App\Repository\RepoTrait;

class Kelompokdatarepo
{
    use RepoTrait;
    public function __construct()
    {
        $this->model = Kelompok::query()
            ->select(['kelompokpik.id','kelompokpik.nama','kelompokpik.tipe','kecamatan.id as kecamatan_id','userdata.nama as ketua_kelompok'])
            ->join('kecamatan','kecamatan.id','=','kelompokpik.kecamatan')
            ->join('userdata','ketua','=','userdata.id')
        ;
    }
    public  function getkelompok($id){
        $kelompok = Kelompok::find($id);
        if (! $kelompok){
            return ['bad-query'=>'kelompok not found'];
        }
        if (request()->has('detail')){
            return $kelompok;
        }
        return $kelompok->adminFormat();
    }
    public function pagination(){

        if (request()->has('pagination')) {
            if (request()->query('pagination') === 'disable'){
                return $this->model->get()->map(function ($item){
                    return $item->adminFormat();
                });
            }
        }
        $per_page = request()->query('per_page')?? '10';

        $pagination = $this->model->paginate($per_page);

        $pagination->transform(function (Kelompok $item){
            return $item->adminFormat();
        });

        $querystring = request()->only(['per_page', 'nama','kecamatan','kelompok','tipe']);
        $pagination->appends($querystring);

        return $pagination;
    }
}