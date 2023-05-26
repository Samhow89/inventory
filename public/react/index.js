//import React from "react";
//import { createRoot } from 'react-dom/client';
//import 'regenerator-runtime/runtime'

//import {App} from './components/App';

//const root = createRoot(document.getElementById("root"));
//root.render(<App />);

///////////////////////////////////////////////////////////////////////







let inventory = []; // Array where items will be stored


// Adding all html elements as variables
let addButton = document.querySelector(".addButton");
let list = document.querySelector(".list");
let inputName = document.querySelector(".inputName");
let inputDescription = document.querySelector(".inputDescription");
let inputCategory = document.querySelector(".inputCategory");
let inputPrice = document.querySelector(".inputPrice");
let addButton2 = document.querySelector(".addButton2");
let inputName2 = document.querySelector(".inputName2");
let inputDescription2 = document.querySelector(".inputDescription2");
let inputCategory2 = document.querySelector(".inputCategory2");
let inputPrice2 = document.querySelector(".inputPrice2");
let inputID = document.querySelector(".inputID");
let editAnItem = document.querySelector(".editAnItem");
let edit = document.querySelector(".edit");
let main = document.querySelector(".main");
let back = document.querySelector(".back");

class Product { // Product class
  constructor(name, description, category, price, productCode) {
    this.name = name;
    this.description = description;
    this.category = category;
    this.price = price;
    this.productCode = productCode;
  }
}


editAnItem.addEventListener("click", (event) => { // Hides main inventory and unhides the edit menu 
  event.preventDefault();

  if (inventory.length > 0){  // Will only show the edit section if there are items in the inventory
  edit.style.display = 'block';    
  main.style.display = 'none';
  }

  updateInventoryList()
});


back.addEventListener("click", (event) => {  // Hides the edit menu and shows the inventory
  event.preventDefault();

  edit.style.display = 'none';
  main.style.display = 'block';

  updateInventoryList()
})

addButton2.addEventListener("click", (event) => { // Updates selected item with the text that is in the edit input boxes
  event.preventDefault();
  if (inputName2.value != "" && inputDescription2.value != "" && inputCategory2.value != "" && inputPrice2.value >= 0.01){

  if (inventory.length >= inputID.value && inputID.value > 0) {
    inventory[inputID.value - 1].name = inputName2.value;
    inventory[inputID.value - 1].description = inputDescription2.value;
    inventory[inputID.value - 1].category = inputCategory2.value;
    inventory[inputID.value - 1].price = parseFloat(inputPrice2.value).toFixed(2);


    edit.style.display = 'none';
    main.style.display = 'block';
  }
  }


  updateInventoryList()
  
});

inputID.addEventListener("input", function() { // Auto fills the boxes with the products information
  if (inventory.length >= inputID.value && inputID.value > 0) {
    console.log("If statement")
    inputName2.value = (inventory[inputID.value - 1].name);
    inputDescription2.value = (inventory[inputID.value - 1].description);
    inputCategory2.value = (inventory[inputID.value - 1].category);
    inputPrice2.value = (inventory[inputID.value - 1].price);
  } else {
    console.log("Else statement")
    inputName2.placeholder = "Product Name";
    inputDescription2.placeholder = "Description";
    inputCategory2.placeholder = "Category";
    inputPrice2.placeholder = "Price";

    inputName2.value = "";
    inputDescription2.value = "";
    inputCategory2.value = "";
    inputPrice2.value = "";
  }
  
});

addButton.addEventListener("click", (event) => { // Creates a new product when clicked aslong as all the input boxes have been filled
  event.preventDefault();

  
  if (inputName.value != "" && inputDescription.value != "" && inputCategory.value != "" && inputPrice.value >= 0.01){
  
  let productCode = inventory.length + 1;

  let newProduct = new Product(
    inputName.value,
    inputDescription.value,
    inputCategory.value,
    parseFloat(inputPrice.value).toFixed(2),
    productCode

  );


  inventory.push(newProduct); // Push the new product object to the inventory array
  console.log(inventory);
  updateInventoryList(); 

  inputName.value = "";
  inputDescription.value = "";
  inputCategory.value = "";
  inputPrice.value = "";
  }
});

function updateInventoryList() { // Sorts through and creates a new div for each product that there is and updates the product with the correct information
  
  list.innerHTML = "";

  for (let i = 0; i < inventory.length; i++) {
  
    let container = document.createElement("div");
    container.classList.add("container");
    inventory[i].productCode = i + 1;

  
    let removeButton = document.createElement("button");
    removeButton.classList.add("removeButton");
    removeButton.innerHTML = "X";

  
    removeButton.addEventListener("click", (event) => {
      removeItem(event, i);
    });

  
    container.appendChild(removeButton);


    let itemCode = document.createElement("div");
    itemCode.classList.add("item-code");
    itemCode.textContent = "ID: " + inventory[i].productCode;

    let item = document.createElement("div");
    item.classList.add("item");

    let itemInfo = document.createElement("div");
    itemInfo.classList.add("item-info");

    let itemTitle = document.createElement("div");
    itemTitle.classList.add("item-title");
    itemTitle.textContent = inventory[i].name;

    let itemDescription = document.createElement("div");
    itemDescription.classList.add("item-description");
    itemDescription.textContent = inventory[i].description;

    let itemCategory = document.createElement("div");
    itemCategory.classList.add("item-category");
    itemCategory.textContent = inventory[i].category;

    let itemPrice = document.createElement("div");
    itemPrice.classList.add("item-price");
    itemPrice.textContent = "£" + inventory[i].price;

    
    itemInfo.appendChild(itemTitle);
    itemInfo.appendChild(itemDescription);
    itemInfo.appendChild(itemCategory);
    itemInfo.appendChild(itemPrice);
    itemInfo.appendChild(itemCode);


    item.appendChild(itemInfo);

  
    container.appendChild(item);

  
    list.appendChild(container);
  }
}

function removeItem(event, index) {
  event.preventDefault();
  inventory.splice(index, 1); // Remove the item from the array
  updateInventoryList(); // Update the inventory list
}
