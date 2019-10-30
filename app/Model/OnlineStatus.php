<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class OnlineStatus extends Model
{
    protected $table = 'OnlineStatus';
    protected $fillable = ['user'];
    protected $primaryKey = 'id';
}
