import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link, useParams } from "react-router-dom";
import { Page404 } from "./404.jsx";

export function Element() {
    const { store, actions } = useContext(Context);
    const params = useParams();

    const [data, setData] = useState(null)

    useEffect(() => {
        async function func() {
            const response = await actions.getData(params.element, params.id)
            console.log(response)
            setData(response.properties)
        }
        func()
    }, [])

    return (
        data ?
            <div>
                <h1>{data.name}</h1>
                <img src={`https://starwars-visualguide.com/assets/img/characters/${params.id}.jpg`} alt="" />
                <ul>
                    {
                        Object.keys(data).map((key)=>{
                            return(<li><strong>{key}: </strong><span>{data[key]}</span></li>)
                        })
    
                    }
                </ul>
            </div >
            :
            <Page404 />
    )
}