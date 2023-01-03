function tagFactory(data) {
    const { name, color } = data;
    function createTag() {
        const div = document.createElement('div')
        div.classList.add('tag', color);

        const p = document.createElement('p');
        p.textContent = name;
        div.classList.add('tagText')

        const cross = document.createElement('p');
        cross.innerHTML = '<i class="fa-regular fa-circle-xmark"></i>'
        cross.classList.add('closeTag')
        cross.addEventListener('click', function() {
            div.parentNode.removeChild(div);
            removeTag(data);
        })

        div.appendChild(p)
        div.appendChild(cross)

        return div;
    }

    return {name, color, createTag}
}