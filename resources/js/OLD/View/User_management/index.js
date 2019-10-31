import React, {useState} from "react";
import AdminHeaderLayout from "../../Component/AdminHeaderLayout";
import {GET, serialize} from "../../api";
import Filter from './Filter';
import Table from './Table';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSyncAlt} from "@fortawesome/free-solid-svg-icons";
const Init = {
    data:[],
    loading:true,
    KelompokData:[]
};


class UserManagement extends  React.Component{
    constructor(props, context) {
        super(props, context);
        this.state = Init;
    }
    Setup =  (query = null)=>{
        let url = '?tipe=3';
        this.setState({
            loading:true,
        });
        if (typeof query === "string"){
            // Use link generated by laravel prev , next, last, first page link
            const {path} = this.state;
            url = query.replace(path,'');
        }
        if (typeof query === "object" && query!== null){
            //Use link generated by serialize filter
            url = serialize(query) + "&tipe=3";
        }
        GET('api/pengguna'+url).then(res=>{
            res.data = res.data.map((item)=>{
                item.gender = item.gender ? "Pria":"Wanita";
                return item;
            });
            this.setState({...res, loading:false});
        });
    };
    componentDidMount() {
        this.Setup();
    }
    onSubmitFilter=  (Query)=>{
        const {KelompokData} = this.state;
        if ((! KelompokData.length && Query.kecamatan) || Query.kecamatan){
            GET('api/kecamatan?search=kelompok&&id='+ Query.kecamatan).then(({data})=>{
                data = data.map(({nama, id})=>{
                    return {value:id, label:nama};
                });
                this.setState({
                    KelompokData: data
                });
            });
        }
        this.Setup(Query);
    };
    onPageChange=({page})=>{
        const {current_page,next_page_url,prev_page_url} = this.state;
        if (page+1 > current_page){
            this.Setup(next_page_url);
        }else {
            this.Setup(prev_page_url);
        }
    };
    onRowPageChange=({rowsPerPage})=>{
        this.Setup({per_page:rowsPerPage});
    };
    render() {
        return (
            <AdminHeaderLayout>
                <div className="card">
                    <div className="card-body">
                        <Filter {...this.state} Handler={this.onSubmitFilter} />
                    </div>
                </div>
                <div className="mt-5">
                    {
                        (this.state.data.length && !this.state.loading) ?
                            <Table {...this.state} RowChange={this.onRowPageChange} PageChange={this.onPageChange}/>
                            :
                            <div className="row justify-content-center"><FontAwesomeIcon className='fa-spin text-white fa-5x' icon={faSyncAlt} /></div>
                    }
                </div>
            </AdminHeaderLayout>
        )
    }
}
export default UserManagement;