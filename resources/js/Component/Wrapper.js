import React from 'react';
import Scrollbar from "react-scrollbars-custom";
export default ({children})=>{
  return (
      <Scrollbar style={{ position: "" }}>{children}</Scrollbar>
  )
}