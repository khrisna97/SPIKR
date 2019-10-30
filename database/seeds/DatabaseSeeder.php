<?php

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        Role::create(["name"=>'dinas']);
        Role::create(["name"=>'konselor']);
        Role::create(["name"=>'user']);
        $user = new UsersTableSeeder();
        $user->run();
    }
}
