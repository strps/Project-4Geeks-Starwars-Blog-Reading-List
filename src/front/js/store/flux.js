const apiUrl = process.env.BACKEND_URL+"/api"

const getState = ({ getStore, getActions, setStore }) => {
	return {

		store: {
			Favorites: [],
			// Element: {},
			// Collection: {},
			// HomeData:[]
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

			getHomeData : async ()=>{
				let response = await fetch(apiUrl)
				if(!response.ok){
					console.log('there was an error:' + response.statusText)
					return (false)
				}
				let homeData = await response.json()
				setStore({HomeData : homeData})
				return (true)

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
				setStore({Element: response})
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

			login: async (email, password) => {
				const resp = await fetch(apiUrl + '/login', {
					method: 'POST',
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({ email, password })
				})
				if (!resp.ok) {
					return resp.statusText
				}
				const data = await resp.json()
				setStore({ refreshToken: data.refreshToken, accessToken: data.accessToken })
				localStorage.setItem("accessToken", data.accessToken)
				localStorage.setItem("refreshToken", data.refreshToken)
				return true
			},

			signup: async (email, password)=>{
				let response = await fetch(apiUrl+'/signup',{
					method: 'POST',
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({ email, password })
				})
				if(!response.ok){
					console.error("There was a problem registering new user:"+ response.statusText)
				}
				console.log("New user registered")

			},

			logout : async()=>{
				let resp = await fetch(apiUrl+"/logout", {
					method : 'POST',
					headers : {
						...getActions().getAuthHeader()
					}
				})
				if(!resp.ok){
					console.error('There was an error at closing session:'+resp.statusText)
					return false
				}
				localStorage.removeItem("accessToken")
				localStorage.removeItem("refreshToken")
				setStore({ refreshToken: null, accessToken: null })
				return true
			},

		}
	};
};


export default getState;
