//for each of the advanced search fields, as the search progresses, the words in the list are updated
function keyupEventDropdown() {
	const searchFields = document.querySelectorAll(".accordion-item");

	searchFields.forEach((searchField) => {
		const input = searchField.querySelector("input");
		const eltsList = searchField.querySelectorAll("li");

		eltsList.forEach((eltList) => {
			input.addEventListener("keyup", (e) => {
				let inputValue = e.target.value;
				if (eltList.textContent.includes(inputValue)) {
					eltList.style.display = "block";
				} else {
					eltList.style.display = "none";
				}
			});

			input.addEventListener("focus", () => {
				eltList.style.display = "block";
			});
		});
	});
}

export { keyupEventDropdown };
