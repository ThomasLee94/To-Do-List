function deleteList(element){  
    const id = element.getAttribute('list-id')
    axios.delete('/list/?_id=' + String(id)).then((res) => {
        element.parentElement.remove()
    })
}

