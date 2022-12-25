import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { Link, useParams } from "react-router-dom";

export const Home = () => {
	const { store, actions } = useContext(Context);

	actions.getData("people")

	return (
		<div className="text-center mt-5">
			<h1>Home Page</h1>
		</div>
	);
};
