import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Link, useParams } from "react-router-dom";

import { CardCollection } from "../component/cardCollection.jsx";

export const Home = () => {
	const { store, actions } = useContext(Context);

	useEffect(() => {
		async function func() {
			await actions.getHomeData()
		}
		func()
	},[])

	// console.log(store.HomeData)

	function HomeCollectionContainer ({type, Collectiondata}){
		return(
			<div className="home-card-collection-container">
				<h2 className="col-12">{type.toUpperCase()}</h2>
				<div className="horizontal-scroll">
					<CardCollection type={type} data={Collectiondata} />
					<div className="element-card p-2 col-12 more">
						<Link to={type+"?page=1"}>More...</Link>
					</div>
				</div>
			</div>
		)
	}


	return (
		(store.HomeData) ?
			<div className="text-center mt-5">
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
