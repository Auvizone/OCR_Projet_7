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
  fillSelectIngredients();
  fillSelectAppareils();
  fillSelectUstensiles();
}

function fillSelectIngredients() {
  const selectIngredients = document.getElementById('Ingredients');
  for(x in ingredientList) {
    selectIngredients.options[selectIngredients.options.length] = new Option(ingredientList[x], x)
  }
}

function fillSelectAppareils() {
  const selectAppareils = document.getElementById('Appareils');
  for(x in appareilList) {
    selectAppareils.options[selectAppareils.options.length] = new Option(appareilList[x], x)
  }
}

function fillSelectUstensiles() {
  const selectUstensiles = document.getElementById('Ustensiles');
  for(x in ustensilsList) {
    selectUstensiles.options[selectUstensiles.options.length] = new Option(ustensilsList[x], x)
  }
}

function addIngredients(data) {
  data.forEach((ingredient) => {
    let lowerCaseIngredient = ingredient.ingredient.toLowerCase()
    if (!ingredientList.includes(lowerCaseIngredient)) {
      ingredientList.push(lowerCaseIngredient);
    } else {
      return;
    }
  });
}

function addAppareils(data) {
  let lowerCaseAppareil = data.toLowerCase();
  
  if(!appareilList.includes(lowerCaseAppareil)) {
    appareilList.push(lowerCaseAppareil)
  } else {
    return;
  }
}

function addUstensils(data) {
  data.forEach((ustensil) => {
    let lowerCaseUstensil = ustensil.toLowerCase();
    if(!ustensilsList.includes(lowerCaseUstensil)) {
      ustensilsList.push(lowerCaseUstensil);
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
