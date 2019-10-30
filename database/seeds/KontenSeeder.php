<?php

use App\Content;
use Faker\Factory;
use Illuminate\Database\Seeder;

class KontenSeeder extends Seeder
{

    private $delta;

    public function check(){
        return true;
    }

    public function __construct()
    {
//        $this->delta = Storage::get('tester/konten/delta.json');
    }

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Factory::create();
        for ($i = 0; $i < 50; $i++){
            $create = Content::create(
                ['judul'=>$faker->text(30)]
            );
            $this->savefile($create);
        }
    }
    public function savefile(Content $konten){
        Storage::copy('tester/konten/delta.json' , 'public/konten/'.$konten->id.'/delta.json');
        echo "\n konten created";
    }
}