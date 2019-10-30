<?php

namespace App\Events;

use App\Model\AnggotaKelompok;
use App\Model\PersonalChat;
use App\User;
use Illuminate\Broadcasting\Channel;
use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class KonselingNewMessages implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    private $chat, $room_id;

    /**
     * Create a new event instance.
     *
     * @param PersonalChat $chat
     */

    public function __construct(PersonalChat $chat )
    {
        //
        $this->chat = $chat;
        $user = User::find($chat->ke);

        if ($user){
            if ($user->hasRole('konselor')){
                $this->room_id = 'konselor.chat.'.$chat->ke. '.'.$chat->dari;
            }else{
                $this->room_id = 'konselor.chat.'.$chat->dari. '.'.$chat->ke;
            }
        }
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        return new PresenceChannel($this->room_id);
    }
    public function broadcastWith(){
        return $this->chat->Format();
    }
}