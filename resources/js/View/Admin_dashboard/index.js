import React from "react";
import QuickStats from "./QuickStats"
import AnimatedDiv from "../../Component/AnimatedDiv";
import Charts from "./Charts";
const Admin_Dashboard = ()=>{
  return <AnimatedDiv>
      <QuickStats/>
      <Charts />
  </AnimatedDiv>
};

export default Admin_Dashboard