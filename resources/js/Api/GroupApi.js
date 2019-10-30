export const GetGroupMemberApi = ({kelompok})=> new Promise(resolve => {
    axios.get('api/websocket/kelompok/'+kelompok,).then(res=>{
        resolve(res.data.members);
    });
});
export const GetGroupMessagesApi = ({kelompok, page})=> new Promise(resolve => {
    axios.get('api/websocket/kelompok/chats/'+kelompok+'?page='+page).then(({data})=>{

        resolve(
            {
                last : data.last_page,
                data : data.data,
                total : data.total,
                page : data.current_page,
            }
        )

    });
});
export const SentGroupMessagesApi = ({kelompok, message})=>new Promise(resolve => {
   axios.post('api/websocket/kelompok/chats/'+kelompok, {message}).then(res=>{
       resolve(res.data);
   })
});

export const JoinGroup = (kelompok)=>new Promise(resolve => {
    axios.post('api/kelompok/join/'+kelompok).then(res=>{
        resolve(res.data);
    }).catch(_=>{
        alert('Kesalahan server hubungi admin spikr')
    })
});