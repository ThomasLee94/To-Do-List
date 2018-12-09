// Save List
let resetButton = document.getElementById("reset-button");
let submitButton = document.getElementById("submit-button");
let checkButton = document.querySelectorAll("input[type=checkbox]");
let inputLabel = document.querySelectorAll(".list")

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
        window.location.reload();
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

checkButton.forEach(el => el.addEventListener("click", function(event) {
     // Update
     axios.put(`/toggled_check/${this.getAttribute("mongoid")}/${this.getAttribute("ix")}`, (req, res) => {
        List.findByIdAndUpdate(req.params, req.body)
            .then((list) => {
                window.location.reload();
            }).catch((err) => {
                console.log(err)
            })
    })
}))


function updateInput(event) {
    // Update
    axios({
        method: "PUT",
        url: `/list/${this.getAttribute("mongoid")}/${this.getAttribute("ix")}`,
        data: {newValue: this.value}
    },(req, res) => {
        List.findByIdAndUpdate(req.params, req.body)
            .then((list) => {
                window.location.reload();
            }).catch((err) => {
                console.log(err)
            })
    })

}

inputLabel.forEach(el => el.addEventListener("change", updateInput))
inputLabel.forEach(el => el.addEventListener("keyUp", function(event){
    if (event.keyCode == 13){
        updateInput.call(this)
    }
}))



