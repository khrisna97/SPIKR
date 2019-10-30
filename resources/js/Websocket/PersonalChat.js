export default (konselor_id, anggota_id)=>{

    const Personal = window.Echo.join(`konselor.chat.${konselor_id}.${anggota_id}`);

    const PersonalIncomingChat = (callback)=>{
        Personal.listen('KonselingNewMessages', callback)
    };

    return {
        PersonalIncomingChat,
        Channel : Personal,
        Listener : {
            Incoming:PersonalIncomingChat
        }
    }
};