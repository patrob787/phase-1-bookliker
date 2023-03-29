let ul = document.getElementById('list');
let showPanel = document.getElementById('show-panel');
let bookList = []
let userList = []
let user1;
let liked = false;


document.addEventListener("DOMContentLoaded", function() {
    fetch("http://localhost:3000/books")
    .then(resp => resp.json())
    .then(data => {
        renderBooks(data);
        bookList = data;
    });

    fetch("http://localhost:3000/users")
    .then(resp => resp.json())
    .then((data) => {
        userList = data;
        console.log(userList)
        user1 = userList[0];
        console.log(user1)
    });
});

function renderBooks(bookArray) {
    bookArray.forEach((book) => {
        let li = document.createElement('li');
        li.classList.add('book-title')
        li.textContent = book.title
        
        li.addEventListener('click', (e) => {
            renderBookDetails(book);
        })

        ul.appendChild(li);
    })
}

function renderBookDetails (book) {
    showPanel.innerHTML = ""
    
    let h1 = document.createElement('h1');
    let img = document.createElement('img');
    let p = document.createElement('p');
    let likeBtn = document.createElement('button');
    let label = document.createElement('label');
    let ul = document.createElement('ul');
    
    book.users.forEach((user) => {
        let li = document.createElement('li');
        li.textContent = user.username
        ul.appendChild(li);
    })

    h1.textContent = book.title;
    img.src = book.img_url;
    p.textContent = book.description;
    //likeBtn.textContent = 'LIKE'
    label.textContent = "Users Liked:"

    // let users = book.users
    // console.log(users)

    // if (users.includes(user1)) {
    //     console.log(true)
    // } else {
    //     console.log(false)
    // }

    if (liked) {
       likeBtn.textContent = 'UNLIKE'
    } else {
        likeBtn.textContent = 'LIKE'
    };

    likeBtn.addEventListener('click', (e) => {
        liked = !liked
        let likedArray = book.users;
        console.log(likedArray)
    
        likedArray.push(user1);
        
        fetch(`http://localhost:3000/books/${book.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({likedArray})
        })
        .then(resp => resp.json())
        .then(data => console.log(data))

        renderBookDetails(book);
        
    })

    showPanel.append(h1, img, likeBtn, p, label, ul)

}
