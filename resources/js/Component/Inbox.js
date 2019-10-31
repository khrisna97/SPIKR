import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";
import InboxItem from './InboxItem';
import { Input, InputGroup, InputGroupAddon} from "reactstrap";

const Form = ({loading, resetor,InputHandler, InputRefs, ButtonHandler,data }) =>{
    const disabled = loading || !data.length;
    const InputProp = {
        disabled,
        onKeyUp : InputHandler,
        innerRef : InputRefs,
        placeholder : 'Cari berdasarkan nama'
    };
    return (
        <div className='mb-3 text-right'>
            <InputGroup>
                <Input {...InputProp}  />
                <InputGroupAddon onClick={ButtonHandler} className='pointer border-left'  addonType="append">
                    Cari
                </InputGroupAddon>
            </InputGroup>
            <button onClick={resetor} disabled={loading} className="btn btn-sm btn-primary mt-2">
                Reset
            </button>
        </div>
    )
};

class Inbox extends React.Component{

    _Mounted = false;

    state = {
        last : -1,
        data : [],
        loading : false,
        page : 1,
        namequery : ''
    };

    constructor(props) {
        super(props);
        this. InputRefs = React.createRef();
    }


    Setup=(custompage)=>{
        const {page, namequery} = this.state;
        const {api, customfunction} = this.props;
        this.setState({
            loading:true,
        });

        const param = {
            page : custompage ? custompage : page
        };

        if (namequery){
            param.name = namequery
        }

        api(param).then((data)=>{

            customfunction && typeof customfunction === 'function' && customfunction(data);

            setTimeout(()=>{
                this.setState({
                    data : page === 1 || ( custompage && custompage === 1)? data.data : [...this.state.data , ...data.data],
                    last : data.last,
                    page : (custompage ? custompage : page)+1 ,
                    loading : false,
                });
            }, 1000);
        })
    };

    componentDidMount() {

        this._Mounted = true;

        this.Setup();
        const {Listener} = this.props;
        Listener.messages(()=> {
            const {namequery} = this.state;
            ! namequery && this._Mounted && this.Setup(1)
        });
    }

    componentWillUnmount() {
        this._Mounted = false;
    }

    withQuery  = (query)=>{
        const setter = async ()=>{
            this.setState({
                namequery : query
            });
        };
        setter().then(_=>{
            this.Setup(1)
        })
    };

    ButtonHandler = ()=>{
        if (this.InputRefs.current && !this.state.loading){
            this.InputRefs.current.value && this.withQuery(this.InputRefs.current.value);
        }
    };
    InputHandler = (evt) =>{
        const {keyCode} = evt;
        if (keyCode === 13){
            this.withQuery(evt.target.value);
        }
    };

    render() {
        const {data, loading, namequery} = this.state;
        const {Wrapper} = this.props;
        return (
            <Wrapper>
                <Form
                    data={data}
                    loading={loading}
                    ButtonHandler={this.ButtonHandler}
                    InputHandler={this.InputHandler}
                    InputRefs={this.InputRefs}
                    resetor ={()=>{
                        const reset = async() => this.setState({namequery: ''});
                        reset().then(_=>this.Setup(1))
                    }}
                />
                {
                    data.length ?
                        <InboxItem onClick={this.props.onClick} data={data} /> :
                        this.state.loading ?
                            <p className='text-center'>
                                <FontAwesomeIcon className='mr-2' icon={faSpinner} spin />
                                Loading data</p> :
                            <p className='text-center'>
                                {
                                    namequery ? "Pencarian tidak di temukan" : 'Anda tidak mempunyai pesan apapun'
                                }
                            </p>
                }
                <div className='text-center mt-3'>
                    {
                        this.state.page >= this.state.last ? "":
                            <button disabled={this.state.loading} onClick={()=>this.Setup(this.state.page++)} className="btn btn-primary btn-sm">
                                {
                                    this.state.loading ?
                                        <FontAwesomeIcon className='mr-2' icon={faSpinner} spin /> : "Tampilkan lebih banyak"
                                }
                            </button>
                    }
                </div>
            </Wrapper>
        );
    }
}

export default (Prop)=><Prop.Hook.Consumer>
    {
        _prop=>    <Inbox {...Prop}  {..._prop}/>
    }
</Prop.Hook.Consumer>;