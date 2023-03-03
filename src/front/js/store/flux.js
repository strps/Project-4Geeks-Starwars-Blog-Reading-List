const apiUrl = process.env.BACKEND_URL + "/api"

const getState = ({ getStore, getActions, setStore }) => {
	return {

		store: {
			Favorites: {
				characters:[],
				films:[],
				planets:[],
				species:[],
				starships:[],
				vehicles:[]
			}, 

		},

		actions: {

			loadTokens: () => {
				console.log("loadTokens")
				let accessToken = localStorage.getItem('accessToken')
				let refreshToken = localStorage.getItem('refreshToken')
				setStore({ refreshToken: refreshToken, accessToken: accessToken })
			},

			//get Collection Data
			getCollectionData: async (element, page = 1, limit = 5) => {

				let response = await fetch(apiUrl + `/${element}?page=${page}&limit=${limit}`)
				if (response.ok) {
					response = await response.json()
				} else {
					console.error("Something went wrong: " + response.statusText)
					return null
				}
				setStore({ Collection: response })
			},

			getHomeData: async () => {
				let response = await fetch(apiUrl)
				if (!response.ok) {
					console.log('there was an error:' + response.statusText)
					return (false)
				}
				let homeData = await response.json()
				setStore({ HomeData: homeData })
				return (true)

			},


			//Get data for each element
			getElementData: async (element, id) => {

				let response = await fetch(apiUrl + `/${element}/${id}`)
				if (response.ok) {
					response = await response.json()
				} else {
					console.error("Something went wrong: " + response.statusText)
					return null
				}
				setStore({ Element: response })
				return (response)
			},

			//Toogle from favorites
			toogleFav: (name, type, id) => {
				let str = getStore()
				if (str.Favorites.some((e) => e.type == type && e.id == id)) {
					str.Favorites = str.Favorites.filter((e) => !(e.type == type && e.id == id))
				} else {
					str.Favorites = [...str.Favorites, { name: name, type: type, id: id }]
				}
				setStore(str)
			},


			//Get favorites form back end
			getFavorites: async () => {
				console.log(getStore().accessToken)
				let response = await fetchProtected(`${apiUrl}/favorites`, {
				})

			},


			login: async (email, password) => {
				let resp = await fetch(apiUrl + '/login', {
					method: 'POST',
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({ email, password })
				})
				if (!resp.ok) {
					return resp.statusText
				}
				let data = await resp.json()
				setStore({ refreshToken: data.refreshToken, accessToken: data.accessToken })
				localStorage.setItem("accessToken", data.accessToken)
				localStorage.setItem("refreshToken", data.refreshToken)
				
				//load user favorites
				resp = await fetch(`${apiUrl}/favorites`, {
					headers: {
						"Authorization": 'Bearer ' + getStore().accessToken
					}
				})
				data = await resp.json()
				console.log(data)
				//setStore({Favorites : data})

				return true
			},

			signup: async (email, password) => {
				let response = await fetch(apiUrl + '/signup', {
					method: 'POST',
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({ email, password })
				})
				if (!response.ok) {
					console.error("There was a problem registering new user:" + response.statusText)
				}
				console.log("New user registered")

			},

			logout: async () => {
				let resp = await fetch(apiUrl + "/logout", {
					method: 'POST',
					headers: {
						"Authorization": 'Bearer ' + getStore().accessToken
					}
				})
				if (!resp.ok) {
					console.error('There was an error at closing session:' + resp.statusText)
					return false
				}
				localStorage.removeItem("accessToken")
				localStorage.removeItem("refreshToken")
				setStore({ refreshToken: null, accessToken: null })
				return true
			},

		}
	};

	async function fetchProtected (resource = '', options = {}) {
		console.log('fetching protected')
		const {headers, ...opt} = options
		let response = await fetch(resource = resource, options = {
			...opt,
			headers : {
				...headers,
				"Authorization": 'Bearer ' + getStore().accessToken
			}
		})
		if(!response.ok){
			const msg = (await response.json()).msg
			if(msg == "Token has expired"){
				console.log('refreshing token')
				response = await fetch(`${apiUrl}/refresh`,{
					headers : {
						"Authorization": 'Bearer ' + getStore().refreshToken
					}
				})
				if(!response.ok){
					return response.statusText
				}
				let data = await reponse.json()
				setStore({ refreshToken: data.refreshToken, accessToken: data.accessToken })
				localStorage.setItem("accessToken", data.accessToken)
				localStorage.setItem("refreshToken", data.refreshToken)
				fetchProtected(resource, options)
			}
		}
	
	}
};

export default getState;
