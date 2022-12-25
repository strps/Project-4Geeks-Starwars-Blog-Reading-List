import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import { Home } from "./pages/home";
import { Element } from "./pages/element.jsx";
import { Collection } from "./pages/collection.jsx";
import { Page404 } from "./pages/404.jsx";
import injectContext from "./store/appContext";



//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    return (
        <div>
            <BrowserRouter basename={basename}>
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<Collection/>} path="/:element" />
                        <Route element={<Element/>} path="/:element/:id" />
                        <Route element={<Page404/>} path="*" />
                    </Routes>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
