// forms
const addItemButton = document.querySelector('#addItemButton');
const form = document.querySelector('form');
const filterInput = document.querySelector('#input-filterItems')

// Elements
const items = document.querySelector('ul#items');
const clearButton = document.querySelector('#clearButton');
const cartShopping = document.querySelector('.fa-cart-shopping')
const container = document.querySelector('.container');
const icons = document.querySelectorAll('.fa-xmark');

// functions ---
function addItem(item) {
    const newItem = document.createElement('li');
    const text = document.createTextNode(item);
    const addIcon = document.createElement('i');
    addIcon.className = "fa-solid fa-xmark";

    // add a delete function to the x icons.
    addIcon.addEventListener('click', (event) => {
        removeItem(event.target);
    });

    newItem.appendChild(text);
    newItem.appendChild(addIcon);
    items.appendChild(newItem);


};

function clearAll() {
    // const li = document.querySelectorAll('li');
    // if (li.length > 0) {
    //     li.forEach((item) => item.remove());
    // } else {
    //     alert('List is empty.');
    // }
    const currentListItems = document.querySelector('ul#items')
    if (currentListItems.children.length === 0) {
        alert('List is empty!')
    } else {
        while(currentListItems.firstChild && currentListItems.children.length > 0) {
            currentListItems.removeChild(currentListItems.firstChild)
        }
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

function removeItem(item) {
    item.parentElement.remove()
};

function filterList(e) {
    const items = document.querySelectorAll("#items li")
    items.forEach((item) => {
        console.log(item.innerText);
    })
    console.log(e.key);
}

// Event listeners ---
form.addEventListener('submit', (event) => {
    event.preventDefault();

    const item = document.querySelector('#inputItem').value;
    addItem(item);
});

clearButton.addEventListener('click', clearAll)
cartShopping.addEventListener('dblclick', doubleClick);
filterInput.addEventListener('keypress', filterList)

/* 
TODO --
 - Filter the items by typing in the filter field
 - Add local storage to persist items
 - Click on an item to put into "edit mode" and add to form
 - update item
 -deply to netlify
*/