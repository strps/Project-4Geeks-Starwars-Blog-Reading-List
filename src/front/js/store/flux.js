const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			Favorites: [],
			Element: {},
			Collection: {}
		},
		
		actions: {

			//get Collection Data
			getCollectionData: async (element, page = 1, limit = 5) => {

				let response = await fetch(`https://www.swapi.tech/api/${element}?page=${page}&limit=${limit}`)
				if (response.ok) {
					response = await response.json()
				} else {
					console.error("Something went wrong: " + response.statusText)
					return null
				}
				let str = getStore()
				str.Collection = response.results
				setStore(str)
				return response
			},


			//Get data for each element
			getElementData: async (element, id) => {

				let response = await fetch(`https://www.swapi.tech/api/${element}/${id ? id : ""}`)
				if (response.ok) {
					response = await response.json()
					response = response.result || response.results
				} else {
					console.error("Something went wrong: " + response.statusText)
					return null
				}
				//Checking if the property is a url, if change
				for (let prop in response.properties) {
					if (response.properties[prop].includes("https")) {
						response.properties[prop] = await parseURLtoLink(response.properties[prop])
					}
				}

				return (response)
			},

			//Toogle from favorites
			toogleFav: (name, type, uid) => {
				let str = getStore()
				if(str.Favorites.some((e) => e.type == type && e.uid == uid)){
					str.Favorites = str.Favorites.filter((e)=> !(e.type == type && e.uid == uid))
				}else{
					str.Favorites = [...str.Favorites, { name: name, type: type, uid: uid }]
				}
				setStore(str)
			}, 

		}
	};
};

//Takes a valid SWAPI url and return the name and the path to be use in a Link Component from ReacRouter
async function parseURLtoLink(url) {
	let newURL = new URL(url)

	let name = await fetch(newURL)
	if (name.ok) {
		name = await name.json()
		name = name.result || name.results
		name = name.properties.name
	} else {
		console.error("Something went wrong: " + name.statusText)
	}

	return {
		path: newURL.pathname.slice(5),
		name: name
	}
}
export default getState;
