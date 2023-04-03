let quote = document.querySelector("#quote");
let author = document.querySelector("#author");

setInterval(getRandomCitation, 5000)

function getRandomCitation() {
    fetch('http://localhost:1337/api/citations/?populate=*')
        .then(res => res.json())
        .then(data => {


            const randomQuote = data.meta.pagination.total - 1;

            const random = (max, min) => {
                return Math.floor(Math.random() * (max - min + 1) - min)
            }
            let getRandom = random(randomQuote, 0)

            quote.innerHTML = data.data[getRandom].attributes.citation
            author.innerHTML = "-" + data.data[getRandom].attributes.auteur.data.attributes.auteur

        })
}

getRandomCitation();