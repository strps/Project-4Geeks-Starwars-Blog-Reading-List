import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link, useParams } from "react-router-dom";

import { CardCollection } from "../component/cardCollection.jsx";
import { Pagination } from "../component/pagination.jsx";
import { Page404 } from "./404.jsx";
import { useSearchParams } from "react-router-dom";

export function Collection() {
    const { store, actions } = useContext(Context);
    const params = useParams();
    let [searchParams, setSearchParams] = useSearchParams()

    useEffect(() => {
        async function func() {
            await actions.getCollectionData(params.element,searchParams.get("page"),24)
        }
        func()
    }, [searchParams.get("page")])

    return (
        store.Collection ?
            <div className="collection">
                < h1 > {params.element.toUpperCase()}</h1 >
                <Pagination pages={store.Collection['total pages']} currentPage={parseInt(searchParams.get("page"))} element={params.element} ></Pagination>
                <div className="card-collection-container">
                <CardCollection data={store.Collection['results']} type={params.element} />
                </div>
                <Pagination pages={store.Collection['total pages']} currentPage={parseInt(searchParams.get("page"))} element={params.element} ></Pagination>
            </div >
            :
            <Page404 />
    )
}