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
        searchResult.textContent = '';
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
        // console.log(url);
        fetch(url)
            .then(res => res.json())
            .then(data => displayPhones(data.data))
    }
}

const displayPhones = phones => {
    // console.log(phones);

    phones.forEach(phone => {
        console.log(phone);
        const div = document.createElement('div');
        // div.classList.add('');
        div.classList.add('radius-9');
        div.classList.add('text-dark');
        div.classList.add('shadow-lg');
        div.classList.add('p-4');
        div.innerHTML = `
            <div class="text-center">
                <img class="w-50 h-auto mb-3" src="${phone.image}">
                <p><strong>Phone Brand: </strong> ${phone.brand}</p>
                <p><strong>Phone name: </strong> ${phone.phone_name}</p>
                <button class="btn btn-primary">Details</button>
            </div>
        
        `;

        const parentDiv = document.createElement('div');
        parentDiv.classList.add('col-md-4')
        parentDiv.classList.add('p-4')
        parentDiv.appendChild(div);
        searchResult.appendChild(parentDiv);
    })
}

