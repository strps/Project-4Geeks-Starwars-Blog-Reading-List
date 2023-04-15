import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link, useParams } from "react-router-dom";

import { CardCollection } from "../component/cardCollection.jsx";

export const Home = () => {
	const { store, actions } = useContext(Context);

	useEffect(() => {
			actions.getHomeData()	
			if(store.accessToken){actions.getFavorites()}
	},[store.accessToken])


	function HomeCollectionContainer ({type, Collectiondata}){
		return(
			<div className="card-collection-container">
				<h2 className="col-12">{type.toUpperCase()}</h2>
				<div className="horizontal-scroll">
					<CardCollection type={type} data={Collectiondata} />
					<div className="card">
						<Link to={type+"?page=1"}>More...</Link>
					</div>
				</div>
			</div>
		)
	}


	return (
		(store.HomeData) ?
			<div className="home">
				<HomeCollectionContainer type = "characters" Collectiondata={store.HomeData.characters}/>
				<HomeCollectionContainer type = "films" Collectiondata={store.HomeData.films}/>
				<HomeCollectionContainer type = "starships" Collectiondata={store.HomeData.starships}/>
				<HomeCollectionContainer type = "vehicles" Collectiondata={store.HomeData.vehicles}/>
				<HomeCollectionContainer type = "species" Collectiondata={store.HomeData.species}/>
				<HomeCollectionContainer type = "planets" Collectiondata={store.HomeData.planets}/>
			</div>
			:
			<h1>Loading</h1>
	);
};
