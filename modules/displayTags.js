import { filterByTags, filterBySearch } from "./filterRecipes.js";
import { displayListDropdown } from "./displayListDropdown.js";
import { keyupEventDropdown } from "./keyupEventDropdown.js";
import { displayRecipes } from "./displayRecipes.js";

// for each dropdown, display tags when click on a list word
function displayTag(tags, recipes) {
	const eltsDropdowns = document.querySelectorAll(".accordion-body ul li");
	const containerstags = document.querySelectorAll(".tags");

	eltsDropdowns.forEach((elt) => {
		elt.addEventListener("click", (e) => {
			const tagValue = e.target.textContent;

			if (
				!tags.some(
					(obj) =>
						Object.values(obj).includes(tagValue) &&
						Object.values(obj).includes(elt.parentNode.id),
				)
			) {
				tags.push({
					value: tagValue,
					type: elt.parentNode.id,
				});

				const tag = document.createElement("li");
				tag.innerHTML = `${tagValue}<button type="button" class="close" aria-label="Close"><i
			    class="far fa-times-circle"></i></button>`;
				containerstags.forEach((containertags) => {
					if (containertags.classList.contains(elt.parentNode.id)) {
						containertags.appendChild(tag);
					}
				});

				let filterRecipes = filterByTags(
					tags,
					filterBySearch(recipes, document.getElementById("search-field").value),
				);
				displayRecipes(filterRecipes);
				displayListDropdown(filterRecipes);
				displayTag(tags, recipes);
				keyupEventDropdown();
			}
		});
	});
}

// remove tag when close
function removeTag(tags, recipes) {
	const containerstags = document.querySelectorAll(".tags");
	containerstags.forEach((containertags) => {
		containertags.addEventListener("click", (e) => {
			const closeTagsBtns = containertags.querySelectorAll(".close i");

			closeTagsBtns.forEach((closeBtn) => {
				const tag = closeBtn.parentNode.parentNode;

				if (e.target == closeBtn) {
					tag.remove();

					tags.forEach((obj) => {
						if (
							Object.is(obj.value, tag.textContent) &&
							containertags.classList.contains(obj.type)
						) {
							tags.splice(tags.indexOf(obj), 1);
						}
					});
					let filterRecipes = filterByTags(
						tags,
						filterBySearch(recipes, document.getElementById("search-field").value),
					);
					displayRecipes(filterRecipes);
					displayListDropdown(filterRecipes);
					displayTag(tags, recipes);
					keyupEventDropdown();
				}
			});
		});
	});
}

export { displayTag, removeTag };
