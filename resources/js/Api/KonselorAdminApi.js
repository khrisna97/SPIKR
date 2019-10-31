import axios from "axios";

export const DetailKelompokAPI = async (kelompokID)=>new Promise(resolve => {
    axios.get('api/kelompok/'+kelompokID).then(res=>{
        const {data} = res;

        if (data['bad-query']){
            resolve(null)
        }else {
            resolve(data);
        }
    });
});

export const KonselorEditKelompok = (id,data ,setStatus, setTimer, setError)=>{
    setStatus('process');
    axios.post('api/kelompok/'+id, data).then(()=>{
        setStatus('success');
    }).catch((res)=>{
        const {status, data} = res.response;
        const {username, email} = data.errors;
        let message = '';
        if (data.errors['nomor-ktp']){
            message = data.errors['nomor-ktp'][0];
        }else{
            message = username ? username[0] : email[0];
        }
        if (parseInt(status) === 422){
            setStatus('normal');
            setError({...data.errors});
        }
        if (parseInt(status) === 429){
            setStatus('ban');
            setTimer(parseInt(message));
            let n = parseInt(message);
            const countDown = window.setInterval(()=>{
                if (n === 0){
                    clearInterval(countDown);
                    setStatus('normal');
                }else{
                    n--;
                    setTimer(n);
                }
            }, 1000)
        }
    })
};

export const KonselorChatApi = (konselor_id, callback) =>{
    axios.get('api/websocket/konseling/'+konselor_id).then(res=>{
        callback(res.data)
    })
};
export const getInboxInGroup = ({page, name})=>new Promise(resolve=>{
    let link = '../api/konselor/inbox/ingroup?page='+page;
    if (name){
        link+= '&&name='+name
    }
    axios.get(link).then(({data})=>{
        console.log(data);
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
export const getInboxIall = ({page, name})=>new Promise(resolve=>{
    let link = '../api/konselor/inbox/all?page='+page;
    if (name){
        link+= '&&name='+name
    }
    axios.get(link).then(({data})=>{
        console.log(data);
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