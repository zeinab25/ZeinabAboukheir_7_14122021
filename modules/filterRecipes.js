import { displayRecipes } from "./displayRecipes.js";

// filter the recipes according to the search in the main search field
function filterBySearch(recipes, inputValue) {
	let filterBySearch = [];
	if (inputValue.trim().length >= 3) {
		filterBySearch = recipes.filter((recipe) => {
			if (
				inputValue
					.split(" ")
					.every(
						(value) =>
							recipe.name.toLowerCase().includes(value) ||
							recipe.description.toLowerCase().includes(value) ||
							recipe.ingredients.some((ingredient) =>
								ingredient.ingredient.toLowerCase().includes(value),
							),
					)
			) {
				return recipe;
			}
		});
	} else {
		filterBySearch = recipes;
	}

	return filterBySearch;
}

//  filter recipes according to the tags displayed
function filterByTags(tags, recipes) {
	let filterByTags = recipes.filter((recipe) =>
		tags.every(
			(tag) =>
				(recipe.appliance.toLowerCase() == tag.value && tag.type == "appliance") ||
				recipe.ingredients.some(
					(ingredient) =>
						ingredient.ingredient.toLowerCase() == tag.value &&
						tag.type == "ingredients",
				) ||
				(recipe.ustensils.includes(tag.value) && tag.type == "ustensils"),
		),
	);
	return filterByTags;
}

//  display search result
function filterResult(recipe) {
	const containerRecipes = document.querySelector(".recipes");
	if (recipe.length > 0) {
		displayRecipes(recipe);
	} else {
		containerRecipes.innerHTML = "";
		const mgsError = document.createElement("p");
		mgsError.classList.add("msg-erreur");
		mgsError.innerHTML =
			"&laquo;Aucune recette ne correspond à vos critères de recherche&raquo;";
		containerRecipes.appendChild(mgsError);
	}
}

export { filterBySearch, filterByTags, filterResult };
