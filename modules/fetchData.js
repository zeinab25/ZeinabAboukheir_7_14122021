//Request data from Json file

export async function fetchRecipes() {
	try {
		const response = await fetch("./recipes.json");
		if (!response.ok) {
			throw new Error(`Erreur HTTP ! statut : ${response.status}`);
		}
		return await response.json();
	} catch (error) {
		console.log(error);
	}
}
