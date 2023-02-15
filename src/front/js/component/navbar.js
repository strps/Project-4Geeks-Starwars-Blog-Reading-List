import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

export const Navbar = () => {
	const { store, actions } = useContext(Context);

	return (
		<nav className="navbar navbar-dark bg-dark">
			<div className="container">
				<Link to="/">
					<img className="logo" src="https://lumiere-a.akamaihd.net/v1/images/sw_logo_stacked_2x-52b4f6d33087_7ef430af.png" />
				</Link>
				<div className="ml-auto">
					{
					(store.accessToken)?
						<div className="dropdown">
							<button
								className="btn btn-secondary dropdown-toggle"
								type="button"
								data-bs-toggle="dropdown"
								aria-expanded="false"
							>
								Favorites
							</button>
							<ul className="dropdown-menu">
								{(store.Favorites.length == 0) ? <li><p className="dropdown-item">No Favorites Added</p></li> :
									store.Favorites.map((e, id) => {
										return (
											<li key={id} className="fav-li">
												<Link className="dropdown-item" to={e.type + "/" + e.id}>
													{e.name}
												</Link>
												<button onClick={() => { actions.toogleFav(e.name, e.type, e.id) }}>
													<i
														className="bi bi-trash"
													></i>
												</button>
											</li>
										);
									})}
							</ul>
						</div>
						:
						<ul>
							<li>
								<Link to="/login" className="btn btn-secondary">Log in</Link>
								<Link to="/signup" className="btn btn-secondary">Sign in</Link>
							</li>
						</ul>
					}
				</div>
			</div>
		</nav>
	);
};
