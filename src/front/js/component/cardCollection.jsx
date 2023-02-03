import { element } from "prop-types";
import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

export function CardCollection(props) {
    const { store, actions } = useContext(Context);

    // console.log("Favorites:"+store.Favorites)
    // console.log(store.Favorites)


    return (
        <>
            {
                props.data.map((e, i) => {
                    let isFavorite = store.Favorites.some((element) => (element.uid == e.uid && element.type == props.type))
                    return (
                        <div key={props.type + i} className="card element-card p-2 col-12">
                            <img src={`https://starwars-visualguide.com/assets/img/${props.type == "people" ? "characters" : props.type}/${e.uid}.jpg`} alt="" />
                            <div className="card-body">
                                <h2 className="card-title">{e.name}</h2>
                                <div>
                                    <Link to={'/' + e.url.slice(27)} className="card-btn">Details</Link>
                                    <i key={i + props.type} className={`card-btn bi bi-star${(isFavorite) ? '-fill yellow' : ''}`} onClick={() => {
                                        actions.toogleFav(e.name, props.type, e.uid)
                                    }}></i>
                                </div>
                            </div>
                        </div>
                    )
                })

            }
        </>
    )
}