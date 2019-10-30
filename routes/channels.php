<?php

/*
|--------------------------------------------------------------------------
| Broadcast Channels
|--------------------------------------------------------------------------
|
| Here you may register all of the event broadcasting channels that your
| application supports. The given channel authorization callbacks are
| used to check if an authenticated user can listen to the channel.
|
*/

use App\Broadcasting\GroupChatChannel;
use App\Broadcasting\KonselingChatRoom;
use App\Broadcasting\KonselingSessionGroup;
use App\Broadcasting\KonselorChat;
use App\Broadcasting\PersonalChannel;

Broadcast::channel('App.User.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
});
Broadcast::channel('group.chat.{id}', GroupChatChannel::class);
Broadcast::channel('konselor.chat.{konselor_id}.{anggota_id}', KonselorChat::class);
//For 1 to 1 konselor and patient
Broadcast::channel('konseling.room.{konselor_id}.{anggota_id}', KonselingChatRoom::class);
//For sent messages and patient online status notification for konselor
Broadcast::channel('konseling.group.{konselor_id}', KonselingSessionGroup::class);


Broadcast::channel('Personal.{userid}', PersonalChannel::class);
