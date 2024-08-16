// form elements
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
function displayItems() {
    const itemsFromStorage = getItemsFromStorage();
    itemsFromStorage.forEach(item => addItemToDOM(item));
    updateUI()
}


function addItemToDOM(item) {
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
}

function addItemToStorage(item) {
    const itemsFromStorage = getItemsFromStorage();

    itemsFromStorage.push(item);

    localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

function addItemSubmit(item) {
    // create the elements
    addItemToDOM(item);
    addItemToStorage(item);
    updateUI();
};

function getItemsFromStorage() {
    let itemsFromStorage;

    if (localStorage.getItem('items') === null) {
        itemsFromStorage = [];
    } else {
        itemsFromStorage = JSON.parse(localStorage.getItem('items'));
    }

    return itemsFromStorage;
}

function clearAll() {
    const currentListItems = document.querySelector('ul#items')
    if (currentListItems.children.length === 0) {
        alert('List is empty!')
    } else {
        while(currentListItems.firstChild && currentListItems.children.length > 0) {
            currentListItems.removeChild(currentListItems.firstChild)
        }
        updateUI();
    }

};

function doubleClickDarkMode() {
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
    updateUI();
};





function filterItems(e) {
    const text = e.target.value.toLowerCase();
    const items = document.querySelectorAll('#items li')
    
    items.forEach((item) => {
        const itemName = item.firstChild.textContent.toLowerCase();
        
        if (itemName.indexOf(text) != -1) {
            item.style.display = "flex"
        } else {
            item.style.display = "none"
        }
    })
}

function updateUI () {
    const items = document.querySelectorAll('#items li');
    if (items.length === 0) {
        filterInput.style.display = "none";
        clearButton.style.display = "none";
    } else {
        filterInput.style.display = "inline";
        clearButton.style.display = "inline";
    }
}

// Event listeners ---
form.addEventListener('submit', (event) => {
    event.preventDefault();

    const item = document.querySelector('#inputItem').value;
    addItemSubmit(item);
});

clearButton.addEventListener('click', clearAll)
cartShopping.addEventListener('dblclick', doubleClickDarkMode);
filterInput.addEventListener('input', filterItems)
document.addEventListener('DOMContentLoaded', displayItems)
updateUI()



/* 
TODO --
 - Add local storage to persist items
 - Click on an item to put into "edit mode" and add to form
 - update item
 -deply to netlify
*/
