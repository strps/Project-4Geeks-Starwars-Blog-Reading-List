const apiUrl = process.env.BACKEND_URL + "/api"

const getState = ({ getStore, getActions, setStore }) => {
	return {

		store: {
			favorites: {
				characters: [],
				films: [],
				planets: [],
				species: [],
				starships: [],
				vehicles: []
			},

		},

		actions: {

			loadTokens: () => {
				console.log("loading tokens")
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
			toogleFav: async (type, id) => {
				const response = await fetchProtected(`${apiUrl}/favorites`,
					{
						method: 'POST',
						headers: {
							"Authorization": 'Bearer ' + getStore().accessToken,
							"Content-Type": "application/json"
						},
						body: JSON.stringify({ type, id })
					})
				const data = await response.json()
				setStore({ favorites: data })
			},


			//Get favorites form back end
			getFavorites: async () => {
				let response = await fetchProtected(`${apiUrl}/favorites`)
				const data = await response.json()
				setStore({ favorites: data })

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
				setStore({ refreshToken: data.refresh_token, accessToken: data.access_token })
				localStorage.setItem("accessToken", data.access_token)
				localStorage.setItem("refreshToken", data.refresh_token)

				getActions().getFavorites()

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
					console.error("There was a problem registering new user, status:" + response.status)
					return ((response.status == 409) ?
						'This email already exist, please try another one.'
						:response.status == 400?
						'You must fill all the fields'
						:
						'There was an error registering, please try again later.')
				}

				return('ok')

			},

			logout: async () => {
				let resp = await fetchProtected(apiUrl + "/logout", {
					method: 'GET',
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

	async function fetchProtected(resource = '', options = {}) {
		console.log('fetching protected')
		console.log(getStore.accessToken)
		const { headers, ...opt } = options
		let response = await fetch(resource = resource, options = {
			...opt,
			headers: {
				...headers,
				"Authorization": 'Bearer ' + getStore().accessToken
			}
		})
		if (!response.ok) {
			const msg = (await response.json()).msg
			if (msg == "Token has expired") {
				console.log('refreshing token')
				response = await fetch(`${apiUrl}/refresh`, {
					headers: {
						"Authorization": 'Bearer ' + getStore().refreshToken
					}
				})
				if (!response.ok) {
					return response.statusText
				}
				let data = await response.json()
				setStore({ refreshToken: data.refresh_token, accessToken: data.access_token })
				localStorage.setItem("accessToken", data.access_token)
				localStorage.setItem("refreshToken", data.refresh_token)
				fetchProtected(resource, options)
			}
		} else {
			return response
		}
	}
};

export default getState;
