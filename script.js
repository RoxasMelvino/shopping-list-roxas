const addItemButton = document.querySelector('#addItemButton');
const items = document.querySelector('ul#items');
const form = document.querySelector('form');
const clearButton = document.querySelector('#clearButton');

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const item = document.querySelector('#inputItem').value;
    addItem(item);
});

clearButton.addEventListener('click', clearAll)


function addItem(item) {
    const newItem = document.createElement('li');
    const text = document.createTextNode(item);
    const addIcon = document.createElement('i');
    addIcon.className = "fa-solid fa-xmark";

    newItem.appendChild(text);
    newItem.appendChild(addIcon);
    items.appendChild(newItem);
};

function clearAll() {
    const li = document.querySelectorAll('li');
    if (li.length > 0) {
        li.forEach((item) => item.remove());
    } else {
        alert('List is empty.');
    }
}



// function removeItemChild(itemNumber) {
//     const li = document.querySelectorAll('#items li')
//     console.log(li[itemNumber], "index: " + itemNumber);
//     li[itemNumber].remove();
// }







// drag and drop feature

