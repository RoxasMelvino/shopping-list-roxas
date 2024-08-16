// form elements
const addItemButton = document.querySelector('#addItemButton');
const form = document.querySelector('form');
const filterInput = document.querySelector('#input-filterItems');
const inputItem = document.querySelector('#inputItem');

// Elements
const items = document.querySelector('ul#items');
const clearButton = document.querySelector('#clearButton');
const formButton = document.querySelector('#addItemButton');
const cartShopping = document.querySelector('.fa-cart-shopping');
const container = document.querySelector('.container');
const icons = document.querySelectorAll('.fa-xmark');
let isEditMode = false;

// functions ---
function displayItems() {
    const itemsFromStorage = getItemsFromStorage();
    itemsFromStorage.forEach(item => addItemToDOM(item));
    updateUI();
};

function addItemToDOM(item) {
    const newItem = document.createElement('li');
    const text = document.createTextNode(item);
    const deleteIcon = document.createElement('i');
    const editIcon = document.createElement('i');
    
    editIcon.className = "fa-solid fa-pen-to-square";
    deleteIcon.className = "fa-solid fa-xmark";

    newItem.appendChild(text);
    newItem.appendChild(deleteIcon);
    newItem.appendChild(editIcon);
    items.appendChild(newItem);
};

function addItemToStorage(item) {
    const itemsFromStorage = getItemsFromStorage();

    itemsFromStorage.push(item);
    localStorage.setItem('items', JSON.stringify(itemsFromStorage));
};

function addItemSubmit(item) {
    // check if edit mode is true
    if (isEditMode) {
        const itemToEdit = items.querySelector('.edit-mode');
        removeItemFromStorage(itemToEdit.textContent);
        itemToEdit.classList.remove('edit-mode');
        itemToEdit.remove()
    } else {
        if (checkForDuplicates(item)) {
            alert('This item already exists!');
            return;
        }
    }

    checkForDuplicates(item);
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
};

function clearAll() {
    const currentListItems = document.querySelector('ul#items');

    if (currentListItems.children.length === 0) {
        alert('List is empty!');
    } else {
        while(currentListItems.firstChild && currentListItems.children.length > 0) {
            currentListItems.removeChild(currentListItems.firstChild);
        }
        localStorage.removeItem('items');
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
    };
};

function onClickItem(e) {
    // add event listeners to those with the fa-xmark class
    if (e.target.classList.contains('fa-xmark')) {
        removeItem(e.target.parentElement);
    } else if (e.target.classList.contains('fa-pen-to-square')) {
        setItemToEdit(e.target.parentElement);
    };
};

function setItemToEdit(item) {
    isEditMode = true;
    
    items.querySelectorAll('li').forEach(i => i.classList.remove('edit-mode'));

    item.classList.add('edit-mode');
    formButton.innerHTML = "<i class='fa-solid fa-pen'></i> Save Changes";
    formButton.style.backgroundColor = "#63E6BE";
    inputItem.value = item.textContent;
};

function removeItem(item) {
    item.remove(); // from the dom

    removeItemFromStorage(item.textContent); // from localStorage

    updateUI();
};

function removeItemFromStorage(item) {
    let itemsFromStorage = getItemsFromStorage();

    itemsFromStorage = itemsFromStorage.filter((i) => i !== item);

    localStorage.setItem('items', JSON.stringify(itemsFromStorage));
};

function filterItems(e) {
    const text = e.target.value.toLowerCase();
    const items = document.querySelectorAll('#items li');
    
    items.forEach((item) => {
        const itemName = item.firstChild.textContent.toLowerCase();
        
        if (itemName.indexOf(text) != -1) {
            item.style.display = "flex";
        } else {
            item.style.display = "none";
        }
    });
};

function checkForDuplicates(item) {
    const itemsFromStorage = getItemsFromStorage();
    return itemsFromStorage.includes(item) ;
};

function updateUI () {
    inputItem.value = '';
    
    const items = document.querySelectorAll('#items li');
    
    if (items.length === 0) {
        filterInput.style.display = "none";
        clearButton.style.display = "none";
    } else {
        filterInput.style.display = "inline";
        clearButton.style.display = "inline";
    }

    formButton.innerText = "+ Add Item";
    formButton.style.backgroundColor = "#FF4500";

    isEditMode = false;
};

// Event listeners ---
form.addEventListener('submit', (event) => {
    event.preventDefault();

    addItemSubmit(inputItem.value);
});

clearButton.addEventListener('click', clearAll);
items.addEventListener('click', onClickItem);
cartShopping.addEventListener('dblclick', doubleClickDarkMode);
filterInput.addEventListener('input', filterItems);
document.addEventListener('DOMContentLoaded', displayItems);
updateUI();