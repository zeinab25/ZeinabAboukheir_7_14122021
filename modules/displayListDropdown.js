// display list of word for each dropdown
function displayListDropdown(recipes) {
	let listDropdowns = [];
	// push in the array all the tags  with their categories
	recipes.forEach((recipe) => {
		recipe.ingredients.forEach((ingredient) => {
			listDropdowns.push({
				value: ingredient.ingredient.toLowerCase(),
				type: "ingredients",
			});
		});

		listDropdowns.push({ value: recipe.appliance.toLowerCase(), type: "appliance" });

		recipe.ustensils.forEach((ustensil) => {
			listDropdowns.push({ value: ustensil.toLowerCase(), type: "ustensils" });
		});
	});

	//remove repeating values and sort the array
	listDropdowns = Array.from(new Set(listDropdowns.map(JSON.stringify))).map(JSON.parse);
	listDropdowns.sort((a, b) => {
		return a.value.localeCompare(b.value);
	});

	// display each of the tags in the corresponding dropdown
	const dropdowns = document.querySelectorAll(".accordion-item");
	dropdowns.forEach((dropdown) => {
		const listContainer = dropdown.querySelector("ul");
		listContainer.innerHTML = "";
		listDropdowns.forEach((item) => {
			if (listContainer.id == item.type) {
				const elementList = document.createElement("li");
				elementList.innerHTML = `${item.value}`;
				listContainer.appendChild(elementList);
			}
		});
	});
}

export { displayListDropdown };
