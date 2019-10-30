<?php

namespace App\Repository\Data;
use App\Model\AnggotaKelompok;
use App\Repository\RepoTrait;
use App\User;

class UserdataRepo
{
    use RepoTrait;
    public function __construct()
    {
        $this->select = ['userdata.id as id','kecamatan.id as kecamatan_id','userdata.nomor-ktp'];
        $this->model = User::query()
            ->select(['userdata.id','users.role as jabatan' ,'kecamatan.id as kecamatan_id','userdata.nama as nama','kecamatan.nama as kecamatan'])
            ->join('userdata','users.id','=','userdata.id')
            ->join('kecamatan', 'kecamatan.id', '=', 'userdata.kecamatan');

    }
    public function getUser($id){
        $user = User::find($id);
        if (! $user){
            return ['bad-query'=>'user not found'];
        }
        return $user->adminFormat();
    }
    public function paginate(){

        $per_page = request()->query('per_page')?? '10';
        $this->model = $this->model->orderBy('nama','ASC');

        if (request()->has('pagination') && request()->query('pagination') === 'disable') {
            if (! request()->has('tipe')){
                return response(['bad-query'=>'should have tipe parameter'], 422);
            }
            return $this->model->where('users.role',request()->query('tipe'))->get()->map(function (User $item){
               return $item->adminFormat();
            });
        }

        $pagination = $this->model->paginate( (int) $per_page);
        $pagination->transform(function (User $item){
            return $item->adminFormat();
        });

        $querystring = request()->only(['per_page', 'nama','kecamatan','kelompok','tipe']);
        $pagination->appends($querystring);
        return $pagination;

    }

    public function whereNotHaveKelompok(){
        $this->model = $this->model->whereNotIn('userdata.id', function ($query){
           return $query->select('anggota_kelompok.user')->from('anggota_kelompok');
        });
    }
}