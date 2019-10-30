<?php

namespace App\Events;

use App\Model\AnggotaKelompok;
use Illuminate\Broadcasting\Channel;
use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class GroupUserJoined implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /**
     * Create a new event instance.
     *
     * @return void
     */

    private $groupid;
    private $joined_user;
    public function __construct($group_id)
    {
        $this->groupid = $group_id;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        return new PresenceChannel('group.chat.'.$this->groupid);
    }
    public function broadcastWith()
    {
        $anggota = AnggotaKelompok::whereKelompok($this->groupid)->get()->transform(function ($user){
            return $user->User;
        });
        return ['anggota' => $anggota];
    }
}