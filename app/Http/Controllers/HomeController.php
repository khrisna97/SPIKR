<?php

namespace App\Http\Controllers;

use App\Model\Kasus;
use App\Model\Kecamatan;
use App\Model\Kelompok;
use App\User;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
//        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        return view('layouts.app');
    }
    public function allKecamatan(){
        return Kecamatan::AllSorted()->get()->map->format();
    }
    public function QuickStats(){
        $pengguna = User::whereRole(3)->count();
        $kelompok = Kelompok::query()->count();
        $kasus = Kasus::query()->count();
        $konselor = User::whereRole(2)->count();
        $pendidikan = Kelompok::whereTipe(1 )->count();
        $masyarakat = Kelompok::whereTipe(0 )->count();

        return [
            'pengguna'=>$pengguna,
            'kelompok'=>$kelompok,
            'kasus'=>$kasus,
            'konselor'=>$konselor,
            'pendidikan'=>$pendidikan,
            'masyarakat'=>$masyarakat
        ];
    }
}