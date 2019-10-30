import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDotCircle, faEnvelope} from "@fortawesome/free-solid-svg-icons";
import {Badge} from "@material-ui/core";

const UserHeader = (prop) =>{

  const {name, online, unreaded, kelompok} = prop;

  return  (
      <React.Fragment>
        <h3 className='mt-4'>
          <FontAwesomeIcon className={`${online?'text-success':'text-dark'} mr-2`} icon={faDotCircle} />
          {
            unreaded ?
                <Badge title={`${unreaded} pesan belum di baca`} className={`${unreaded?'text-danger':''} mx-2`} badgeContent={unreaded}>
                  <FontAwesomeIcon className={'mr-2'} icon={faEnvelope} />
                </Badge>
                :''
          }
          {name}
        </h3>
        {
          kelompok ?
              "Pengguna ini merupakan anggota kelompok anda" : "Pengguna ini bukan dari kelompok anda"
        }
      </React.Fragment>
  )
};
export default UserHeader;