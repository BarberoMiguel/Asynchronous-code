//RESUELVE TUS EJERCICIOS AQUI

//Dog API 
//1 - Declara una funcion getAllBreeds que devuelva todas las razas de perro.

function getAllBreeds() {
    return fetch("https://dog.ceo/api/breeds/list/all")
        .then(res => res.json())
        .then(breeds => Object.keys(breeds.message));
};


//2

function getRandomDog() {
    return fetch("https://dog.ceo/api/breeds/image/random")
        .then(res => res.json())
        .then(image => image.message);
}


//3 getAllImagesByBreed

function getAllImagesByBreed() {
    return fetch("https://dog.ceo/api/breed/komondor/images")
        .then(res => res.json())
        .then(image => image.message);
}


//4
function getAllImagesByBreed2(raza) {
    return fetch(`https://dog.ceo/api/breed/${raza}/images`)
        .then(res => res.json())
        .then(image => image.message);
}

//GitHub API
//5

function getGitHubUserProfile(username) {
    return fetch(`https://api.github.com/users/${username}`)
        .then(res => res.json());
}


//6 
function printGithubUserProfile(username) {
        return fetch(`https://api.github.com/users/${username}`)
            .then(res => res.json())
            .then(usuario => {
                let imagen = document.createElement("img");
                let nombre = document.createElement("h1");
                imagen.src = usuario.avatar_url;
                nombre.innerHTML = usuario.name;
                document.querySelector("body").appendChild(imagen);
                document.querySelector("body").appendChild(nombre);
                return { img: {src: usuario.avatar_url}, name: usuario.name }
            });
};

//7
function getAndPrintGitHubUserProfile(username) {
    return fetch(`https://api.github.com/users/${username}`)
            .then(res => res.json())
            .then(usuario => {
                return `<section>
                                        <img src="${usuario.avatar_url}" alt="${usuario.name}">
                                        <h1>${usuario.name}</h1>
                                        <p>Public repos: ${usuario.public_repos}</p>
                                    </section>`;
            });
}

//8
document.addEventListener("DOMContentLoaded", function() {
    let buscador = document.createElement("form");
    buscador.id = "buscador";
    buscador.innerHTML = `<label for="nombre">Write the name you want to search</label>
                            <input type="text" id="nombre" name="nombre"placeholder="Name"><br>
                            <button type="submit">Submit</button>`;
    document.querySelector("body").appendChild(buscador);
    document.getElementById("buscador").addEventListener("submit", function(event) {
        event.preventDefault();
        let user = event.target.nombre.value;
        let info = getAndPrintGitHubUserProfile(user);
        let article = document.createElement("article");
        info.then(resultado => article.innerHTML = resultado);
        document.querySelector("body").appendChild(article);
    });
});

//9
function fetchGithubUsers(userNames) {
    let usuarios = userNames.map(user => fetch(`https://api.github.com/users/${user}`)
                                                        .then(res => res.json())
                                                        .then(usuario => {
                                                            let repo = usuario.html_url;
                                                            let nombre = usuario.name;
                                                            return {name: nombre, html_url: repo};
                                                        }));
    return Promise.all(usuarios).then(users => {
        for (let i = 0; i < users.length; i++) {
            let section = document.createElement("section")
            section.innerHTML = `<h1>Name: ${users[i].name}</h1>
                                <p>Repo: ${users[i].html_url}</p>`;
            document.querySelector("body").appendChild(section);
        }
        return users;
    });                                                        
}
