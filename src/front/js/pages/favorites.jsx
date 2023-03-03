import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Link, useParams } from "react-router-dom";

import { CardCollection } from "../component/cardCollection.jsx";

export const Favorites = () => {
	const { store, actions } = useContext(Context);

	useEffect(() => {
		async function func() {
			await actions.getFavorites()
		}
		func()
	},[store.accessToken])


	return (
        <></>
	);
};
