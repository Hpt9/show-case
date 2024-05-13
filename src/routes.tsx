
import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
​
function Routes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/"  element={<Home/>}/>
                <Route path="/" element={Page1}/>
                <Route path="/page-2" element={Page2}/>
                <Route path="/page-3" element={Page3}/>
                <Route element={NotFound}/>
            </Routes>
        </BrowserRouter>
    )
}
​
export default Routes;