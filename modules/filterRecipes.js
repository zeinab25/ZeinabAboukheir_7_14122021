import { displayRecipes } from "./displayRecipes.js";

// filter the recipes according to the search in the main search field
function filterBySearch(recipes, inputValue) {
	let filterBySearch = [];

	function valueInclude(property, value) {
		let propertyLength = property.length;
		let valueLength = value.length;

		if (property === value) return true;

		if (value[0] === undefined) {
			return true;
		}

		let i = 0;
		next_char: while (valueLength < propertyLength - i) {
			if (value[0] == property[i]) {
				let j = 1;
				while (j < valueLength) {
					if (value[j] !== property[i + j]) {
						i++;
						continue next_char;
					}
					j++;
				}
				return true;
			}
			i++;
		}
	}

	function valueInIngredients(ingredients, value) {
		for (let k = 0; k < ingredients.length; k++) {
			if (valueInclude(ingredients[k].ingredient.toLowerCase(), value)) return true;
		}
	}

	if (inputValue.trim().length >= 3) {
		let value = inputValue.split(" ");
		next_recipe: for (let i = 0; i < recipes.length; i++) {
			let j = 0;
			while (j < value.length) {
				if (
					!(
						valueInclude(recipes[i].name.toLowerCase(), value[j]) ||
						valueInclude(recipes[i].description.toLowerCase(), value[j]) ||
						valueInIngredients(recipes[i].ingredients, value[j])
					)
				) {
					continue next_recipe;
				}
				j++;
			}
			filterBySearch.push(recipes[i]);
		}
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
