let quote = document.querySelector(".quote");
let author = document.querySelector(".author");


const bntSubmit = document.querySelector('#submit');
const authorValue = document.querySelector('#authorValue');
const quoteValue = document.querySelector('#citation');

const page2 = document.getElementById('page2')
const quoteContent = document.getElementById('quoteContent')


function post() {
    console.log(authorValue.value, quoteValue.value);

    valueAuthor = authorValue.value;
    valueQuote = quoteValue.value;

    const value2 = {
        "data": {
            "auteur": valueAuthor,
        }
    };
    var newId;

    fetch("http://localhost:1337/api/auteurs", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(value2)
    }).then(response => response.json())
        .then(data => {
            console.log(data);
            newId = data.data.id;

            const value3 = {
                "data": {
                    "citation": valueQuote,
                    "auteur": [newId],
                }
            }
            fetch("http://localhost:1337/api/citations/?populate=*", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(value3)
            }).then(response => response.json())
                .then(data => {

                    alert('Citation ajoutée à la collection')
                })
        })

};

bntSubmit.addEventListener('click', post);




function getRandomCitation() {

    fetch('http://localhost:1337/api/citations/?populate=*')
        .then(res => res.json())
        .then(data => {

            const randomQuote = data.meta.pagination.total - 1;

            setInterval(intervalQuote, 5000)

            function intervalQuote() {
                const random = (max, min) => {
                    return Math.floor(Math.random() * (max - min + 1) - min)
                }
                let getRandom = random(randomQuote, 0)

                quote.innerHTML = data.data[getRandom].attributes.citation
                author.innerHTML = "-" + data.data[getRandom].attributes.auteur.data.attributes.auteur + "-";

            }
            intervalQuote();


            data.data.forEach(element => {
                console.log(element);

                const div = document.createElement('div');
                const title = document.createElement('h2');
                const small = document.createElement('small');
                div.classList.add('head-content');
                title.classList.add('quote');
                small.classList.add('author');

                title.innerHTML = element.attributes.citation;
                small.innerHTML = "-" + element.attributes.auteur.data.attributes.auteur + "-";


                div.append(title, small)
                quoteContent.append(div)
            });

        })
}

getRandomCitation();