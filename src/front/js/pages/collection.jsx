import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link, useParams } from "react-router-dom";

import { CardCollection } from "../component/cardCollection.jsx";
import { Pagination } from "../component/pagination.jsx";
import { Page404 } from "./404.jsx";


export function Collection() {
    const { store, actions } = useContext(Context);
    const params = useParams();

    const [data, setData] = useState(null)

    useEffect(() => {
        async function func() {
            const response = await actions.getCollectionData(params.element)
            setData(response.results)
        }
        func()
    }, [])

    return (
        data ?
            <div>
                <Pagination pages={10} currentPage={5} element="people" ></Pagination>
                < h1 > {params.element.toUpperCase()}</h1 >
                <p></p>
                <CardCollection data={data} type={params.element} />
                <Pagination pages={10} currentPage={0} element="people" ></Pagination>
            </div >
            :
            <Page404 />
    )
}