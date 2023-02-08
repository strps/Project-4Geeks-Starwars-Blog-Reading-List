import React, { useContext, useEffect, useState } from "react";
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
	}, [])


	console.log(store.HomeData)

	return (
		(store.HomeData) ?
			<div className="text-center mt-5">
				{store.HomeData.map((e, i) => {
					return (
						<div key={e[0]} className="home-card-collection-container">
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
