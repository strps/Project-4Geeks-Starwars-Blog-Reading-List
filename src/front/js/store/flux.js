const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			exampleFunction: () => {
				console.log("Doing Example Functions")
			},

			//Get data for each element or collection
			getData: async (element, id) => {
				
				let response = await fetch(`https://www.swapi.tech/api/${element}/${id?id:""}`)
				if (response.ok){
				response = await response.json()				
				response = response.result||response.results
				}else{
					console.error("Something went wrong: "+ response.statusText)
					return null
				}
				return(response)
			}


		}
	};
};

export default getState;
