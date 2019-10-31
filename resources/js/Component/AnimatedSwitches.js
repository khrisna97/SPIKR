import React from 'react';
import posed, { PoseGroup } from 'react-pose';
import {Redirect, Route, Switch} from 'react-router-dom';
const RouteContainer = posed.div({
  enter: { opacity: 1, delay: 300, beforeChildren: true },
  exit: { opacity: 0 }
});



const Normal = (Routes)=>(
    <Switch location={location}>
        {
            Routes.map(({Path, Component}, key)=> <Route exact path={Path} component={Component} key={key}/>)
        }
        <Route component={()=>{ alert('Halaman yang anda minta tidak di temukan'); return <Redirect to={''} />}} />
    </Switch>
);

const Animated = ()=>{
    return(
        <Route render={({location})=>{
            const {pathname} = location;
            console.log(pathname);
            return (
                <PoseGroup>
                    <RouteContainer key={pathname}>
                        {
                            Normal(Routes)
                        }
                    </RouteContainer>
                </PoseGroup>
            )
        }}/>
    )
};

export default ({Routes})=>{
  return Normal(Routes)
}
