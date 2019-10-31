export default (data ,setStatus, setTimer, setError)=>{
    setStatus('process');
    axios.post('api/user/registration', data).then(()=>{
        setStatus('success');
    }).catch((res)=>{
        const {status, data} = res.response;
        const {username, email} = data.errors;
        const message = username ? username[0] : email[0];
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
}