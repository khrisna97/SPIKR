<?php

use App\Model\Kecamatan;
use App\User;
use Illuminate\Database\Seeder;

class UserNotHaveKelompokSeed extends Seeder
{
    public function check(){
        return true;
    }
    /**
     * Run the database seeds.
     *
     * @return void
     */
    private $index;
    public function run()
    {
        //
        $kecamatans = Kecamatan::all();
        foreach ($kecamatans as $kecamatan){
            ++$this->index;
            $username = 'dummyUser'.$this->index;
            if (!$this->checkExist($username)){
                $this->createUser($kecamatan , $username);
            }
            ++$this->index;
            $username = 'dummyKonselor'.$this->index;
            if (!$this->checkExist($username)){
                $this->createKonselor($kecamatan , $username);
            }
        }
    }

    private function checkExist(string $username)  {
        return User::whereUsername($username)->first();
    }

    private function createUser (Kecamatan $kecamatan, string $username) : void
    {
        $userseeder = new UsersTableSeeder();
        $this->printToConsole(
            $userseeder->generate(3, $kecamatan, $username),
            $kecamatan
        );
    }
    private function createKonselor (Kecamatan $kecamatan, string $username) : void
    {
        $userseeder = new UsersTableSeeder();
        $this->printToConsole(
            $userseeder->generate(2, $kecamatan, $username),
            $kecamatan
        );
    }
    private function printToConsole(User $user, Kecamatan $kecamatan){
        $role = ((int) $user->role) === 2 ? 'konselor':'user';
        echo $this->index. '. '. $role.' created '
            .$user->personaldata->nama
            .' doesn`t have kelompok at kecamatan'
            .$kecamatan->nama."\n";
    }
}
