<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">


    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- Scripts -->
    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet">
    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    <link rel="fav icon" href="{{asset('logo.png')}}">

</head>
<body class="hidden">
<audio id="notification-sound" src="{{asset('notif.mp3')}}" ></audio>
<div class="hidden">
</div>
<div class="App" id="root">
</div>
</body>
<script>
    window.baseurl = '{{url('')}}';
</script>
@auth
    <script>
        window.userdata = @json(auth()->user());
        window.personaldata = @json(auth()->user()->personaldata);
        @if( $kelompok = \App\Model\AnggotaKelompok::whereUser(auth()->id()))
            window.kelompokdata =@json($kelompok->get()->first());
        @if($kelompok->first())
            @role('user')
        window.konselordata = @json($kelompok->first()->Kelompok->Ketua->Kelompok->web_socket())
                @endif
            @endrole
        @endif
    </script>
@endauth
@guest()
    <script src="{{ asset('js/Auth.js') }}"></script>
@endguest

@role("dinas")
<script src="{{ asset('js/Admin.js') }}"></script>
@endrole

@role("konselor")

@if($kelompok = $kelompok->first())
    <script>
        const kelompok = @json($kelompok);
        window.infokelompok = @json(\App\Model\Kelompok::find($kelompok->kelompok)->adminFormat());

    </script>
    <script src="{{ asset('js/Konselor.js') }}"></script>
@else
    <script src="{{ asset('js/Konselor1.js') }}"></script>
@endif
@endrole

@role("user")
@if($kelompok = $kelompok->first())
    <script>
        window.infokelompok = @json(\App\Model\Kelompok::find($kelompok->kelompok)->adminFormat())
    </script>
    <script src="{{ asset('js/User.js') }}"></script>
@else
    <script src="{{ asset('js/User1.js') }}"></script>
@endif
@endrole

</html>
