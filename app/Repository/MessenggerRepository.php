<?php


namespace App\Repository;


use App\Model\Kelompok;
use App\Model\PersonalChat;
use App\Model\Userdata;
use App\User;
use DB;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Collection;
use stdClass;

class MessenggerRepository
{
    private $user;

    private function builder($user){
        $this->user = $user;

        $model = PersonalChat::query();
        $model = $model->select(
            [
                DB::raw('DISTINCT ke as target'),
                DB::raw('dari as dari2'),
                DB::raw('( SELECT COUNT(*) FROM PersonalChats WHERE dari = dari2&&ke = target && PersonalChats.readed = 0 ) as unreaded'),
                DB::raw('( SELECT COUNT(*) FROM PersonalChats WHERE dari = dari2&&ke = target ) as total'),
                DB::raw('(SELECT userdata.nama FROM userdata WHERE userdata.id = dari) as name'),
                DB::raw('(SELECT userdata.online FROM userdata WHERE userdata.id = dari) as online')
            ]
        );

        $model = $model->where('ke',$user->id)->where('dari','!=',$user->id);

        return $model;
    }

    private function transformation(Collection $model) : LengthAwarePaginator
    {
        $unreadedTotal = 0;

        if (request()->has('name') && $name = request()->query('name')){

            $model = $model->filter(function ($key) use ($name){
                return (strpos($key->name, $name) !== false);
            });

        }


        $modelToArray = $model->toArray();
        $page = request()->query('page');
        $start = $page && (int)$page!== 1 ? $page * 10 : 0;
        $data =array_slice($modelToArray, $start, 10);
        $paginator = new LengthAwarePaginator($data, count($modelToArray),10);
        $paginator->setPath('api/messages');
        $paginator->transform(function ($item) use ($unreadedTotal) {

            $item = self::InboxFormat($item);

            $unreadedTotal += (int) $item['unreaded'];

            unset($item->target, $item->dari2, $item->dari , $item->ke, $item->online, $item->name );

            return $item;
        });
        $paginator->totalUnreaded = $unreadedTotal;
        return $paginator;
    }


    final public function Ordering (Builder $model){
        $ordering = $model->orderBy('unreaded','DESC');
        $ordering = $ordering->orderBy('online','DESC');
        $ordering = $ordering->orderBy('name');
        return $ordering;
    }

    final public function getOneInbox(PersonalChat $chat){

        $user = User::withTrashed()->find($chat->ke);
        $builder =  $this->builder($user);
        $builder = $builder->where('dari',$chat->dari)->first();


        return self::InboxFormat($builder->toArray());
    }

    final public function getUserInbox($user) : LengthAwarePaginator {
        $data = $this->builder($user);
        $ordered = $this->Ordering($data);
        return $this->transformation($ordered->get());
    }

    final public function konselorGetInGroup() : LengthAwarePaginator {
        $model = $this->builder(auth()->user()->personaldata);
        $model = $model->join('anggota_kelompok','anggota_kelompok.user','=','dari');

        $konselor_id = auth()->id();

        $kelompok = Kelompok::whereKetua($konselor_id)->first();

        $model = $model->where('kelompok',$kelompok->id);

        $ordered = $this->Ordering($model);

        return $this->transformation($ordered->get());

    }
    final public function konselorAllInbox() : LengthAwarePaginator {
        $model = $this->builder(auth()->user()->personaldata);

        $konselor_id = auth()->id();

        $kelompok = Kelompok::whereKetua($konselor_id)->first();

        $model = $model->join('anggota_kelompok','anggota_kelompok.user','=','dari');

        $model = $model->where('kelompok','!=',$kelompok->id);

        $ordered = $this->Ordering($model);

        return $this->transformation($ordered->get());

    }

    public static function InboxFormat(array $inbox) : array {
        $inbox = (object) $inbox;
        $formatted = new stdClass();
        $sender = new stdClass();
        $formatted->ke = $inbox->target;
        $formatted->dari = $inbox->dari2;


        $sender->name = $inbox->name;
        $sender->online = (boolean) $inbox->online;
        $sender->id = $inbox->dari2;

        $websocket = PersonalChat::query()
            ->where('ke', $formatted->ke )
            ->where('dari',$sender->id)
            ->latest()
            ->first()
            ->Format();

        $formatted->sender = $sender;
        $formatted->websocket = $websocket;
        $formatted->readed = $inbox->total - $inbox->unreaded;
        $formatted->unreaded = $inbox->unreaded;
        $formatted->total = $inbox->total;
        return (array) $formatted;
    }

    public static function getConversations ($other_user_id){

        $query = PersonalChat::query()
            ->where('ke',auth()->id())
            ->where('dari', $other_user_id);

        $query = $query->union(PersonalChat::query()
            ->where('dari',auth()->id())
            ->where('ke', $other_user_id));

        $query->orderBy('created_at','DESC');
        $paginator = $query->paginate(10);
        $paginator->transform(function (PersonalChat $item){
            return $item->Format();
        });
        return $paginator;
    }


}