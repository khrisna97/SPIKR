export default ({Listener, classes})=>{

    Listener.messages((data)=>{

        const {selectedKonselor} = classes.state;

        if (selectedKonselor.id === data.sender.id){

            const {unreaded, sender} = data;
            const {name, id,online} = sender;

            classes._Mounted && classes.setState({
                selectedKonselor : {id, unreaded, name, online}
            })
        }
    });
}