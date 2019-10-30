<?php

use App\Model\AnggotaKelompok;
use App\Model\Kasus;
use App\Model\Kelompok;
use App\User;
use Illuminate\Database\Seeder;

class KasusSeeder extends Seeder
{
    public function check(){
        return Kasus::count() === 0;
    }
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Schema::disableForeignKeyConstraints();

        DB::table('kasus')->truncate();

        Schema::enableForeignKeyConstraints();

        $patiens = User::
        whereRole(3)->
        join('anggota_kelompok','anggota_kelompok.user','=','users.id')->
        select('users.id')->get();
        $konselors = User::whereRole(2)->get();

        foreach ($konselors as $index =>  $konselor){
            $keanggotaan = AnggotaKelompok::whereUser($konselor->id)->count();
            for ($i = 0;$i < 5; $i++ ){
                $keanggotaan ?
                    $this->createBothInKelompok($konselor , $patiens[random_int(0,$patiens->count()-1)]) :
                    $this->createKonselorNotInKelompok($konselor , $patiens[random_int(0,$patiens->count()-1)]);
            }
        }
    }
    private function createBothInKelompok(User $konselor, User $patient){
        $kelompok = Kelompok::whereKetua($konselor->id)->first();
        if ($kelompok){
            Kasus::create(
                [
                    'tipe'=>random_int(1,4),
                    'user'=>$patient->id,
                    'kelompok'=> $kelompok->id,
                    'dilaporkan_oleh'=>$konselor->id,
                    'keterangan' =>Faker\Factory::create()->text(),
                    'created_at' =>Faker\Factory::create()->dateTimeThisYear(),
                    'kecamatan'=>$patient->personaldata->kecamatan,
                ]
            );
            echo 'Kasus created at user '.$patient->personaldata->nama.
                ' and reported by '.$konselor->personaldata->nama.
                ' at kelompok '.$kelompok->nama."\n";
        }
    }
    private function createKonselorNotInKelompok(User $konselor, User $patient){
        Kasus::create(
            [
                'tipe'=>random_int(1,4),
                'user'=>$patient->id,
                'kelompok'=> 0,
                'dilaporkan_oleh'=>$konselor->id,
                'kecamatan'=>$patient->personaldata->kecamatan,
                'keterangan' =>Faker\Factory::create()->text(),
                'created_at' =>Faker\Factory::create()->dateTimeThisYear()
            ]
        );
        echo 'Kasus created at user '.$patient->personaldata->nama.
            ' and reported by '.$konselor->personaldata->nama."\n";
    }
}