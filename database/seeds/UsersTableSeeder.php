<?php

use App\Model\Kecamatan;
use App\Model\Tipe_kasus;
use App\Model\Userdata;
use App\User;
use Faker\Factory;
use Illuminate\Database\Seeder;
//use Illuminate\Support\Facades\Hash;

class UsersTableSeeder extends Seeder
{

    /**
     * Run the database seeds.
     *
     * @return  void
     */
    final public function createadmin() : void {
        if (User::whereRole(1)->count() === 0){
            $unique = $this->setUniqueData();
             User::create(
                [
                    'email'=>$unique['email'],
                    'username'=> 'admin',
                    'api_token'=>bcrypt($unique['username'].$unique['email']),
                    'password'=>Hash::make('1q2w3e4r'),
                    'role'=>1
                ]
            );
        }
    }

    /**
     * Run the database seeds.
     *
     * @return void
     */

    final public function run() : void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('users')->truncate();
        DB::table('userdata')->truncate();
        DB::table('kecamatan')->truncate();
        Schema::enableForeignKeyConstraints();
        echo "Start....\n";
        $this->createadmin();
        $this->generate_kecamatan();
        $this->generate_tipe_kasus();

        $seeders = [
            new KontenSeeder(),
            new GaleriSeeder(),
            new kelompokSeed(),
            new AnggotaKelompokSeed(),
            new UserNotHaveKelompokSeed(),
            new personalChatSeed(),
            new KasusSeeder(),
            new RoleSeed(),
        ];
        foreach ($seeders as $seeder){
            echo 'Running '.get_class($seeder)."\n";
            if (!$seeder->check()){
                echo get_class($seeder)." Already seeded \n";
            }else{
                $seeder->run();
            }
        }
    }


    private function generate_tipe_kasus() : void {
        $nama = ["bullying","broken home","kriminalitas","Asusila"];
        $i = 1;
        foreach ($nama as $nama_kasus){
            $tipe = Tipe_kasus::create(
                [
                    "nama"=>$nama_kasus,
                    "kode"=>$i,
                ]
            );
            echo "Tipe ".$tipe->nama." created\n";
            $i++;
        }
    }

    private function generate_kecamatan() : void {
        $data = json_decode('[{"id":"3201010","id_kabupaten":"3201","nama":" Nanggung"},{"id":"3201020","id_kabupaten":"3201","nama":" Leuwiliang"},{"id":"3201021","id_kabupaten":"3201","nama":" Leuwisadeng"},{"id":"3201030","id_kabupaten":"3201","nama":" Pamijahan"},{"id":"3201040","id_kabupaten":"3201","nama":" Cibungbulang"},{"id":"3201050","id_kabupaten":"3201","nama":" Ciampea"},{"id":"3201051","id_kabupaten":"3201","nama":" Tenjolaya"},{"id":"3201060","id_kabupaten":"3201","nama":" Dramaga"},{"id":"3201070","id_kabupaten":"3201","nama":" Ciomas"},{"id":"3201071","id_kabupaten":"3201","nama":" Tamansari"},{"id":"3201080","id_kabupaten":"3201","nama":" Cijeruk"},{"id":"3201081","id_kabupaten":"3201","nama":" Cigombong"},{"id":"3201090","id_kabupaten":"3201","nama":" Caringin"},{"id":"3201100","id_kabupaten":"3201","nama":" Ciawi"},{"id":"3201110","id_kabupaten":"3201","nama":" Cisarua"},{"id":"3201120","id_kabupaten":"3201","nama":" Megamendung"},{"id":"3201130","id_kabupaten":"3201","nama":" Sukaraja"},{"id":"3201140","id_kabupaten":"3201","nama":" Babakan Madang"},{"id":"3201150","id_kabupaten":"3201","nama":" Sukamakmur"},{"id":"3201160","id_kabupaten":"3201","nama":" Cariu"},{"id":"3201161","id_kabupaten":"3201","nama":" Tanjungsari"},{"id":"3201170","id_kabupaten":"3201","nama":" Jonggol"},{"id":"3201180","id_kabupaten":"3201","nama":" Cileungsi"},{"id":"3201181","id_kabupaten":"3201","nama":" Kelapa Nunggal"},{"id":"3201190","id_kabupaten":"3201","nama":" Gunung Putri"},{"id":"3201200","id_kabupaten":"3201","nama":" Citeureup"},{"id":"3201210","id_kabupaten":"3201","nama":" Cibinong"},{"id":"3201220","id_kabupaten":"3201","nama":" Bojong Gede"},{"id":"3201221","id_kabupaten":"3201","nama":" Tajur Halang"},{"id":"3201230","id_kabupaten":"3201","nama":" Kemang"},{"id":"3201231","id_kabupaten":"3201","nama":" Ranca Bungur"},{"id":"3201240","id_kabupaten":"3201","nama":" Parung"},{"id":"3201241","id_kabupaten":"3201","nama":" Ciseeng"},{"id":"3201250","id_kabupaten":"3201","nama":" Gunung Sindur"},{"id":"3201260","id_kabupaten":"3201","nama":" Rumpin"},{"id":"3201270","id_kabupaten":"3201","nama":" Cigudeg"},{"id":"3201271","id_kabupaten":"3201","nama":" Sukajaya"},{"id":"3201280","id_kabupaten":"3201","nama":" Jasinga"},{"id":"3201290","id_kabupaten":"3201","nama":" Tenjo"},{"id":"3201300","id_kabupaten":"3201","nama":" Parung Panjang"}]');
        foreach ($data as $kecamatan){
            $m = new Kecamatan();
            $m->id = $kecamatan->id;
            $m->nama = $kecamatan->nama;
            if ($m->save()){
                echo "kecamatan created\n";
            }
        }
    }
    private function setUniqueData() : array {
        $faker = Faker\Factory::create('id_ID');
        $username = $faker->unique()->userName.$faker->randomLetter;
        $email = $faker->unique()->safeEmail;
        $checkEmail = User::whereEmail($email)->count() === 0;
        $checkUsername = User::whereUsername($username)->count() === 0;
        if ( ($checkEmail && $checkUsername)){
            return ['username' =>$username, 'email' =>$email];
        }
        return $this->setUniqueData();
    }
    final public function generate(int $role , Kecamatan $kecamatan ,string $username = '') : User {
        $faker = Factory::create('id_ID');
        $unique = $this->setUniqueData();
        $creating = User::create(
            [
                'email'=>$unique['email'],
                'username'=> $username?: $unique['username']. $faker->numberBetween(0,100),
                'api_token'=>bcrypt($unique['username'].$unique['email']),
                'password'=>Hash::make('1q2w3e4r'),
                'role'=>$role
            ]
        );
        if ($creating){
            $faker = Faker\Factory::create('id_ID');
            $no = '';
            for ($i = 0; $i<15; $i++)
            {
                $no .= random_int(0,9);
            }
            Userdata::create([
                'id'=>$creating->id,
                'nama'=>$faker->name,
                'nomor-ktp'=>$no,
                'alamat'=>$faker->address,
                'kecamatan'=>$kecamatan->id,
                'gender'=>$faker->boolean,
            ]);
        }
        return  $creating;
    }

}