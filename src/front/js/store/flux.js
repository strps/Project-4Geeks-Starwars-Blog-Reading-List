const apiUrl = process.env.BACKEND_URL+"/api"

const getState = ({ getStore, getActions, setStore }) => {
	return {

		store: {
			Favorites: [],
			Element: {},
			Collection: {},
			HomeData:[]
		},
		
		actions: {

			//get Collection Data
			getCollectionData: async (element, page = 1, limit = 5) => {

				let response = await fetch(apiUrl+`/${element}?page=${page}&limit=${limit}`)
				if (response.ok) {
					response = await response.json()
				} else {
					console.error("Something went wrong: " + response.statusText)
					return null
				}
				setStore({Collection: response})
			},

			getHomeData : ()=>{

			},


			//Get data for each element
			getElementData: async (element, id) => {

				let response = await fetch(apiUrl+`/${element}/${id}`)
				if (response.ok) {
					response = await response.json()
				} else {
					console.error("Something went wrong: " + response.statusText)
					return null
				}
				return (response)
			},

			//Toogle from favorites
			toogleFav: (name, type, id) => {
				let str = getStore()
				if(str.Favorites.some((e) => e.type == type && e.id == id)){
					str.Favorites = str.Favorites.filter((e)=> !(e.type == type && e.id == id))
				}else{
					str.Favorites = [...str.Favorites, { name: name, type: type, id: id }]
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
