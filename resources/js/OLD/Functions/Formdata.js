/*
returning additional attribute value of an object from parameter
when some input have change or onkeyup
 */
export default (event, data, callback)=>{
    const name = event.target.getAttribute("name");
    const value = event.target.value;
    if (data[name])
        data[name].value = value;

    callback({...data});
}