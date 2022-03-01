const searchResult = document.getElementById('search-result');


function searchPhones() {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // clear searchfield
    if (searchField.value == '') {
        const div = document.createElement('div');
        div.classList.add('text-center');
        div.innerHTML = `
        <h2 class = "text-danger">please give a name of the food you want!~ </h2>
        `;
        searchResult.appendChild(div);
    }
    else {
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
        // console.log(url);
        fetch(url)
            .then(res => res.json())
            .then(data => console.log(data.data))
    }
};



// document.getElementById('search-button').addEventListener('click', getPhones()) ;