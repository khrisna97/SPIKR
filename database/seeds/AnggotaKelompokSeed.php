<?php

use App\Model\AnggotaKelompok;
use App\Model\Kecamatan;
use App\Model\Kelompok;
use App\User;
use Illuminate\Database\Seeder;

class AnggotaKelompokSeed extends Seeder
{

    public function check(){
        return User::
                whereRole(3)->count() === 0;
    }

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        Schema::disableForeignKeyConstraints();

        User::whereRole(3)->forceDelete();

        Schema::enableForeignKeyConstraints();

        $kelompoks = Kelompok::all();
        $index = 1;
        foreach ($kelompoks as $kelompok){
            for ($i = 0 ; $i<10; $i++){
                $username = 'user'.$i.'k'.$kelompok->id;
                $kecamatan = Kecamatan::find($kelompok->kecamatan);
                $user = $this->createUser($kecamatan,$username);
                AnggotaKelompok::create([
                    'user'=>$user->id,
                    'kelompok'=>$kelompok->id,
                ]);
                $this->printToConsole( $index ,$user,$kelompok, $kecamatan);
                $index ++;
            }
        }
    }
    private function printToConsole(string $index ,User $user, Kelompok $kelompok, Kecamatan $kecamatan):void{
        $tipe = (bool) $kelompok->tipe ? 'Masyarakat' : 'Pendidikan';
        echo $index.'. Anggota created '
            .$user->personaldata->nama
            .' and joined kelompok '
            .$tipe
            .' '
            .$kelompok->nama.' at'
            .$kecamatan->nama."\n";
    }

    private function createUser (Kecamatan $kecamatan, string $username) : User
    {
        $userseeder = new UsersTableSeeder();
        return $userseeder->generate(3, $kecamatan, $username);
    }
}
