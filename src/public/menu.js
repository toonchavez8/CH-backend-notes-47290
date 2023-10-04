const mobileNavButton = document.getElementById("mobileNavButton");
const mobileNavMenu = document.getElementById("mobileNavMenu");
const mobileNavCloseButton = document.getElementById("mobileNavCloseButton");

mobileNavButton.addEventListener("click", () => {
	mobileNavMenu.classList.remove("hidden");
});

mobileNavCloseButton.addEventListener("click", () => {
	mobileNavMenu.classList.add("hidden");
});
