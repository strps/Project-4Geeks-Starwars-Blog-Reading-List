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
				setDataCollections((prev) => [...prev, [e, res]])
			})
		}
		func()
	}, [])

	return (
		(dataCollections) ?
			<div className="text-center mt-5">
				{dataCollections.map((e, i) => {
					return (
						<div key={e[0]} className="home-card-container">
							<h2 className="col-12">{e[0].toUpperCase()}</h2>
							<div className="horizontal-scroll">
								<CardCollection type={e[0]} data={e[1]} />
								<div className="element-card p-2 col-12 more">
									<Link to={e[0]+"?page=1"}>More...</Link>
								</div>
							</div>
						</div>
					)

				})}



			</div>
			: <h1>Loading</h1>
	);
};
