export default (user)=>{

    const Personal = window.Echo.join(`Personal.` + user);

    const PersonalNotification = (callback)=>{
        Personal.listen('PersonalNotification', callback)
    };
    const MessagesReadedNotification = (callback)=>{
        Personal.listen('ReadedMessages', callback)
    };
    const NewMessagesNotification = (callback)=>{
        Personal.listen('NewMessegesNotification', callback)
    };

    const NewMessagesReceived = (callback)=>{
        Personal.listen('NewMessegesReceived', callback);
    };
    const StopNewMessagesReceived = ()=>{
        Personal.stopListening('NewMessegesReceived');
    };



    return {
        Personal,PersonalNotification,MessagesReadedNotification, NewMessagesNotification,
        Listener : {
            messages : NewMessagesReceived,
            messagesCleanUp : StopNewMessagesReceived
        },
        Channel : Personal
    }
};