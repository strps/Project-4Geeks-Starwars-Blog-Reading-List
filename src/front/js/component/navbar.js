import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

export const Navbar = () => {
	const { store, actions } = useContext(Context);

	return (
		<nav className="navbar">
			<Link to="/">
				<img className="logo" src="https://lumiere-a.akamaihd.net/v1/images/sw_logo_stacked_2x-52b4f6d33087_7ef430af.png" />
			</Link>
			<div className="ml-auto">
				{
					(store.accessToken) ?
						<div className="dropdown-">
							<Link to='/favorites' className="btn">Favorites</Link>
							<button onClick={() => { actions.logout() }}>Log out</button>
						</div>
						:

						<div>
							<Link to="/login" className="btn">Log in</Link>
							<Link to="/signup" className="btn">Sign in</Link>
						</div>

				}
			</div>
		</nav>
	);
};
