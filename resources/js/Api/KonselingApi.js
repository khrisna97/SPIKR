import axios from 'axios';
export const GetKonselorGroupdata = ({konselor_id})=>new Promise(resolve => {
    axios.get('api/websocket/konseling/'+konselor_id,).then(data=>{
        resolve(data.data.members);
    });
});
export const GetPatientApi = ({patient_id, page})=>new Promise(resolve => {

    window.axios.get('api/websocket/konseling/chat/'+patient_id+'?page='+page,).then(({data})=>{
        resolve(
            {
                last : data.last_page,
                data : data.data,
                total : data.total,
                page : data.current_page,
            }
        );
    })
});
export const SentKonselingMessagesApi = ({receiver_id, message})=>new Promise(resolve => {
    axios.post(baseurl+'/api/websocket/konseling/chat/'+receiver_id, {message}).then(res=>{
        resolve(res.data);
    })
});

export const ReportingCase = ({tipe, kelompok, keterangan, user})=>new Promise(resolve => {
    let data = {tipe, kelompok, user, keterangan};

    if (kelompok){
        data = {...data, kelompok};
    }

    axios.post('api/kasus',data).then(res=>{
        resolve(res);
    })
});

export const getConselorList = ({page, name})=>new Promise(resolve=>{
    let link = '../api/konselorlist?page='+page;
    if (name){
        link+= '&&name='+name
    }
    axios.get(link).then(({data})=>{
        resolve(
            {
                last : data.last_page,
                data : data.data,
                total : data.total,
                page : data.current_page,
            }
        );
    })
});
export const getMessagesInfo = ({page,name})=>new Promise(resolve=>{
    let link = '../api/messages?page='+page;
    if (name){
        link += '&&name='+name;
    }
    axios.get(link).then(({data})=>{
        resolve(
            {
                last : data.last_page,
                data : data.data,
                total : data.total,
                page : data.current_page,
            }
        );
    })
});
export const getConversations = ({page, userid})=>new Promise(resolve=>{
    axios.get(`../api/messages/${userid}?page=`+page).then(({data})=>{
        resolve(
            {
                last : data.last_page,
                data : data.data,
                total : data.total,
                page : data.current_page,
            }
        );
    })
});
export const sentMessage = ({message, user})=>new Promise(resolve=>{
    axios.put(`../api/messages`,{pesan:message, ke:user}).then(({data})=>{
        resolve('success');
    }).catch(_=>{
        alert('Maaf terjadi kesalahan')
    })
});
