import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link, useParams } from "react-router-dom";

import { Page404 } from "./404.jsx";

export function Collection() {
    const { store, actions } = useContext(Context);
    const params = useParams();

    const [data, setData] = useState(null)

    useEffect(() => {
        async function func() {
            const response = await actions.getData(params.element, params.id)
            console.log(response)
            setData(response)
        }
        func()
    }, [])

    return (
        data ?
            <div>
                < h1 > Collection Component</h1 >
                <p>Element Type: {params.element}</p>
                <p>Id: {params.id}</p>
            </div > 
            : 
            <Page404/>
    )
}