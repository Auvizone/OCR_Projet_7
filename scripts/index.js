// ? Demander si reuse display data est la meilleure facon

let ingredientList = [];
let appareilList = []
let ustensilsList = [];

async function getRecipes() {
  const response = await fetch("../recettes.json");
  const recettes = await response.json();
  return recettes;
}

function displayData(data) {
  ingredientList = [];
  const recettesSection = document.getElementById("recettes-section");
  recettesSection.innerHTML = "";
  data.forEach((recettes) => {
    addIngredients(recettes.ingredients);
    addAppareils(recettes.appliance)
    addUstensils(recettes.ustensils)
    const recettesModel = recettesFactory(recettes);
    const userDOM = recettesModel.createRecipe();
    recettesSection.appendChild(userDOM);
  });
}

function addIngredients(data) {

  data.forEach((ingredient) => {
    if (!ingredientList.includes(ingredient.ingredient)) {
      ingredientList.push(ingredient.ingredient);
    } else {
      return;
    }
  });
}

function addAppareils(data) {

  if(!appareilList.includes(data)) {
    appareilList.push(data)
    console.log("🚀 ~ file: index.js ~ line 40 ~ addAppareils ~ appareilList", appareilList)
  } else {
    return;
  }
}

function addUstensils(data) {

  data.forEach((ustensil) => {
    if(!ustensilsList.includes(ustensil)) {
      ustensilsList.push(ustensil);
    } else {
      return;
    }
  })
}



async function init() {
  const recettes = await getRecipes();
  displayData(recettes);
  searchInput();
}

function searchInput() {
  const searchBar = document.getElementById("recipe-search");
  searchBar.addEventListener("input", filterSearch);
}

async function filterSearch() {
  const recettes = await getRecipes();

  if (this.value == "") {
    console.log(" ca passe ici");
    displayData(recettes);
  }
  if (this.value.length < 2) {
    return;
  }
  if (this.value.length > 2) {
    const valueLowerCase = this.value.toLowerCase();
    filteredRecipes = recettes.filter(
      (x) =>
        x.name.toLowerCase().includes(valueLowerCase) ||
        x.description.toLowerCase().includes(valueLowerCase)
    );
    displayData(filteredRecipes);
  }
}

init();
