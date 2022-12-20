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
        timeText.textContent = time;
        timeText.classList.add('recipe-time')

        divTitleTime.appendChild(title);
        divTitleTime.appendChild(timeText)

        const li = document.createElement('li');
        ingredients.forEach((x) => {
            const ul = document.createElement('ul');
            ul.textContent = x.ingredient + ': ' +  x.quantity;
            li.appendChild(ul)
        })

        const descriptionText = document.createElement('p');
        descriptionText.textContent = description

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
