<?php

namespace App\Events;

use App\Model\AnggotaKelompok;
use Illuminate\Broadcasting\Channel;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class PatientNewMessege implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    private $patient, $konselor;

    /**
     * Create a new event instance.
     *
     * @param Model | AnggotaKelompok   $patient
     * @param int $konselor_id
     */
    public function __construct(AnggotaKelompok  $patient, int $konselor_id)
    {
        //
        $this->patient = $patient;
        $this->konselor = $konselor_id;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return Channel|array
     */
    public function broadcastOn()
    {
        return new PresenceChannel('konseling.group.'.$this->konselor);
    }
    public function broadcastWith()
    {
        return $this->patient->konseling_websocket($this->konselor);
    }
}