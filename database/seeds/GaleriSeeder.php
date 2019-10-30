<?php

use App\DataGaleri;
use App\Galeri;
use Faker\Factory;
use Illuminate\Database\Seeder;

class GaleriSeeder extends Seeder
{
    public function check(){return true;}
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Factory::create();
        for ($i = 0; $i < 50; $i++){
            $create = Galeri::create(
                ['judul'=>$faker->text(30)]
            );
            $this->savefile($create);
        }
    }
    public function savefile(Galeri $galeri){
        $Mainpath = 'tester/galeri/';
        $files = Storage::allFiles($Mainpath);
        $faker = Factory::create();
        foreach ($files as $file){
            $create = DataGaleri::create(
                ['galeri_id'=>$galeri->id, 'caption'=>$faker->text(20)]
            );
            if ($create){
                Storage
                    ::copy($file,
                        'public/galeri/'.$galeri->id.'/'.$create->id );
            }
        }
    }
}