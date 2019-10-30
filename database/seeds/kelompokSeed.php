<?php

use App\Model\AnggotaKelompok;
use App\Model\Kecamatan;
use App\Model\Kelompok;
use App\User;
use Illuminate\Database\Seeder;

class kelompokSeed extends Seeder
{

    private $index = 1;
    public function check(){
        return Kelompok::count() === 0;
    }
    /**
     * Run the database seeds.
     *
     * @return void
     */
    final public function run() : void
    {
        $kecamatans = Kecamatan::all();

        Schema::disableForeignKeyConstraints();

        DB::table('kelompokpik')->truncate();
        DB::table('anggota_kelompok')->truncate();

        Schema::enableForeignKeyConstraints();

        User::whereRole(2)->forceDelete();

        foreach ($kecamatans as $kecamatan){
            ++$this->index;
            $this->createMasyarakat($kecamatan);
            ++$this->index;
            $this->createPendidikan($kecamatan);
        }

    }

    private function createKonselor (Kecamatan $kecamatan, string $username) : User{
        $userseeder = new UsersTableSeeder();
        return $userseeder->generate(2, $kecamatan, $username);
    }

    private function createKelompok(User $ketua , bool $tipe = false) : Kelompok{
        $faker = Faker\Factory::create('id_ID');

        return Kelompok::create([
            'ketua'=>$ketua->id,
            'tipe'=>(int) $tipe,
            'nama'=>$faker->word. ' '.$faker->word,
            'kecamatan'=>$ketua->personaldata->kecamatan
        ]);
    }

    private function printToConsole(User $user, Kelompok $kelompok, Kecamatan $kecamatan){
        $tipe = (bool) $kelompok->tipe ? 'Masyarakat' : 'Pendidikan';
        echo $this->index. '. Konselor created '
            .$user->personaldata->nama
            .' with kelompok '
            .$tipe
            .' '
            .$kelompok->nama.' at '
            .$kecamatan->nama."\n";
    }

    private function createMasyarakat(Kecamatan $kecamatan) : void {
        $konselor = $this->createKonselor($kecamatan, 'konselor'.$this->index);
        if ($konselor && $kelompok = $this->createKelompok($konselor)) {
            AnggotaKelompok::create([
                'user'=>$konselor->id,
                'kelompok'=>$kelompok->id,
            ]);
            $this->printToConsole($konselor,$kelompok, $kecamatan);
        }
    }
    private function createPendidikan(Kecamatan $kecamatan) : void {
        $konselor = $this->createKonselor($kecamatan, 'konselor'.$this->index);
        if ($konselor && $kelompok = $this->createKelompok($konselor, true)) {
            $this->printToConsole($konselor,$kelompok, $kecamatan);
        }
    }
}