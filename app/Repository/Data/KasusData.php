<?php


namespace App\Repository\Data;


use App\Model\Kasus;
use App\Repository\RepoTrait;

class KasusData
{
    use RepoTrait;
    public function __construct()
    {
        $this->model = Kasus::query()
            ->join('userdata','user','=','userdata.id')
            ->join('kecamatan','userdata.kecamatan','=','kecamatan.id')
            ->join('tipe_kasus','tipe','=','tipe_kasus.id')
            ->select(
                [
                    'kasus.id',
                    'kasus.user',
                    'kasus.keterangan',
                    'kasus.dilaporkan_oleh',
                    'kasus.kelompok','tipe_kasus.nama as kategori','kasus.created_at as waktu'])
        ->orderBy('waktu','DESC')
        ;
    }
    public function paginate (){

        if (request()->has('pagination')) {
            if (request()->query('pagination') === 'disable'){
                return $this->model->take(50)->get()->map(function ($item){
                    return $item->Format();
                });
            }
        }
        $per_page = request()->query('per_page') ?? '10';
        $pagination = $this->model->orderBy('kasus.created_at','DESC')->paginate((int) $per_page);
        $pagination->transform(function ($item){
            return $item->Format();
        });
        $querystring = request()->only(['per_page', 'nama','kecamatan','kelompok','tipe']);
        $pagination->appends($querystring);
        return $pagination;
    }
    public function whereTipeKasus($id){
        $this->model = $this->model->where('tipe_kasus.id',$id);
    }
}