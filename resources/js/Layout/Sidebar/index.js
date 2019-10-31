import React, {useState} from "react";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default ({open, brand, Toggler, Config})=>{

    return(
    <SwipeableDrawer
        open={open}
        onClose={()=>{}}
        onOpen={()=>{}}
        disableBackdropTransition={true}
        transitionDuration={0}
        ModalProps={{
            onBackdropClick:()=>Toggler()
        }}
    >
        <div className="p-3 pr-5">
            <div className=''>
                {brand}
            </div>
        </div>
        <Divider />
        <List>
            {Config.map(({Icon, Label, Path}, index) => {
                return Icon && Label ? <ListItem onClick={()=>Toggler(Path, Label) } button key={index}>
                    <ListItemIcon><React.Fragment> <FontAwesomeIcon icon={Icon} /> </React.Fragment></ListItemIcon>
                    <ListItemText primary={Label} />
                </ListItem> : ''
            })}
        </List>
    </SwipeableDrawer>
)}