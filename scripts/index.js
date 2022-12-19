// ? Demander si reuse display data est la meilleure facon

let ingredientList = [];
let appareilList = []
let ustensilsList = [];
let shownRecipes;

async function getRecipes() {
  const response = await fetch("../recettes.json");
  const recettes = await response.json();
  return recettes;
}

function emptyLists() {
  ingredientList = [];
  appareilList = [''];
  ustensilsList = [''];
}

async function displayData(data) {
  emptyLists();
  console.log('addIngredients before', ingredientList)
  shownRecipes = data;
  console.log("🚀 ~ file: index.js:16 ~ displayData ~ shownRecipes", shownRecipes)
  const recettesSection = document.getElementById("recettes-section");
  recettesSection.innerHTML = "";
  shownRecipes.forEach((recettes) => {
    addIngredients(recettes.ingredients);
    addAppareils(recettes.appliance)
    addUstensils(recettes.ustensils)
    const recettesModel = recettesFactory(recettes);
    const userDOM = recettesModel.createRecipe();
    recettesSection.appendChild(userDOM);
  });
  console.log('addIngredients after', ingredientList)
  fillSelectIngredients();
  fillSelectAppareils();
  fillSelectUstensiles();
}

function fillSelectIngredients() {
  const selectIngredients = document.getElementById('Ingredients');
  selectIngredients.options.length = 0;
  for(x in ingredientList) {
    selectIngredients.options[selectIngredients.options.length] = new Option(ingredientList[x], x)
  }
}

function fillSelectAppareils() {
  const selectAppareils = document.getElementById('Appareils');
  selectAppareils.options.length = 0;
  for(x in appareilList) {
    selectAppareils.options[selectAppareils.options.length] = new Option(appareilList[x], x)
  }
}

function fillSelectUstensiles() {
  const selectUstensiles = document.getElementById('Ustensiles');
  selectUstensiles.options.length = 0;
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
  console.log('init', ingredientList)
  const recettes = await getRecipes();
  displayData(recettes);
  searchInput();
  initEventListeners();
}

function initEventListeners() {
  const selectIngredients = document.getElementById('Ingredients');
  selectIngredients.addEventListener('change', getIngredientTag)

  const selectAppareils = document.getElementById('Appareils');
  selectAppareils.addEventListener('change', getAppareilsTag)

  const selectUstensiles = document.getElementById('Ustensiles');
  selectUstensiles.addEventListener('change', getUstensilsTag)

}

async function getIngredientTag() {
  const recettes = await getRecipes();
  const selectIngredients = document.getElementById('Ingredients');
  let selectedIngredient = selectIngredients.options[selectIngredients.selectedIndex].text;
  console.log(selectedIngredient)
  console.log(recettes)
}

function getAppareilsTag() {
  const selectAppareils = document.getElementById('Appareils');
  console.log(selectAppareils.options[selectAppareils.selectedIndex].text)
}

function getUstensilsTag() {
  const selectUstensils = document.getElementById('Ustensiles');
  console.log(selectUstensils.options[selectUstensils.selectedIndex].text)
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
    let filteredRecipes = recettes.filter((x) => 
    x.name.toLowerCase().includes(valueLowerCase) || x.description.toLowerCase().includes(valueLowerCase)
    );
    displayData(filteredRecipes);
  }
}

init();