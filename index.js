

const addBtn = document.getElementById("add")
const closeBtn = document.getElementById("close")
const createBtn = document.getElementById("create")

const formBtns = document.querySelector(".formBtns")
const inputForm = document.querySelector(".input")

addBtn.onclick = _ => {
    addBtn.style.display = "none"
    formBtns.style.display = "flex"
    inputForm.style.display = "block"
    scrollTo(0, document.body.scrollHeight);
}

closeBtn.onclick = _ => {
    addBtn.style.display = "block"
    formBtns.style.display = "none"
    inputForm.style.display = "none"
}

createBtn.onclick = _ => {
  
    let input1 = document.getElementById("Title-Input").value 
    input1 = Boolean(input1)
    let input2 = document.getElementById("Description-Input").value 
    input2 = Boolean(input2)
    
    if (input1 != false && input2 != false) {
        initToDo()
        Swal.fire({
            title: 'do you want to continue',
            icon: 'question',
            iconHtml: '؟',
            confirmButtonText: "yes",
            cancelButtonText: 'no',
            showCancelButton: true,
            showCloseButton: true
          })
    }
    else{

    }
   
}


function initToDo() {

    addBtn.style.display = "block"
    formBtns.style.display = "none"
    inputForm.style.display = "none"

    const Post = {
        userId: parseInt(Math.random() * 10),
        title: document.getElementById("Title-Input").value,
        body: document.getElementById("Description-Input").value,
    };


    //  Fetch 
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(Post),
    })
        .then((res) => res.json())
        .then((data) => console.log(data))
        .catch((error) => {
            console.log('error', error);
        });

    
    let newToDos = `
                        <div class="items">
                            <div class="title">${Post.title}</div>
                            <div class="description">${Post.body}</div>
                        </div>
                        
                        `
    document.getElementById("output").innerHTML += newToDos;
    document.getElementById("Title-Input").value = ""
    document.getElementById("Description-Input").value = ""

}

function getToDos() {
    //  AJAX 
    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            let data = JSON.parse(xhr.response);
            let output = "";
            data.forEach(element => {
                output +=
                    `
                        <div class="items">
                            <div class="title">${element.title}</div>
                            <div class="description">${element.body}</div>
                        </div>
                        
                        `
            });
            document.getElementById("output").innerHTML = output;

         } else if (xhr.readyState === 4 && xhr.status !== 200) {
             throw Error('sth went wrong');
         }
    };

    xhr.open('GET', 'https://jsonplaceholder.typicode.com/posts');
    xhr.send();
};
getToDos()
