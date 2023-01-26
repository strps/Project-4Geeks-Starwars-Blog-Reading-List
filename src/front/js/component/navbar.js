import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";


export const Navbar = () => {
	const { store, actions } = useContext(Context);

	return (
		<nav className="navbar navbar-dark bg-dark">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">LOGO</span>
				</Link>
				<div className="ml-auto">
					<div className="dropdown">
						<button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
							Favorites
						</button>
						<ul className="dropdown-menu">
							{store.Favorites.map((e) => {
								return(<li key={e.type+'-'+e.uid}><Link className="dropdown-item" to={e.type+'/'+e.uid}>{e.name}</Link></li>)
							})}
						</ul>
					</div>
				</div>
			</div>
		</nav>
	);
};
