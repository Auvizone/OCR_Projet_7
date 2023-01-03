function recettesFactory(data) {
    const { name, ingredients, time, description, id } = data;

    function createRecipe() {
        const article = document.createElement('article');
        article.classList.add('recipe');

        const img = document.createElement('img');
        img.classList.add('recipe-img');

        const divTitleTime = document.createElement('div')
        divTitleTime.classList.add('divTitleTime')

        const title = document.createElement('a');
        title.textContent = name;
        title.classList.add('recipe-title')

        const timeText = document.createElement('a');
        timeText.innerHTML = `<i class="fa-regular fa-clock"></i> ${time} min`;
        timeText.classList.add('recipe-time')

        divTitleTime.appendChild(title);
        divTitleTime.appendChild(timeText)

        const li = document.createElement('li');
        ingredients.forEach((x) => {
            if (!x.unit) {
                x.unit = '';
            }
            if (!x.quantity) {
                x.quantity = '';
            }
            const ul = document.createElement('ul');
            ul.textContent = x.ingredient + ': ' +  x.quantity + ' ' + x.unit;
            li.appendChild(ul)
        })
        li.classList.add('ingredientList')

        const descriptionText = document.createElement('p');
        descriptionText.textContent = description
        descriptionText.classList.add('recipeDescription')

        const divIngredientsDescription = document.createElement('div');
        divIngredientsDescription.classList.add('divIngredientsDescription')
        divIngredientsDescription.appendChild(li)
        divIngredientsDescription.appendChild(descriptionText)

        article.appendChild(img)
        article.appendChild(divTitleTime);
        article.appendChild(divIngredientsDescription)

        return (article)
    }
    return { name, ingredients, time, description, id, createRecipe }
}
