import React, {useContext} from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

export function CardCollection(props) {
    const { store, actions } = useContext(Context);
    
    // console.log("Favorites:"+store.Favorites)
    // console.log(store.Favorites)
    

    return (
        <>
            {
                props.data.map((e) => {
                    
                    let isFavorite = store.Favorites.some((element)=>(element.uid==e.uid && element.type == props.type))
                    return (<div className="card bg-dark" style={{ width: "18rem" }}>
                        <img src={`https://starwars-visualguide.com/assets/img/${props.type == "people" ? "characters" : props.type}/${e.uid}.jpg`} alt="" />
                        <div className="card-body">
                            <h5 className="card-title">{e.name}</h5>
                            <Link to={'/' + e.url.slice(27)} className="btn btn-primary">Details</Link>
                            <i className={`bi bi-star${(isFavorite)?'-fill':''}`} onClick={()=>{
                                actions.toogleFav(e.name, props.type, e.uid)
                            }}></i>
                        </div>
                    </div>)
                })

            }
        </>
    )
}