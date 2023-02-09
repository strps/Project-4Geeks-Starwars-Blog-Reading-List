import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link, useParams } from "react-router-dom";

import { CardCollection } from "../component/cardCollection.jsx";
import { Pagination } from "../component/pagination.jsx";
import { Page404 } from "./404.jsx";
import { useSearchParams } from "react-router-dom";

import "../../styles/collection.css";

export function Collection() {
    const { store, actions } = useContext(Context);
    const params = useParams();
    let [searchParams, setSearchParams] = useSearchParams()

    useEffect(() => {
        async function func() {
            await actions.getCollectionData(params.element,searchParams.get("page"),10)
        }
        func()
    }, [searchParams.get("page")])

    return (
        store.Collection ?
            <div className="container d-flex flex-column align-items-center">
                < h1 > {params.element.toUpperCase()}</h1 >
                <Pagination pages={store.Collection['total pages']} currentPage={parseInt(searchParams.get("page"))} element={params.element} ></Pagination>
                <div className="row g-2 mb-3">
                <CardCollection data={store.Collection['results']} type={params.element} />
                </div>
                <Pagination pages={store.Collection['total pages']} currentPage={parseInt(searchParams.get("page"))} element={params.element} ></Pagination>
            </div >
            :
            <Page404 />
    )
}