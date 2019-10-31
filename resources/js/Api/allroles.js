import Cookie from 'universal-cookie';
export const logout = async ()=>{
    axios.post('logout').then(res=>{
        const cook = new Cookie();
        cook.remove('token');
        window.location = baseurl;
    });
};

export const UpdateAccountData = (id, data, setter, errorSetter)=>{
    setter('loading');
    axios.post('api/pengguna/'+id, data).then(res=>{
        setter('updated')
    }).catch(response=>{
        const res = response.response;
        if (res.status === 422){
            const {errors} = res.data;
            errorSetter(errors);
            setter('normal');
        }
    })
};

export const getGroupChatData = (groupid, setter,page)=>{
    axios.get('api/kelompok/'+groupid+'/chat?page='+ page).then(res=>{
        setter(res.data.data);
    })
};
export const JoinGroupChatAPI = (groupid, Setter)=>{
    axios.get('api/websocket/group/'+groupid).then(({data})=>{
        Setter && Setter(data);
    });
};

export const SentGroupMessageApi = (groupid, message)=>{
    axios.post('api/websocket/group/message/'+groupid, {message}).then(()=>{});
};
export const SentKonselingMessageApi = (room_id, message, receiver,resolver)=>{
    axios.post('api/websocket/konseling/chat/'+receiver, {room_id,message}).then((res)=>{
        resolver(res.data);
    });
};

export const getKonselingChatsApi = (anggota_id, page, resolver)=>{
    axios.get(`api/websocket/konseling/chat/${anggota_id}?page=${page}`).then((res)=>{
        resolver({
            data : res.data.data,
            lastpage:res.data.last_page
        })
    });
};

export const StartKonselingSessionAPI = ( konselor_id, anggotaid, resolver )=>{
    axios.get(`api/websocket/konseling/${konselor_id}/${anggotaid}`).then((res)=>{
        resolver(res.data);
    });
};

export const getKelompokInKecamatan = (kecamatan_id, resolver)=>{
    axios.get(`api/kelompok?kecamatan=${kecamatan_id}&&pagination=disable`).then((res)=>{
        resolver(res.data);
    });
};

export const DeleteAccount =({username, password}, resolve)=>{
    axios.post('pengguna/delete', {username, password}).then(_=>{
        resolve()
    }).catch((_)=>{
        let {errors} = _.response.data;
        Object.keys(errors).forEach((key)=>{
            errors[key] = errors[key][0];
        })
        resolve({errors});
    });
};