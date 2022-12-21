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

			//Get data for each element
			getData: async (element, elementId) => {
				let response = await fetch(`https://www.swapi.tech/api/people/1`)
				if (response.ok){
				response = await response.json()				
				response = response.result||response.results
				console.log(response)
				}else{
					console.error("Something went wrong: "+ response.statusText)
				}
			}


		}
	};
};

export default getState;
