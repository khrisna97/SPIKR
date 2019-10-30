<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('kecamatan', function (Blueprint $table) {
            $table->bigIncrements('id')->unsigned()->index();
            $table->string('nama');
        });
//        tabel user untuk otentikasi
        Schema::create('users', function (Blueprint $table) {
            $table->bigIncrements('id')->unsigned();
            $table->string('email')->unique();
            $table->string('username')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->integer('role')->comment('1 untuk anggota dinas, 2 untuk konselor, 3 user anggota');

            $table->rememberToken();
            $table->timestamps();
            $table->string('api_token', 80)
                ->unique()
                ->nullable()
                ->default(null);
            $table->softDeletes();
        });
//        tabel userdata data untuk data-data personal user
        Schema::create('userdata', function (Blueprint $table) {
            $table->bigInteger('id')->unsigned();
            $table->string('nama');
            $table->string('nomor-ktp')->unique();
            $table->boolean('gender')->comment('0 wanita 1 pria');
            $table->string('alamat');
            $table->bigInteger('kecamatan')->unsigned();
            $table->timestamps();
            $table->boolean('online')->default(false);
            $table->date('last_online')->nullable();
        });
        Schema::create('kelompokpik', function (Blueprint $table) {
            $table->bigIncrements('id')->unsigned()->index();
            $table->bigInteger('ketua')->unsigned()->index()->default(1);
            $table->boolean('tipe')->comment('0 masyarakat 1 pendidikan');
            $table->string('nama');
            $table->bigInteger('kecamatan')->unsigned()->index();
            $table->timestamps();
        });
        Schema::create('anggota_kelompok', function (Blueprint $table) {
            $table->bigIncrements('id')->unsigned();
            $table->bigInteger('user')->unsigned();
            $table->bigInteger('kelompok')->unsigned();
            $table->timestamps();
        });
        Schema::create('tipe_kasus', function (Blueprint $table) {
            $table->bigIncrements('id')->unsigned();
            $table->text('nama');
            $table->integer('kode')
                ->comment('1: bullying 2:broken home 3:Kriminalitas 4:Asusila 5:Pelajaran 6:Ekonomi 7:Lainya')
            ;
        });
        Schema::create('kasus', function (Blueprint $table) {
            $table->bigIncrements('id')->unsigned();
            $table->bigInteger('tipe')->unsigned();
            $table->bigInteger('user')->unsigned();
            $table->bigInteger('kelompok')->unsigned()->default(0);
            $table->bigInteger('dilaporkan_oleh')->unsigned();
            $table->bigInteger('kecamatan')->unsigned();
            $table->text('keterangan');
            $table->timestamps();
        });
        Schema::create('GroupChats', function (Blueprint $table) {
            $table->bigIncrements('id')->unsigned();
            $table->bigInteger('user')->unsigned();
            $table->bigInteger('kelompok')->unsigned()->default(0);
            $table->text('pesan');
            $table->timestamps();
        });
        Schema::create('PersonalChats', function (Blueprint $table) {
            $table->bigIncrements('id')->unsigned();
            $table->bigInteger('dari')->unsigned();
            $table->bigInteger('ke')->unsigned();
            $table->boolean('readed')->unsigned()->default('0');
            $table->text('pesan');
            $table->timestamps();
        });

        Schema::create('Galleri', function (Blueprint $table) {
            $table->bigIncrements('id')->unsigned();
            $table->text('judul');
            $table->timestamps();
        });

        Schema::create('DataGalleri', function (Blueprint $table) {
            $table->bigIncrements('id')->unsigned();
            $table->bigInteger('galeri_id')->unsigned();
            $table->text('caption');
        });

        Schema::create('berita', function (Blueprint $table) {
            $table->bigIncrements('id')->unsigned();
            $table->text('judul');
            $table->timestamps();
        });

        $this->createCascadeRelation();
        $this->createNoActionRelation();

    }
    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }

    private function createNoActionRelation() :void {
        $foreignBuilder =[
            [
                'table'=>'kasus',
                'foreigns'=>[
                    ['col' =>'tipe', 'on'=>'tipe_kasus'],
                    ['col' =>'user', 'on'=>'users'],
                    ['col' =>'dilaporkan_oleh', 'on'=>'users']
                ]
            ],
            [
                'table'=>'kelompokpik',
                'foreigns'=>[
                    ['col'=>'ketua', 'on'=>'users'],
                    ['col'=>'kecamatan', 'on'=>'kecamatan'],
                ]
            ],
            [
                'table'=>'GroupChats',
                'foreigns'=>[
                    ['col'=>'user', 'on'=>'users'],
                    ['col'=>'kelompok', 'on'=>'kelompokpik'],
                ]
            ],
            [
                'table'=>'PersonalChats',
                'foreigns'=>[
                    ['col'=>'dari', 'on'=>'users'],
                    ['col'=>'ke', 'on'=>'users'],
                ]
            ],
            [
                'table'=>'DataGalleri',
                'foreigns'=>[
                    ['col'=>'galeri_id', 'on'=>'Galleri'],
                ]
            ],
        ];
        foreach ($foreignBuilder as $foreigns){
            Schema::table($foreigns['table'], function (Blueprint $table) use ($foreigns){
                foreach ($foreigns['foreigns'] as $foreign){
                    $table->foreign($foreign['col'])->references('id')->on($foreign['on'])
                        ->onUpdate('no action')->onDelete('no action');

                }
            });
        }
    }

    private function createCascadeRelation() : void {
        $foreignBuilder = [
            ['table'=>'userdata',
                'foreigns'=>[
                    ['col'=>'id', 'on'=>'users'],
                    ['col'=>'kecamatan', 'on'=>'kecamatan'],
                ],
            ],
            [
                'table'=>'anggota_kelompok',
                'foreigns'=>[
                    ['col'=>'user', 'on'=>'users'],
                    ['col'=>'kelompok', 'on'=>'kelompokpik'],
                ]
            ],
        ];
        foreach ($foreignBuilder as $foreigns){
            Schema::table($foreigns['table'], static function (Blueprint $table) use ($foreigns){
                foreach ($foreigns['foreigns'] as $foreign){
                    $table->foreign($foreign['col'])->references('id')->on($foreign['on'])
                        ->onUpdate('cascade')->onDelete('cascade');
                }
            });
        }
    }
}