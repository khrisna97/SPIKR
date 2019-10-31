export default (konselor_id, anggota_id)=>{

    const Sessions = window.Echo.join(`konseling.room.${konselor_id}.${anggota_id}`);

    const IncomingChat = (callback)=>{
        Sessions.listen('KonselingNewMessages', callback)
    };
    const IncomingChatCleanUp = ()=>{
        Sessions.stopListening('KonselingNewMessages')
    };

    return {
        Sessions ,IncomingChat, IncomingChatCleanUp
    }
};