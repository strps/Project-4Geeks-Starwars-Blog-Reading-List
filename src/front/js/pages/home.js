import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Link, useParams } from "react-router-dom";

import { CardCollection } from "../component/cardCollection.jsx";

export const Home = () => {
	const { store, actions } = useContext(Context);

	const [dataCollections, setDataCollections] = useState([])

	useEffect(() => {
		let types = ["people", "starships", "vehicles", "species", "planets"]
		async function func() {
			types.map(async (e) => {
				let res = await actions.getCollectionData(e)
				res = res.results || res.result
				setDataCollections((prev)=>[...prev, [e, res]])
			})

		}
		func()
	}, [])

	return (
		(dataCollections) ?
			<div className="text-center mt-5">
				{dataCollections.map((e) => {
					return (
						<div className="home-card-container" style={{display:"flex"}}>
							<h2 className="col-12">{e[0]}</h2>
							<CardCollection type={e[0]} data={e[1]} />
							<Link to={e[0]}>More...</Link>
						</div>
					)

				})}



			</div>
			: <h1>Loading</h1>
	);
};
