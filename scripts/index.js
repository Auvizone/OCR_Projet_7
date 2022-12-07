 async function getRecipes() {
const response = await fetch('../recettes.json');
const recettes = await response.json();
return (recettes)
}

 function displayData(data) {
    const recettesSection = document.getElementById('recettes-section');
    data.forEach((recettes) => {
        
        const recettesModel = recettesFactory(recettes);
        const userDOM = recettesModel.createRecipe();
        recettesSection.appendChild(userDOM);
    })
 }

 async function init() {
    const recettes = await getRecipes();
    displayData(recettes)
    searchInput()
 }

 function searchInput() {
   const searchBar = document.getElementById('recipe-search')
   searchBar.addEventListener('input', filterSearch)
 }

 function filterSearch() {
    if (this.value.length < 2 ) {
       return;
      } if (this.value.length > 2 ) {
        filterMeals(this.value)
      }
    }
    
    async function filterMeals(value) {
      let mealsArray = [];
      let x = 0;
      const recettes = await getRecipes();
      console.log(recettes)
      while ( x < recettes.length) {
        let name = recettes[x].name.toLowerCase();
        console.log("🚀 ~ file: index.js:43 ~ filterMeals ~ name", name)
        let description = recettes[x].description.toLowerCase();
        if (name.includes(value) || description.includes(value)) {
          mealsArray.push(recettes[x])
        }
        x++;
      }
      console.log(mealsArray)
 }

 init();