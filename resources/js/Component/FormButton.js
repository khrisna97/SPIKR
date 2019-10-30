import React from 'react';
import {Button} from "reactstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faBan,
    faBookMedical,
    faEdit,
    faPlusCircle,
    faSyncAlt,
    faUser,
    faUserPlus
} from "@fortawesome/free-solid-svg-icons";

export const LoginBTN = (prop)=> <Btn {...prop} size={'sm'} Icon={faUser} Color='primary' Text={'Login'} />;
export const LoginLoading = (prop)=> <Btn disabled {...prop} size={'sm'} Icon={faSyncAlt} Loader Color='primary' Text={'Loading'} />;
export const RegisterBTN = (prop)=> <Btn {...prop} size={'lg'} Icon={faUserPlus} Color='primary' Text={'Daftar'} />;
export const RegisterBTNLoading = (prop)=> <Btn disabled {...prop} size={'lg'} Icon={faSyncAlt} Loader Color='primary' Text={'Loading'} />;
export const RegisterKelompokBTN = (prop)=> <Btn {...prop} size={'lg'} Icon={faPlusCircle} Color='secondary' Text={'Daftarkan kelompok'} />;
export const RegisterKelompokBTNLoading = (prop)=> <Btn disabled {...prop} size={'lg'} Icon={faSyncAlt} Loader Color='primary' Text={'Loading'} />;
export const EditKelompokBTN = (prop)=> <Btn {...prop} size={'lg'} Icon={faEdit} Color='secondary' Text={'Simpan'} />;
export const EditKelompokBTNLoading = (prop)=> <Btn disabled {...prop} size={'lg'} Icon={faSyncAlt} Loader Color='primary' Text={'Loading'} />;
export const LaporanBTN = (prop)=> <Btn {...prop} size={'lg'} Icon={faBookMedical} Color='secondary' Text={'Simpan'} />;
export const LaporanBTNLoading = (prop)=> <Btn disabled {...prop} size={'lg'} Icon={faSyncAlt} Loader Color='primary' Text={'Loading'} />;

export const HapusAkun = (prop)=> <Btn {...prop} size={'lg'} Icon={faBan} Color='secondary' Text={'Hapus akun'} />;
export const HapusAkunLoading = (prop)=> <Btn disabled {...prop} size={'lg'} Icon={faSyncAlt} Loader Color='primary' Text={'Loading'} />;


const Btn = ({disabled,size, Icon, Text, Color, Loader, onClick}) => {
  return (
    <Button className={'w-100'} disabled={disabled} onClick={onClick} size={size} color={Color}>
      <FontAwesomeIcon icon={Icon} className={`mr-2 ${Loader ? "fa-spin" : ""}`} />
      {Text}
    </Button>
  )
};