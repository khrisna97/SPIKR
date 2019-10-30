import React, {Component} from 'react';
import AdminHeaderLayout from "../../Component/AdminHeaderLayout";
import Konselor from './FormKonselor';
class Add_kelompok extends Component {
    render() {
        return (
            <AdminHeaderLayout>
                <div className="card">
                    <div className="card-body">
                        <Konselor />
                    </div>
                </div>
            </AdminHeaderLayout>
        );
    }
}

export default Add_kelompok;