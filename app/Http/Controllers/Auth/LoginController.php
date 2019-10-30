<?php

namespace App\Http\Controllers\Auth;

use App\Events\GroupUserJoined;
use App\Events\KonselorOnlineNotification;
use App\Events\PatientNewMessege;
use App\Http\Controllers\Controller;
use App\Model\AnggotaKelompok;
use App\Model\Kelompok;
use App\User;
use Auth;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;

class LoginController extends Controller
{

    use AuthenticatesUsers;

    protected $redirectTo = '/';
    protected $username ;

    /**
     * Create a new controller instance.
     *
     * @return void
     */

    public function __construct()
    {
        $this->middleware('guest')->except('logout');
        $this->username = $this->findUsername();
    }

    public function logout(Request $request)
    {
        if (! auth()->user()->hasRole('dinas')){

            $user = Auth::user()->personaldata;
            $user->online = false;
            $user->save();

            $this->broadcastToKonselor(auth()->user());

        }

        $this->guard()->logout();
        $request->session()->invalidate();
        return $this->loggedOut($request) ?: redirect('/');
    }

    public function findUsername()
    {
        $login = request()->input('credential');
        $fieldType = filter_var($login, FILTER_VALIDATE_EMAIL) ? 'email' : 'username';
        request()->merge([$fieldType => $login]);
        return $fieldType;
    }
    public function username()
    {
        return $this->username;
    }
    public function validateLogin(Request $request)
    {
        $request->validate([
            'credential' => 'required|string',
            'password' => 'required|string',
        ],['required' => 'Please fill this field']);
    }

    public function showLoginForm()
    {
        return view('layouts.app');
    }

    private function broadcastToKonselor ($user){
        if ($user->hasRole('user')){
            $kelompok = AnggotaKelompok::whereUser($user->id)->first();
            if ($kelompok){
                $ketua = Kelompok::find($kelompok->kelompok)->Ketua;
                if ($ketua && $ketua->online){
                    broadcast(new PatientNewMessege($kelompok, $ketua->id));
                }
            }
        }
    }

    private function broadcastToUser($user){
        if ($user->hasRole('konselor')){
            if ($kelompok = Kelompok::whereKetua($user->id)->first()){
                broadcast(new KonselorOnlineNotification($user, $kelompok));
            }
        }
    }

    protected function authenticated(Request $request, User $user)
    {
        if (! $user->hasRole('dinas')){
            $user->personaldata->online = true;
            $user->personaldata->save();
        }

        $this->broadcastToKonselor($user);

        $this->broadcastToUser($user);

        if ($request->acceptsJson()){
            return $user->api_token;
        }
    }
}