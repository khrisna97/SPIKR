require('./bootstrap');

export const serialize=( obj )=> {
    let str = '?' + Object.keys(obj).reduce(function(a, k){
        a.push(k + '=' + encodeURIComponent(obj[k]));
        return a;
    }, []).join('&');
    return str;
};
export const GET = async (url)=> {
    return new Promise((resolve, reject) => {
        axios.get(url).then(({data})=>resolve(data)).catch((res)=>{
            const {response} = res;
            reject(response);
            alert("Error happening call admin@spikr or reload page");
        });
    });
};
export const POST = async (url, data)=> {
    return new Promise((resolve, reject) => {
        axios.post(url, data).then(({data})=>resolve(data)).catch((res)=>{
            const {response} = res;
            if (res.response.statusCode === 500)
                alert("Error happening call admin@spikr or reload page");
            reject(res.response);
        });
    });
};
export const PUT = async (url, data)=> {
    return new Promise((resolve, reject) => {
        axios.put(url, data).then(({data})=>resolve(data)).catch((res)=>{
            const {response} = res;
            if (res.response.statusCode === 500)
                alert("Error happening call admin@spikr or reload page");
            reject(res.response);
        });
    });
};
export const Userregistration = (data)=>POST('api/user/registration',data);
export const Konselorregistration = (data)=>POST('api/konselor/registration',data);
export const UserLogin = (data)=>POST('/login',data);
export const Add_kelompok = (data)=>PUT('api/kelompok',data);
export const Edit_kelompok = (id,data)=>POST('api/kelompok/'+id,data);
export const Logout =()=>POST('logout').then(()=>window.location.reload());