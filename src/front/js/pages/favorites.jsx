import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link, useParams } from "react-router-dom";

export const Favorites = () => {
	const { store, actions } = useContext(Context);

	useEffect(() => {
		console.log(store.accessToken)
		actions.getFavorites()
	}, [store.accessToken])

	function FavoriteCard({ name, id, type }) {
		return (
			<div>
				<img src={`https://starwars-visualguide.com/assets/img/${type == "people" ? "characters" : type}/${id}.jpg`} alt="" />

				<div>
					<h2>{name}</h2>
				</div>
			</div>
		)
	}

	console.log(store.favorites.characters)


	return (
		<div>
			<h1>Your Favorites</h1>

			<div>
				<h2>Characters</h2>
				<div>
					{store.favorites.characters.map((e) => <FavoriteCard id={e.id} name={e.name} type='characters' />)}
				</div>
			</div>
			<div>
				<div>
					{store.favorites.films.map((e) => <FavoriteCard id={e.id} name={e.name} type='films' />)}
				</div>
			</div>
			<div>
				<div>
					{store.favorites.planets.map((e) => <FavoriteCard id={e.id} name={e.name} type='planets' />)}
				</div>
			</div>
			<div>
				<div>
					{store.favorites.species.map((e) => <FavoriteCard id={e.id} name={e.name} type='species' />)}
				</div>
			</div>
			<div>
				<div>
					{store.favorites.starships.map((e) => <FavoriteCard id={e.id} name={e.name} type='starships' />)}
				</div>
			</div>
			<div>
				<div>
					{store.favorites.vehicles.map((e) => <FavoriteCard id={e.id} name={e.name} type='vehicles' />)}
				</div>
			</div>
		</div>
	);
};
