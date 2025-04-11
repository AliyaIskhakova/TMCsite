import React, { useContext } from "react";
import {Routes, Route, Navigate} from 'react-router-dom';
import { publicRoutes } from "../routes";
const AppRouter = () =>{
    return(
        <Routes>
            
            {publicRoutes.map(({path, Component})=>
            <Route key={path} path={path} element={<Component />} exact/>
            )}
            <Route path="*"  element={<Navigate to ={'/mainpage'} />}/>
        </Routes>
    );
}

export default AppRouter;