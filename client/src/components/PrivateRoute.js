import React from "react";
import { Route, Redirect } from "react-router-dom";
import { auth } from "../firebase";

export default function PrivateRoute({component: Component, ...rest}){
    return(
        <Route
        {...rest}
        render={props=>{
           auth.currentUser? <Component{...props}/> :  <Redirect to="/signin"/>
        }}>
        </Route>
    )
}