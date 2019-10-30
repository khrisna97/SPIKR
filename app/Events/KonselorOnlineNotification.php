<?php

namespace App\Events;

use App\Model\Kelompok;
use App\User;
use Illuminate\Broadcasting\Channel;
use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class KonselorOnlineNotification implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    private $konselor, $kelompok;

    /**
     * Create a new event instance.
     *
     * @param User $konselor
     * @param Kelompok $kelompok
     */
    public function __construct(User $konselor, Kelompok $kelompok)
    {
        $this->konselor = $konselor;
        $this->kelompok = $kelompok;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        $kelompokid = $this->kelompok->id;
        return new PresenceChannel('group.chat.'.$kelompokid);
    }
    public function broadcastWith(){
        return ['name'=>$this->konselor->personaldata->nama];
    }
}