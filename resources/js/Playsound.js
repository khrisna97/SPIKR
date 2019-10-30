const PlaySound =()=>{
    const player = document.getElementById('notification-sound');
    player.play().then(_=>{

    }).catch(_=>{

    });
};
export default PlaySound