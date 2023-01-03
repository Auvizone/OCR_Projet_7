// ? Demander si reuse display data est la meilleure facon

let ingredientList = [];
let appareilList = []
let ustensilsList = [];
let shownRecipes = [];
let selectedTags = [];

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
  shownRecipes = data;
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

async function getIngredientTag(data) {
    console.log("🚀 ~ file: index.js:113 ~ getIngredientTag ~ data", data)
    const selectIngredients = document.getElementById('Ingredients');
    let selectedIngredient;
    if(data.name) {
      const recettes = await getRecipes();
      shownRecipes = recettes;
      selectedIngredient = data.name;
      let filtered = shownRecipes.filter(recipe => recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase() === selectedIngredient.toLowerCase()))
      shownRecipes = filtered;
    } 
    else if(!data.name) {
      selectedIngredient = selectIngredients.options[selectIngredients.selectedIndex].text;
      addTag(selectedIngredient, 'blueTag', 'ingredient')
      let filtered = shownRecipes.filter(recipe => recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase() === selectedIngredient.toLowerCase()))
      shownRecipes = filtered;
    }
    displayData(shownRecipes)
}

function getAppareilsTag(data) {
  const selectAppareils = document.getElementById('Appareils');
  let selectedAppliance = selectAppareils.options[selectAppareils.selectedIndex].text;
  let filtered = shownRecipes.filter(recipe => recipe.appliance.toLowerCase() === selectedAppliance.toLowerCase())
  shownRecipes = filtered;
  displayData(shownRecipes)
  addTag(selectedAppliance, 'greenTag', 'appliance')
}

function getUstensilsTag(data) {
  const selectUstensils = document.getElementById('Ustensiles');
  let selectedUstensil = selectUstensils.options[selectUstensils.selectedIndex].text;
  let filtered = shownRecipes.filter(recipe => recipe.ustensils.some(ustensil => ustensil.toLowerCase() === selectedUstensil.toLowerCase()))
  shownRecipes = filtered;
  displayData(shownRecipes)
  addTag(selectedUstensil, 'redTag', 'ustensil')
}

async function addTag(name, color, type) {
  const tagSection = document.getElementById('tags');
  let tagData = [];
  tagData.name = name;
  tagData.color = color;
  tagData.type = type;
  selectedTags.push(tagData);
  const tagModel = tagFactory(tagData);
  const userDOM = tagModel.createTag();
  tagSection.appendChild(userDOM)
  console.log(selectedTags)
}

async function removeTag(data) {
  selectedTags.splice(selectedTags.indexOf(data.name), 1)
  console.log("🚀 ~ file: index.js:161 ~ removeTag ~ data", selectedTags)
  if(selectedTags.length == 0) {
    const recettes = await getRecipes();
    displayData(recettes)
  }
  selectedTags.forEach(x => {
    if(x.type == 'ingredient') {
      getIngredientTag(x)
    }
    if(x.type == 'appliance') {
      getAppareilsTag(x)
    }
    if(x.type == 'ustensil') {
      getUstensilsTag(x)
    }
  })
}

function searchInput() {
  const searchBar = document.getElementById("recipe-search");
  searchBar.addEventListener("input", filterSearch);
}

async function filterSearch() {
  const recettes = await getRecipes();
  if (this.value == "") {
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