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
            const response = await actions.getElementData(params.element, params.id)
            setData(response.properties)
        }
        func()
    })

    return (
        data ?
            <div>
                <h1>{data.name}</h1>
                <img src={`https://starwars-visualguide.com/assets/img/${params.element == "people" ? "characters" : params.element}/${params.id}.jpg`} alt="" />
                <ul>
                    {
                        Object.keys(data).map((key) => {
                            if (key !== "url" && key != "created" && key != "edited" && data[key]!='n/a' && data[key]!="") { //removing empty or "n/a" properties and other properties that should not be shown
                                return (<li key={key}><strong>{key}: </strong>{
                                    (typeof data[key] === 'object' )? //checks if is an object if it is will return a Link component
                                    <Link to={'/'+data[key].path}>{data[key].name}</Link>:
                                    <span>{data[key]}</span>}</li>)
                            }
                        })
                    }
                </ul>
                <Link to={-1}>Atras</Link>
            </div >
            :
            <Page404 />
    )
}