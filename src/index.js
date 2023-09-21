let addToy = false;
const toyUrl = 'http://localhost:3000/toys'


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
  fetch(toyUrl)
    .then((resp) => resp.json())
    .then(toys => {
        for (const key of toys) {
        renderToyCard(key)
    }})


  // const likeBtns = document.getElementsByClassName('like-btn')
  // console.log(likeBtns)
  // debugger
  // for (const btn of likeBtns) {
  //   console.log("in the forof")
  //   btn.addEventListener('click', () => {
  //     console.log(btn)
  //   })
  // }

});



document.querySelector('.submit').addEventListener('click', (e) => {
  e.preventDefault();
  const toyName = document.getElementsByName('name')
  const toyImage = document.getElementsByName('image')
  addNewToyDB(toyName[0].value, toyImage[0].value)
})


function renderToyCard(toyObj){
  const div = document.createElement('div')
  const html = `
    <h2>${toyObj.name}</h2>
    <img src="${toyObj.image}" class="toy-avatar" />
    <p class=${toyObj.name.charAt(0)}${toyObj.id}Likes >${toyObj.likes} Likes</p>
    <button class="like-btn" id="${toyObj.id}">Like ❤️</button>`
  div.className = 'card'
  div.innerHTML = html
  if (document.getElementById(toyObj.id)){
    document.querySelector(`.${toyObj.name.charAt(0)}${toyObj.id}Likes`).textContent = `${toyObj.likes} Likes`
  }else{
    document.getElementById('toy-collection').appendChild(div)
  }

  document.getElementById(toyObj.id).addEventListener('click', () => {
    likeButton(toyObj)
  })

}

function addNewToyDB(toyName, imageUrl) {
  const toyBody = {
      "name": toyName,
      "image": imageUrl,
      "likes": 0
  }
  
  fetch(toyUrl, {
    method: 'POST',
    headers: {
      'Content-Type' : 'application/json'
    },
    body:JSON.stringify(toyBody)
  })
  .then(res => res.json())
  .then(toy => renderToyCard(toy))
}

function likeButton(likedToy){
  newLikeNum = likedToy.likes + 1
  fetch(`http://localhost:3000/toys/${likedToy.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type' : 'application/json'
    },
    body:JSON.stringify({
      "likes": newLikeNum
    })
  })
  .then(res => res.json())
  .then(toy => renderToyCard(toy))
}
