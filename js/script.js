const accessKey = "AwZ8JTU73ayVwNSVbDpFB8UNc3dVc60SyyQCzCkxiFQ";

const formEl = document.querySelector('form');

const inputEl = document.getElementById('search-input');

const searchResults = document.querySelector('.search-results');

const showMore = document.getElementById('show-more-button');

let inputData = "";

let page = 1;

async function searchImages() {

    inputData = inputEl.value;

    const response = await fetch(`https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`);

    const data = await response.json();

    const result = data.results;

    if (page === 1) {
        searchResults.innerHTML = "";
    }

    result.map((results) => {
        const imagWrapper = document.createElement('div');
        
        imagWrapper.classList.add('search-result');
        
        const image = document.createElement('img');
        
        image.src = results.urls.small;
        
        image.alt = results.alt_description;
        
        const imageLink = document.createElement('a');
        
        imageLink.href = results.links.html;
        
        imageLink.target = '_blank';
        
        imageLink.textContent = results.alt_description;
        
        imagWrapper.appendChild(image);
        
        imagWrapper.appendChild(imageLink);
        
        searchResults.appendChild(imagWrapper);

    })

    page++

    if (page > 1) {
        showMore.style.display = "block";
    }
}

formEl.addEventListener('submit', (event) => {
    event.preventDefault();
    page = 1;
    searchImages();

})

showMore.addEventListener('click', () => {
    searchImages();
})

