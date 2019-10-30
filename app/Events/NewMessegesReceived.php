<?php

namespace App\Events;

use App\Model\PersonalChat;
use App\Repository\MessenggerRepository;
use Illuminate\Broadcasting\Channel;
use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class NewMessegesReceived implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    private $chat;
    private $roomnumber;

    /**
     * Create a new event instance.
     *
     * @param PersonalChat $chat
     * @param int $roomnumber
     */
    public function __construct(PersonalChat $chat, int $roomnumber = null)
    {
        $this->chat = $chat;
        $this->roomnumber = $roomnumber ?? $this->chat->ke;
    }

    public function broadcastWith()
    {
        $repo = new  MessenggerRepository();
        $repo = $repo->getOneInbox($this->chat);
        return $repo;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        return new PresenceChannel('Personal.'.$this->roomnumber);
    }
}