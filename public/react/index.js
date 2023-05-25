//import React from "react";
//import { createRoot } from 'react-dom/client';
//import 'regenerator-runtime/runtime'

//import {App} from './components/App';

//const root = createRoot(document.getElementById("root"));
//root.render(<App />);

///////////////////////////////////////////////////////////////////////

let inventory = [];

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

class Product {
  constructor(name, description, category, price, productCode) {
    this.name = name;
    this.description = description;
    this.category = category;
    this.price = price;
    this.productCode = productCode;
  }
}


editAnItem.addEventListener("click", (event) => {
  event.preventDefault();

  edit.style.display = 'block';
  main.style.display = 'none';



  updateInventoryList()
});




addButton2.addEventListener("click", (event) => {
  event.preventDefault();

  if (inventory.length >= inputID.value && inputID.value > 0) {
    inventory[inputID.value - 1].name = inputName2.value;
    inventory[inputID.value - 1].description = inputDescription2.value;
    inventory[inputID.value - 1].category = inputCategory2.value;
    inventory[inputID.value - 1].price = inputPrice2.value;


    edit.style.display = 'none';
    main.style.display = 'block';
  }



  updateInventoryList()
  
});

inputID.addEventListener("input", function() {
  // Code to run when the value changes 
  if (inventory.length >= inputID.value && inputID.value > 0) {
    console.log("If statement")
    inputName2.value = (inventory[inputID.value - 1].name);
    inputDescription2.value = (inventory[inputID.value - 1].description);
    inputCategory2.value = (inventory[inputID.value - 1].category);
    inputPrice2.value = (inventory[inputID.value - 1].price);
  } else {
    console.log("Else statement")
    inputName2.placeholder = "Name";
    inputDescription2.placeholder = "Description";
    inputCategory2.placeholder = "Category";
    inputPrice2.placeholder = "Price";

    inputName2.value = "";
    inputDescription2.value = "";
    inputCategory2.value = "";
    inputPrice2.value = "";
  }
  
  // Call your custom function or perform other actions here
});

addButton.addEventListener("click", (event) => {
  event.preventDefault();

  let productCode = inventory.length + 1;

  let newProduct = new Product(
    inputName.value,
    inputDescription.value,
    inputCategory.value,
    inputPrice.value,
    productCode

  );

  inventory.push(newProduct); // Push the new product object to the inventory array
  console.log(inventory);
  updateInventoryList(); // Update the inventory list

  inputName.value = "";
  inputDescription.value = "";
  inputCategory.value = "";
  inputPrice.value = "";
});

function updateInventoryList() {
  // Clear the existing list
  list.innerHTML = "";

  // Loop through the inventory array
  for (let i = 0; i < inventory.length; i++) {
    // Create a new div container for each product
    let container = document.createElement("div");
    container.classList.add("container");

    // Create a remove button for the item
    let removeButton = document.createElement("button");
    removeButton.classList.add("removeButton");
    removeButton.innerHTML = "X";

    // Add a click event listener to the remove button
    removeButton.addEventListener("click", (event) => {
      removeItem(event, i);
    });

    // Append the remove button to the container
    container.appendChild(removeButton);

    // Create the inner div elements for product information
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

    // Append the inner div elements to the item-info div
    itemInfo.appendChild(itemTitle);
    itemInfo.appendChild(itemDescription);
    itemInfo.appendChild(itemCategory);
    itemInfo.appendChild(itemPrice);
    itemInfo.appendChild(itemCode);

    // Append the item-info div to the item div
    item.appendChild(itemInfo);

    // Append the item div to the container div
    container.appendChild(item);

    // Append the container div to the inventory list
    list.appendChild(container);
  }
}

function removeItem(event, index) {
  event.preventDefault();
  inventory.splice(index, 1); // Remove the item from the array
  updateInventoryList(); // Update the inventory list
}
