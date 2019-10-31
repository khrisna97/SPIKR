export default (konselor_id)=>{

    const Sessions = window.Echo.join(`konseling.group.${konselor_id}`);

    const IncomingChat = (callback)=>{
        Sessions.listen('PatientNewMessege', callback)
    };

    const Readed = (callback)=>{
        Sessions.listen('KonselorReadMessages', callback)
    };

    const IncomingChatCleanUp = ()=>{
        Sessions.stopListening('PatientNewMessege')
    };

    return {
        Sessions ,IncomingChat, IncomingChatCleanUp,
        Channel : Sessions,
        Listener : {
            Incoming : IncomingChat,
            Readed
        },

    }
};