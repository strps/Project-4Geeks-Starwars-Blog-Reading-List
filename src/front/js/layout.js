import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import { Home } from "./pages/home";
import { Element } from "./pages/element.jsx";
import { Collection } from "./pages/collection.jsx";
import { Page404 } from "./pages/404.jsx";

import { Navbar } from "./component/navbar"
import { Footer } from "./component/footer"
import injectContext from "./store/appContext";
import { Component } from "react/cjs/react.production.min";



//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    return (
        <div>
            <BrowserRouter basename={basename}>
                <Navbar />
                <div className="container">
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<Collection />} path="/:element" />
                        <Route element={<Element />} path="/:element/:id" />
                        <Route element={<Page404 />} path="*" />
                    </Routes>
                </div>
                <Footer />
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
