function deleteList(element){  
    const id = element.getAttribute('list-id')
    axios.delete('/list/?_id=' + String(id)).then((res) => {
        element.parentElement.remove()
    })
}
function showForm(){
    const form = document.querySelector('.right-side')
    form.style.display = 'block';

    const hide = document.querySelector('.middle')
    hide.style.display = 'none'

    // const addButton = document.getElementById('add-button');
    // const container = document.getElementById('container');

    // addButton.onclick = (e) => {
    //     container.classList.toggle('no-todos');
    //     // classList.add(), .remove(), .contains()
    // }
}



