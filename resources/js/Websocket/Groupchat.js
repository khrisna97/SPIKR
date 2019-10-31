export default (kelompok_id)=>{

    const Group = window.Echo.join('group.chat.'+kelompok_id);

    const GroupOnlineList = (callback) => {
        Group.listen('GroupUserJoined', callback)
    };
    const KonselorOnline = (callback) => {
        Group.listen('GroupUserJoined', callback)
    };
    const GroupChatList = (callback)=> Group.listen('GroupMessagesIncoming', callback);


    const StopGroupChatList =()=>{
        Group.stopListening('GroupMessagesIncoming')
    };

    return {
        GroupChannel:Group,
        Channel : Group,
        Listener : {
            Incoming : GroupChatList,
            GroupChatList,
            GroupOnlineList,
            StopGroupChatList
        },
        GroupChatList,
        GroupOnlineList,
        StopGroupChatList
    }
};