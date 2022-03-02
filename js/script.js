const searchResult = document.getElementById('search-result');
const details = document.getElementById('details');
details.style.display = "none";
const showBtn = document.getElementById('show');
showBtn.style.display = "none";
let found = document.getElementById('found');

function searchPhones() {
    details.textContent = '';
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // clear searchfield
    if (searchField.value == '') {
        const div = document.createElement('div');
        div.classList.add('text-center');
        div.innerHTML = `
        <h2 class = "text-danger">please give a name of the product you want!~ </h2>
        `;
        searchResult.appendChild(div);
    }
    else {
            searchResult.textContent = '';
            const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
            // console.log(url);
            fetch(url)
                .then(res => res.json())
                .then(data => checkKeyWord(data))
            
        const checkKeyWord = data => {
            if (data.status == false) {
                const div = document.createElement('div');
                div.classList.add('text-center');
                div.innerHTML = `
                <h2 class = "text-danger">Sorry, Your product was not found</h2>
                `;
                searchResult.appendChild(div);
            }
            else {
                displayPhones(data.data);
            }
        }
        
        }
    }
    const displayPhones = phones => {
        let length = phones.length;
        found.innerText = length;
        // console.log(length);

        if (length > 20) {
            showBtn.style.display = "block";
            const slicedphones = phones.slice(0, 20);
            slicedphones.forEach(phone => {
                // console.log(phone);
                const div = document.createElement('div');
                div.classList.add('card-mine');
                div.innerHTML = `
                <div class="text-center">
                    <img class="w-50 h-auto mb-3" src="${phone.image}">
                    <p><strong>Phone Brand: </strong> ${phone.brand}</p>
                    <p><strong>Phone name: </strong> ${phone.phone_name}</p>
                    <a onclick="displayDetails('${phone.slug}')" class="btn btn-primary text-white text-decoration-none border-0" href="#details">details</a>
                </div>
            `;

                // for gapping purposes.... sorry
                const parentDiv = document.createElement('div');
                parentDiv.classList.add('col-lg-4')
                parentDiv.classList.add('p-3')
                parentDiv.appendChild(div);
                searchResult.appendChild(parentDiv);
            })
            showBtn.addEventListener('click', function () {
                showBtn.style.display = "none";
                const slicedphones = phones.slice(0);
                slicedphones.forEach(phone => {
                    // console.log(phone);
                    const div = document.createElement('div');
                    div.classList.add('card-mine');
                    div.innerHTML = `
                <div class="text-center">
                    <img class="w-50 h-auto mb-3" src="${phone.image}">
                    <p><strong>Phone Brand: </strong> ${phone.brand}</p>
                    <p><strong>Phone name: </strong> ${phone.phone_name}</p>
                    <a onclick="displayDetails('${phone.slug}')" class="btn btn-primary text-white text-decoration-none border-0" href="#details">details</a>
                </div>
            `;

                    // for gapping purposes.... sorry
                    const parentDiv = document.createElement('div');
                    parentDiv.classList.add('col-lg-4')
                    parentDiv.classList.add('p-3')
                    parentDiv.appendChild(div);
                    searchResult.appendChild(parentDiv);
                })
            })
        }
        else {
            showBtn.style.display = "none";
            phones.forEach(phone => {
                // console.log(phone);
                const div = document.createElement('div');
                div.classList.add('card-mine');
                div.innerHTML = `
                <div class="text-center">
                    <img class="w-50 h-auto mb-3" src="${phone.image}">
                    <p><strong>Phone Brand: </strong> ${phone.brand}</p>
                    <p><strong>Phone name: </strong> ${phone.phone_name}</p>
                    <a onclick="displayDetails('${phone.slug}')" class="btn btn-primary text-white text-decoration-none border-0" href="#details">details</a>
                </div>
            `;

                // for gapping purposes.... sorry
                const parentDiv = document.createElement('div');
                parentDiv.classList.add('col-lg-4')
                parentDiv.classList.add('p-3')
                parentDiv.appendChild(div);
                searchResult.appendChild(parentDiv);
            })
        }

    }

    const displayDetails = id => {
        const url = `https://openapi.programming-hero.com/api/phone/${id}`;
        fetch(url)
            .then(res => res.json())
            .then(data => showDetail(data.data));

        const showDetail = detail => {
            details.textContent = '';

            // console.log(detail.others);
            const div = document.createElement('div');
            div.classList.add('text-center');
            div.classList.add('p-5');
            if (detail.others == undefined) {
                div.innerHTML = `
            <div class="row p-5 align-items-center card-mine">
                <div class="col-lg-6 col-sm-12">
                    <img class="w-75 h-auto" src="${detail.image}" alt="">
                    <h5 class="text-myColor mt-4"><strong>Name: </strong>${detail.name}</h5>
                    <h5 class="text-myColor"><strong>Release Date: </strong>${detail.releaseDate}</h5>
                </div>
                <div class="col-lg-6 col-sm-12">
                    <h4 class="fw-bold mt-5">Details</h4>
                    <hr>
                    <p><strong>Storage: </strong>${detail.mainFeatures.storage}</p>
                    <p><strong>display size: </strong>${detail.mainFeatures.displaySize}</p>
                    <p><strong>Memory size: </strong>${detail.mainFeatures.memory}</p>
                    <p><strong>Chipset: </strong>${detail.mainFeatures.chipSet}</p>
                    <p class="break-line"><strong>Sensors Availabale: </strong>${detail.mainFeatures.sensors}</p>
                    <p class="text-center"><strong>Others:</strong> Not Provided</p>
                    `;
            }
            else {
                div.innerHTML = `
            <div class="row p-5 align-items-center card-mine">
                <div class="col-lg-6 col-sm-12">
                    <img class="w-75 h-auto" src="${detail.image}" alt="">
                    <h5 class="text-myColor mt-4"><strong>Name: </strong>${detail.name}</h5>
                    <h5 class="text-myColor"><strong>Release Date: </strong>${detail.releaseDate}</h5>
                </div>
                <div class="col-lg-6 col-sm-12">
                    <h4 class="fw-bold mt-5">Details</h4>
                    <hr>
                    <p><strong>Storage: </strong>${detail.mainFeatures.storage}</p>
                    <p><strong>display size: </strong>${detail.mainFeatures.displaySize}</p>
                    <p><strong>Memory size: </strong>${detail.mainFeatures.memory}</p>
                    <p><strong>Chipset: </strong>${detail.mainFeatures.chipSet}</p>
                    <p class="break-line"><strong>Sensors Availabale: </strong>${detail.mainFeatures.sensors}</p>
                        <p class="text-center"><strong>Others:</strong></p>
                        <p><strong>Bluetooth: </strong>${detail.others.Bluetooth}</p>
                        <p><strong>GPS: </strong>${detail.others.GPS}</p>
                        <p><strong>NFC: </strong>${detail.others.NFC}</p>
                        <p><strong>Radio: </strong>${detail.others.Radio}</p>
                        <p><strong>USB: </strong>${detail.others.USB}</p>
                        <p><strong>WLAN: </strong>${detail.others.WLAN}</p>
                    </div>
                </div>
        `;
            }

            details.style.display = "block";
            details.appendChild(div);

        }

    }



