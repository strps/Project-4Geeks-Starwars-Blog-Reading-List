import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

export function CardCollection({type, data}) {
    const { store, actions } = useContext(Context);
    const favorites = store.favorites[type]
    return (
        <>
            {
                data?.map((e, i) => {
                    const isFavorite = favorites.some((element) => (element.id == e.id && element.type == type))
                    
                    return (
                        <div key={type + i} className="card">
                            <img src={`https://starwars-visualguide.com/assets/img/${type == "people" ? "characters" : type}/${e.id}.jpg`} alt="" />
                            <div className="card-body">
                                <h2 className="card-title">{e.name}</h2>
                                <div>
                                    <Link to={'/'+ type + '/'+ e.id} className="card-btn">Details</Link>
                                    {(store.accessToken)?<i key={i + type} className={`card-btn bi bi-star${(isFavorite) ? '-fill yellow' : ''}`} onClick={() => {
                                        actions.toogleFav(type, e.id)
                                    }}></i>:''}
                                </div>
                            </div>
                        </div>
                    )
                })

            }
        </>
    )
}