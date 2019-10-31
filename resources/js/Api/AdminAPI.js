import QueryStrings from "querystring";
import moment from "moment";
let Cache = {
    'quickstats':false,
    'KasusTerbanyak':false,
    'LaporanKasus': [],
    'FilterKelompokInKecamatan' : {},
    'LaporanKasusQuery':{}
};
import assert from 'assert'

export const QuickStatApi=async ()=>new Promise(resolve => {
    if (! Cache['quickstats']){
        axios.get('api/statistik').then(({data})=>{
            Cache['quickstats'] = data;
            resolve(Cache['quickstats']);
        })
    }else {
        resolve(Cache['quickstats']);
    }
});
export const KasusTerbanyakApi=async ()=>new Promise(resolve => {
    const link =  'api/statistik/kasus?get=true&&limit=5&&inkecamatan=true';
    if (! Cache['KasusTerbanyak']){
        axios.get(link).then(({data})=>{
            Cache['KasusTerbanyak'] = data;
            resolve(Cache['KasusTerbanyak']);
        })
    }else {
        resolve(Cache['KasusTerbanyak']);
    }
});
export const LaporanKasus=async (n)=>new Promise(resolve => {
    const link =  'api/statistik/kasus?get=true&&last_month='+n;
    const Call = () =>{
        axios.get(link).then(({data})=>{
            Cache['LaporanKasus'][n] = data;
            resolve(Cache['LaporanKasus'][n]);
        });
    };
    if (! Cache['LaporanKasus'].length ){
        Call();
    }else {
        if (Cache['LaporanKasus'][n]){
            resolve(Cache['LaporanKasus'][n]);
        }else{
            Call();
        }
    }
});
export const FilterKelompokInKecamatan= async (kecamatan)=>new Promise(resolve => {
    const link =  `api/kelompok?kecamatan=${kecamatan}&pagination=disable`;
    const Call = () =>{
        axios.get(link).then(res=>{
            Cache['FilterKelompokInKecamatan'][kecamatan] = res.data;
            resolve(res.data);
        });
    };
    if (! Cache['FilterKelompokInKecamatan']){
        Call();
    }else{
        if (! Cache['FilterKelompokInKecamatan'][kecamatan]){
            Call();
        }else{
            resolve(Cache['FilterKelompokInKecamatan'][kecamatan])
        }
    }
});


let savedUserQuery = {};

const QueryConverter = ({page, pageSize,search, Query }) =>{
    let ToConvert = {page:page+1, per_page: pageSize};
    if (search){
        ToConvert['nama'] = search;
    }

    if (Object.keys(Query).length){
        ToConvert ={...ToConvert, ...Query};
    }

    return QueryStrings.stringify(ToConvert);

};

export const UserListAPI = async (query , resolver, paginate = true)=> {

    const Link = "api/pengguna?tipe=3&" + QueryConverter(query);

    const Call = ()=>{
        axios.get('api/pengguna?tipe=3&' + QueryConverter(query)).then(res=>{
            let {data} = res;
            const {current_page, per_page, total} = data;

            data = data.data;
            if (paginate){
                const resolverParam = {
                    page: current_page - 1,
                    data,
                    totalCount:total,
                };
                resolver(resolverParam);
                savedUserQuery = {...savedUserQuery,[Link]:resolverParam}
            }else{
                resolver(res.data)
            }
        });
    };
    if (! savedUserQuery[Link]){
        Call();
    }else{
        resolver(savedUserQuery[Link])
    }
};
export const KonselorListAPI = async (query , resolver, paginate = true)=> {

    const Link = "api/pengguna?tipe=2&" + QueryConverter(query);

    const Call = ()=>{
        axios.get(Link).then(res=>{
            let {data} = res;
            if (paginate){
                const {current_page, per_page, total} = data;

                data = data.data;

                const resolverParam = {
                    page: current_page - 1,
                    data,
                    totalCount:total,
                };
                resolver(resolverParam);
                savedUserQuery = {...savedUserQuery,[Link]:resolverParam}
            }else{
                resolver(data);
            }

        });
    };
    if (! savedUserQuery[Link]){
        Call();
    }else{
        resolver(savedUserQuery[Link])
    }
};


let savedLaporanKasusQuery = {};
export const LaporanKasusAPI =  (query , resolver, pagination = true)=> {
    const Link = "api/kasus?" + QueryConverter(query);
    const Call = ()=>{
        axios.get(Link).then( res=>{
            assert.ok(res.request.getFromCache !== true);
            let {data} = res;
            const {current_page, per_page, total} = data;
            if (pagination){

                data = data.data.map(item=>{
                    const waktu = moment(item.waktu).locale('id').format('dddd, Do MMMM YYYY');
                    return {...item, waktu};
                });

                const resolverParam = {
                    page: current_page - 1,
                    data,
                    totalCount:total,
                };
                resolver(resolverParam);
            }else{
                resolver(data)
            }
        });
    };
    if (! savedLaporanKasusQuery[Link]){
        Call();
    }else{
        resolver(savedLaporanKasusQuery[Link]);
    }
};

export const KonselorAddApi = (data ,setStatus, setTimer, setError)=>{
    setStatus('process');
    axios.put('api/konselor', data).then(()=>{
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

let KelompokListCache = {};
export const KelompokListAPI = async (query , resolver)=> {

    const Link = "api/kelompok?" + QueryConverter(query);

    const Call = ()=>{
        axios.get(Link).then(res=>{
            let {data} = res;
            const {current_page, per_page, total} = data;

            data = data.data;

            const resolverParam = {
                page: current_page - 1,
                data,
                totalCount:total,
            };
            resolver(resolverParam);
            KelompokListCache = {...KelompokListCache,[Link]:resolverParam}
        });
    };
    if (! KelompokListCache[Link]){
        Call();
    }else{
        resolver(KelompokListCache[Link])
    }
};
export const KelompokAddApi = (data ,setStatus, setTimer, setError)=>{
    setStatus('process');
    axios.put('api/kelompok', data).then(()=>{
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
export const createContent = ({konten, judul}, resover) =>{
    axios.post('api/berita',{konten,judul}).then(_=>{
        resover()
    }).catch(_=>{
        console.log(_)
    })
};
export const createGallery = (formdata, resover) =>{
    axios.post('api/galeri',formdata,{}).then(_=>{
        resover()
    }).catch(_=>{
        console.log(_)
    })
};
export const GalleryApi =  (query , resolver, pagination = true)=> {
    const Link = "api/galeri?" + QueryConverter(query);
    const Call = ()=>{
        axios.get(Link).then( res=>{
            assert.ok(res.request.getFromCache !== true);
            let {data} = res;
            const {current_page, per_page, total} = data;
            if (pagination){

                data = data.data.map(item=>{
                    const waktu = moment(item.waktu).locale('id').format('dddd, Do MMMM YYYY');
                    return {...item, waktu};
                });

                const resolverParam = {
                    page: current_page - 1,
                    data,
                    totalCount:total,
                };
                resolver(resolverParam);
            }else{
                resolver(data)
            }
        });
    };
    if (! savedLaporanKasusQuery[Link]){
        Call();
    }else{
        resolver(savedLaporanKasusQuery[Link]);
    }
};
export const ContentApi =  (query , resolver, pagination = true)=> {
    const Link = "api/berita?" + QueryConverter(query);
    const Call = ()=>{
        axios.get(Link).then( res=>{
            assert.ok(res.request.getFromCache !== true);
            let {data} = res;
            const {current_page, per_page, total} = data;
            if (pagination){

                data = data.data.map(item=>{
                    const waktu = moment(item.waktu).locale('id').format('dddd, Do MMMM YYYY');
                    return {...item, waktu};
                });

                const resolverParam = {
                    page: current_page -1,
                    data,
                    totalCount:total,
                };
                resolver(resolverParam);
            }else{
                resolver(data)
            }
        });
    };
    Call();

};
export const ContentApi1 =  (id, resolver)=> {

    const Link = "api/berita/" + id;

    axios.get(Link).then(_=>{
        resolver(_.data)
    });

};
export const DeleteContentApi = (id, resolver) =>{

    axios.delete('../api/berita/'+id).then((response)=>(resolver(response.data))).catch(reason => {
        resolver(reason.response);
    })
};
export const DeleteGaleriApi = (id, resolver) =>{

    axios.delete('../api/galeri/'+id).then((response)=>(resolver(response.data))).catch(reason => {
        resolver(reason.response);
    })
};