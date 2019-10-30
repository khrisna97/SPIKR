<?php

use App\Model\AnggotaKelompok;
use App\Model\Kelompok;
use App\Model\PersonalChat;
use App\User;
use Faker\Factory;
use Illuminate\Database\Seeder;

class personalChatSeed extends Seeder
{

    public function check() : bool {
        return true;
    }

    public $faker;
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run() : void
    {
        $this->faker = Factory::create();

        $konselors =  User::whereRole(2)->get();

        foreach ($konselors as $konselor){
            if ($kelompok = Kelompok::whereKetua($konselor->id)->first()){
                $anggotaKelompok = AnggotaKelompok::
                whereKelompok($kelompok->id)->where('user','!=',$konselor->id)
                    ->get();
                for ($i = 0 ; $i< 10; $i++){
                    $anggota = $anggotaKelompok[random_int(0, $anggotaKelompok->count()-1)];
                    if ($createUserToKonselor = PersonalChat::create($this->dataGeneration(
                        $konselor->id,
                        $anggota->id
                    ))){
                        echo "\n".'An chat has been crearted with receiver '.$konselor->id.' and sender '.$anggota->id;
                    }
                    if ($createUserToKonselor = PersonalChat::create($this->dataGeneration(
                        $anggota->id,
                        $konselor->id
                    ))){
                        echo "\n".'An chat has been crearted with receiver '.$anggota->id.' and sender '.$konselor->id;
                    }
                }
            }
        }
    }
    private function dataGeneration (int $receiver_id, int $sender_id) : array {
        return  [
            'ke'=>$receiver_id,
            'dari'=>$sender_id,
            'pesan'=>$this->faker->realText(),
            'created_at'=>$this->faker->dateTimeThisYear()
        ];
    }
}
