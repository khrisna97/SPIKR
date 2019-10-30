/*
validating :
always :
1. required

optional based on object type parameter :
1. email
2. numeric
3. password {applied min 5 character}

returning an object {data, passed}
data : additional/change attribute {error, and message} of an array object from parameter
passed : boolean true validation is passed, false otherwise
 */
export default (data, callback)=>{
    let passed = false;
    let newdata = data;
    Object.keys(newdata).forEach((name)=>{
        // Check for required
        let error =  newdata[name].value === "";
        let message = "Wajib di isi";
        newdata[name] = {...newdata[name],error,message};
    });
    callback({...newdata});
};