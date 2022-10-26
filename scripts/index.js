 async function getRecipes() {
const response = await fetch('../recettes.json');
const recettes = await response.json();
console.log(recettes)
return (recettes)
}

async function init() {
    const { recettes } = await getRecipes();
    displayData(recettes)
 }

 function displayData(data) {
    console.log("🚀 ~ file: index.js ~ line 14 ~ displayData ~ data", data)
    const recettesSection = document.getElementById('recettes-section');

    data.forEach((recettes) => {
        
        const recettesModel = recettesFactory(recettes);
    })
 }

 init();