import { fetchRecipes } from "./modules/fetchData.js";
import { displayRecipes } from "./modules/displayRecipes.js";
import { displayListDropdown } from "./modules/displayListDropdown.js";
import { keyupEventDropdown } from "./modules/keyupEventDropdown.js";
import { displayTag, removeTag } from "./modules/displayTags.js";
import { filterBySearch, filterByTags, filterResult } from "./modules/filterRecipes.js";
import "./modules/styleDropdown.js";

// fetch data and display
(async function () {
	const data = await fetchRecipes();
	const recipes = data.recipes;

	// display recipes in the main
	displayRecipes(recipes);

	// display dropdown list
	displayListDropdown(recipes);

	// filter dropdown list when searching on fields search avanced
	keyupEventDropdown();

	// // display tags selected in dropdown
	// // initialization of array with selected tags
	let tags = [];

	displayTag(tags, recipes);
	removeTag(tags, recipes);

	// filter recipe
	const searchField = document.getElementById("search-field");
	searchField.addEventListener("keyup", (e) => {
		let filterRecipes = filterBySearch(
			filterByTags(tags, recipes),
			e.target.value.toLowerCase(),
		);
		filterResult(filterRecipes);
		displayListDropdown(filterRecipes);
		displayTag(tags, recipes);
		keyupEventDropdown();
	});
})();
