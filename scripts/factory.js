function recettesFactory(data) {
    const { name, ingredients, time, description, id } = data;

    function createRecipe() {
        console.log(time)
        const article = document.createElement('article');
        article.classList.add('recipe');

        const a = document.createElement('a');
        a.textContent = name;

        const li = document.createElement('li');
        ingredients.forEach((x) => {
            const ul = document.createElement('ul');
            ul.textContent = x.ingredient + ': ' +  x.quantity;
            li.appendChild(ul)
        })

        const timeText = document.createElement('a');
        timeText.textContent = time;

        const descriptionText = document.createElement('p');
        descriptionText.textContent = description

        article.appendChild(a);
        article.appendChild(li);
        article.appendChild(timeText);
        article.appendChild(descriptionText);


        return (article)
    }
    return { name, ingredients, time, description, id, createRecipe }
}