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
         console.log(this.value)
   }
 }

 init();