// Save List
let resetButton = document.getElementById("reset-button");
let submitButton = document.getElementById("submit-button");

submitButton.addEventListener('click', function (event) {
    event.preventDefault();
    console.log('prove it works');

    let list = {
    title: document.getElementById("list-title").value,
    body: document.getElementById("list-body").value,
    date: Date.now(),
    listId: document.getElementById("listId").value
    
}
    console.log(new FormData(document.getElementById('list')))
    console.log(document.getElementById('list'))
    axios.post('/lists', list).then(function (response) {
        // change the visibility of the buttons in the callback
        let list = ` 
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">${response.data.title}</h5>
                <h6 class="card-subtitle mb-2 text-muted">${response.data.date}</h6>
                <p class="card-text">${response.data.body}</p>
                <a href="#" class="btn btn-danger" onclick="deleteList(this)" list-id='${response.data._id }'>Delete</a>
                <a href="/lists/${response.data._id}/edit" class="btn btn-light" >Edit</a>
            </div>
        </div>
        `
        let e = document.createElement('div');
        e.innerHTML = list;
        document.getElementById('lists').append(e)
        console.log(response)
    });
});

// Delete List
function deleteList(element){  
    const id = element.getAttribute('list-id')
    axios.delete('/list/?_id=' + String(id))
        .then((res) => {
            element.parentElement.remove()
            console.log(element.parentElement)
    }).catch(e => {
        console.log(e)
    })
}

// // Save List
// function saveList(element){
//     const id = element.getAttribute('list-id')
//     axios.post('/list/?_id=' + String(id))
//         .then((res) => {
//             element.
//     })
// }

// // Show form used to hide 
// function showForm(){
//     const form = document.querySelector('.right-side')
//     form.style.display = 'block';

//     const hide = document.querySelector('.middle')
//     hide.style.display = 'none'

// }



