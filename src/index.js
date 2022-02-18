let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  // My Code ///////////////////////////////////////////////////////

  function initialize(){
    getToys()
  }
  
  function getToys(){
    fetch('http://localhost:3000/toys')
      .then(response => response.json())
      .then(toyData => toyData.forEach(toy => renderToy(toy)))
  }
  
  function renderToy(toy){
    let card = document.createElement('li')
    card.className = 'card'
    card.innerHTML = `
    <h2>${toy.name}</h2>
    <img src="${toy.image}" class="toy-avatar" />
    <p>${toy.likes}</p>
    <button class="like-btn" id="${toy.id}">Like ❤️</button>
    `
    document.querySelector('#toy_collection').appendChild(card)

    card.querySelector('.like-btn').addEventListener('click', () => {
      toy.likes+= 1
      card.querySelector('p').textContent = toy.likes
      updateLikes(toy)
    })
    
  }
  
  initialize()

  const form = document.querySelector('.add_toy_form')

  form.addEventListener('submit', postToy)

  function postToy(e){
    e.preventDefault()
    let toyObj = {
      name:e.target.name.value,
      image:e.target.image.value,
      "likes": 0
    }
    renderToy(toyObj)
    addNewToy(toyObj)
  }

  function addNewToy(toyObj){
    fetch('http://localhost:3000/toys',{
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body:JSON.stringify(toyObj)
  })
  .then(response => response.json())
  .then(toy => console.log(toy)) 
  }
  
  function updateLikes(toy){
    fetch(`http://localhost:3000/toys/${toy.id}`,{
      method:'PATCH',
      headers:{
        'Content-Type': 'application/json'
      },
      body:JSON.stringify(toy)
    })
    .then(res => res.json())
    .then(toy => console.log(toy))
  }

});
