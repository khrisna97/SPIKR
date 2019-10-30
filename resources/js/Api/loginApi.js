import cookie from "universal-cookie";
export default (data,statusSet, timerSet, seterror)=> {
  statusSet('process');
  axios.post('login', data).then(res=>{
    const Cook = new cookie();
    Cook.set('token', res.data);
    window.location.reload()
  }).catch((res)=>{
    const {status, data} = res.response;
    const {username, email} = data.errors;
    const message = username ? username[0] : email[0];
    if (parseInt(status) === 422){
      statusSet('normal');
      let errors = [];
      Object.keys(data.errors).forEach(key=>{
        let error = {};
        error['message']  = data.errors[key][0];
        error['type']  = 'danger';
        errors = [...errors, error];
      });


      seterror(errors);
    }
    if (parseInt(status) === 429){
      statusSet('ban');
      timerSet(parseInt(message));
      let n = parseInt(message);
      const countDown = window.setInterval(()=>{
        if (n === 0){
          clearInterval(countDown);
          statusSet('normal');
        }else{
          n--;
          timerSet(n);
        }
      }, 1000)
    }
  })
};