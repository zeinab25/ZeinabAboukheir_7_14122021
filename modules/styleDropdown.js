// stylising dropdown
function styleDropdown() {
	const dropdowns = document.querySelectorAll(".accordion");

	dropdowns.forEach((dropdown) => {
		const buttonDropdown = dropdown.querySelector(".accordion-button");
		const listDropdown = dropdown.querySelector(".accordion-collapse");
		const listcontainer = dropdown.querySelector(".accordion-collapse ul");
		const searchField = dropdown.querySelector("input");
		let placeholder = searchField.placeholder;

		buttonDropdown.addEventListener("click", function () {
			if (buttonDropdown.getAttribute("aria-expanded") === "true") {
				searchField.focus();
			} else {
				dropdown.style.minWidth = "200px";
				searchField.value = "";
				searchField.placeholder = placeholder;
				searchField.classList.remove("focus");
			}
		});

		searchField.addEventListener("focus", () => {
			buttonDropdown.setAttribute("aria-expanded", "true");
			listDropdown.classList.add("show");

			buttonDropdown.classList.remove("collapsed");

			searchField.placeholder = `Rechercher un ${placeholder}`;
			searchField.classList.add("focus");

			if (
				buttonDropdown.getAttribute("aria-expanded") === "true" &&
				window.screen.width >= 640
			) {
				dropdown.style.minWidth = "550px";
			} else {
				dropdown.style.minWidth = "200px";
			}
		});

		document.addEventListener("click", (e) => {
			if (
				buttonDropdown.getAttribute("aria-expanded") === "true" &&
				e.target != searchField &&
				e.target != buttonDropdown &&
				e.target != listcontainer
			) {
				buttonDropdown.setAttribute("aria-expanded", "false");

				buttonDropdown.classList.add("collapsed");
				listDropdown.classList.remove("show");
				dropdown.style.minWidth = "200px";
				searchField.value = "";
				searchField.placeholder = placeholder;
				searchField.classList.remove("focus");
			}
		});
	});
}

styleDropdown();
