const addItemButton = document.querySelector('#addItemButton');
const items = document.querySelector('ul#items');
const form = document.querySelector('form');
const clearButton = document.querySelector('#clearButton');
const cartShopping = document.querySelector('.fa-cart-shopping')
const container = document.querySelector('.container');

// functions ---
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
};

function doubleClick() {
    if (document.body.style.backgroundColor !== "#0F141A") {
        document.body.style.backgroundColor = "#0F141A";
        document.body.style.color = "#fff";
        container.style.border = "1px solid #fff";
    } else {
        document.body.style.backgroundColor = "#fff";
        document.body.style.color = "#000";
        container.style.border = "none";
    }
};

function dragAndDrop() {
    console.log("work in progress");
}; 

function removeItem(itemNumber) {
    const li = document.querySelectorAll('#items li')
    console.log(li[itemNumber], "index: " + itemNumber);
    li[itemNumber].remove();
}


// Event listeners ---
form.addEventListener('submit', (event) => {
    event.preventDefault();

    const item = document.querySelector('#inputItem').value;
    addItem(item);
});

clearButton.addEventListener('click', clearAll)
cartShopping.addEventListener('dblclick', doubleClick);











