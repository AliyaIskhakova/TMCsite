import React, { useContext } from "react";
import {Routes, Route, Navigate} from 'react-router-dom';
import { publicRoutes } from "../routes";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};
const AppRouter = () =>{
    return(
        <>
        <ScrollToTop/>
        <Routes>
            
            {publicRoutes.map(({path, Component})=>
            <Route key={path} path={path} element={<Component />} exact/>
            )}
            <Route path="*"  element={<Navigate to ={'/mainpage'} />}/>
        </Routes>
        </>
    );
}

export default AppRouter;