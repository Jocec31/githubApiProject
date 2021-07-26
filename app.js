// ----------------------------------
// VARIABLES
// ----------------------------------
const form = document.querySelector('form');
const inputSearch = document.getElementById('search');
const userCard = document.querySelector('.display-user');

const error = document.querySelector('.error');

const userAvatarURL = document.querySelector('.avatar');
const userName = document.querySelector('.display-user h2');
const userCardUl = document.querySelector('.display-user ul');
const userFollowers = document.querySelector('ul li:first-child');
const userRepositories = document.querySelector('ul li:nth-child(2)');
const userBio = document.querySelector('ul li:nth-child(3)');
const userRepoLi =  document.querySelector('ul li:last-child');

// ----------------------------------
// FONCTIONS
// ----------------------------------

// 1 - ANIMATION DE L'INPUT SEARCH
inputSearch.addEventListener('input', (e) => {
    if(e.target.value !== ''){
        inputSearch.parentNode.classList.add('active-input');
    }else{
        inputSearch.parentNode.classList.remove('active-input');
    }
});

// 2 - RECUPERER LA VALEUR INPUT
function inputValue(){
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = inputSearch.value;
        console.log(name);
        // REQUETE avec la valeur de l'input
        requestFetch(name);
    });
}
// 3 - REQUETE
function requestFetch(inpValue){
    let request = `https://api.github.com/users/${inpValue}`;
    fetch(request)
    .then(response => response.json())
    .then((user) => {
        console.log(user);
        displayUser(user)
    })
    .catch(error => console.log(error))
};

// 4 - AFFICHAGE DES DONNNEES
function displayUser(user){
    // console.log(user);

    // si le pseudo est inconnu
    if(user.message == "Not Found"){
        userCard.style.display = "none";
        error.innerText = "Aucun pseudo GITHUB correspondant à votre recherche";
        error.style.display = "inline";
        setTimeout(() => {
            error.style.display = "none";
            inputSearch.value = "";
        }, 2000);
        return;
    }

    // remplissage de la card
    if(user.avatar_url !== undefined){
        userAvatarURL.setAttribute('src', `${user.avatar_url}`);
    }else{
        userAvatarURL.setAttribute('src', './lapin.jpg');
    }

    userName.innerText = `${user.login}`;
    userFollowers.innerText = `Suivi par ${user.followers} followers`;
    userRepositories.innerText = `Nombre de repositories : ${user.public_repos}`;
    if(user.bio !== null){
        userBio.innerText = `Bio : ${user.bio}`;
    }else{
        userBio.innerText = "Aucune bio pour ce GITHUB USER";
    }
    userRepoLi.innerText = "ReposURL : ";
    const a = document.createElement('a');
    a.setAttribute('href', `${user.repos_url}`);
    a.innerText = `${user.repos_url}`;
    userRepoLi.appendChild(a);
    userCard.style.display = "block";
    inputSearch.value = "";
}

// 5 - RESET DE L'AFFICHAGE
function resetDisplay(){
    document.addEventListener('click', ()=>{
        inputSearch.parentNode.classList.remove('active-input');
        userCard.style.display = "none";
    });
}

// ------------------------------------------
// MAIN
// ------------------------------------------
inputValue();
resetDisplay();