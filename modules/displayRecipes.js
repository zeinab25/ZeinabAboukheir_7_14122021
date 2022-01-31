// display recipes
export function displayRecipes(recipes) {
	const containerRecipes = document.querySelector(".recipes");
	containerRecipes.innerHTML = "";
	recipes.forEach((obj) => {
		const recipe = document.createElement("div");
		recipe.setAttribute("class", "card mb-5 me-2 p-0");
		recipe.setAttribute("style", "max-width: 400px; min-width: 240px;");
		recipe.innerHTML = `<div class="card-img-top"></div>
            <div class="card-body">
                <div class="card-text">
                    <div class="row pb-2">
                        <div class="col-8">
                            <h2 class="title">${obj.name}</h2>
                        </div>
                        <div class="col-4 d-flex text-align-center justify-content-end ">
                            <div>
                                <img src="./assets/watch.png" aria-hidden="true" style="height: 22px;">
                            </div>
                            <span class="time">${obj.time}</span>
                        </div>
                    </div>
                    <div class="row lh-1 pb-2">
                        <div class="col-5 pe-0">
                            <ul class="ingredientsRecipe ps-0">${obj.ingredients
								.map(
									(ingredient) =>
										`<li><span class="fw-bold">${
											ingredient.ingredient
										}:</span> ${ingredient.quantity || ""} ${
											ingredient.unit || ""
										}</li>`
								)
								.join(" ")}
                            </ul>
                        </div>
                        <div class="instruction col-7 ps-4 "><p>${obj.description}</p>
                        </div>
                </div>
            </div>
        </div>`;
		containerRecipes.appendChild(recipe);
	});
}
