const APIURL = 'https://api.github.com/users/';


const main = document.getElementById("main")
const form = document.getElementById("form")
const search = document.getElementById("search")

getUser("Mohamed1Adel")

async function getUser(username){
    const resp = await fetch(APIURL + username);
    const responseData = await resp.json();
console.log(responseData);
    createUserCard(responseData)

    getRepos(username)

}

async function getRepos(username){
    const resp = await fetch(APIURL + username + '/repos');
    const responseData = await resp.json();



    addReposTCard(responseData)
}



function createUserCard(user) {

   const cardHTML = `
    <div class="card">
    <div class="img-container">
    <img class="avatar" src="${user.avatar_url}" alt="${user.name}"/>

    </div>
    <div class="user-info">
    <h2>${user.name}</h2>
    <p>${user.bio}</p>

    <ul class="info">
    <li> ${user.followers}<strong> Followers</strong></li>
    <li>${user.following}<strong> Following</strong> </li>
    <li>${user.public_repos}<strong> Repos</strong></li>
    </ul>


    <div class="repos" id="repos">

    </div>

    </div>
    </div>
    `;

    getRepos(user)

    main.innerHTML = cardHTML
}

function addReposTCard(repos){
    const reposEl = document.getElementById("repos");
    console.log(repos);
    repos.forEach((repo)=>{
        const repoEl = document.createElement("a");
        repoEl.classList.add("repo");

        repoEl.href = repo.html_url;
        repoEl.target = "_blank";
        repoEl.innerText = repo.name;

        reposEl.appendChild(repoEl)
    });
}

form.addEventListener("submit",(e)=>{
    e.preventDefault()

    const user = search.value
    if(user){
        getUser(user)
        search.value = ''
    }
})