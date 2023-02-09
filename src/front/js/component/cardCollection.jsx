import { element } from "prop-types";
import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

export function CardCollection({type, data}) {
    const { store, actions } = useContext(Context);

    return (
        <>
            {
                data.map((e, i) => {
                    let isFavorite = store.Favorites.some((element) => (element.id == e.id && element.type == type))
                    return (
                        <div key={type + i} className="card element-card p-2 col-12">
                            <img src={`https://starwars-visualguide.com/assets/img/${type == "people" ? "characters" : type}/${e.id}.jpg`} alt="" />
                            <div className="card-body">
                                <h2 className="card-title">{e.name}</h2>
                                <div>
                                    <Link to={'/'+ type + '/'+ e.id} className="card-btn">Details</Link>
                                    <i key={i + type} className={`card-btn bi bi-star${(isFavorite) ? '-fill yellow' : ''}`} onClick={() => {
                                        actions.toogleFav(e.name, type, e.id)
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