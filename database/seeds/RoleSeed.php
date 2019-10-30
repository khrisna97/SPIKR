<?php

use App\User;
use Illuminate\Database\Seeder;

class RoleSeed extends Seeder
{
    public function check(){
        return true;
    }
    /**
     * Run the database seeds.
     *
     * @return void
     */
    final public function run() :void
    {
        $users = User::all();
        foreach ($users as $user){
            if (! $user->hasAnyRole(['dinas', 'konselor','user'])){
                $role = '';
                switch ((int) $user->role){
                    case 1 :{
                        $role = 'dinas';
                        break;
                    }
                    case 2 :{
                        $role = 'konselor';
                        break;
                    }
                    case 3 :{
                        $role = 'user';
                        break;
                    }
                }
                if ($role){
                    $user->assignRole($role);
                    echo $user->username.' has given role to '.$role."\n";
                }
            }
        }
    }
}
