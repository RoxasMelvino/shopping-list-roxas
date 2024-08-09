const addItemButton = document.querySelector('#addItemButton');
const items = document.querySelector('#items');
const form = document.querySelector('form');
const clearButton = document.querySelector('#clearButton');

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const item = document.querySelector('#inputItem').value;
    addItem(item);
});


function addItem(item) {
    const newItem = document.createElement('li');
    const text = document.createTextNode(item);
    const addIcon = document.createElement('i');
    addIcon.className = "fa-solid fa-xmark";

    newItem.appendChild(text);
    newItem.appendChild(addIcon);
    items.appendChild(newItem);
};



// function removeItemChild(itemNumber) {
//     const li = document.querySelectorAll('#items li')
//     console.log(li[itemNumber], "index: " + itemNumber);
//     li[itemNumber].remove();
// }







// drag and drop feature

