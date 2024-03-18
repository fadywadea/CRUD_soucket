"user strict";

/*
  CRUD 
  C  ==> create
  R  ==> retrieve
  U  ==> update
  D  ==> delete
  +S ==> search
*/

const socket = io("http://localhost:3000");

const productName = document.getElementById("productName");
const productPrice = document.getElementById("productPrice");
const productModel = document.getElementById("productModel");
const productDesc = document.getElementById("productDesc");
const addProductBtn = document.getElementById("addProductBtn");
const updateProductBtn = document.getElementById("updateProductBtn");

let index;
let productList = [];


// If the product list is empty display []ُ empty or the product list contains items then display this product list
if (localStorage.getItem("productList") == null) {
  productList = [];
} else {
  productList = JSON.parse(localStorage.getItem("productList"));
  display(productList);
}

//Create products in the list ==> | SOLID |
function addProduct() {
  if (validationProductName()) {
    let product = {
      name: productName.value,
      price: productPrice.value,
      model: productModel.value,
      desc: productDesc.value,
    };
    productList.push(product);
    display(productList);
    localStorage.setItem("productList", JSON.stringify(productList));
    updateFormValue();
  } else {
    alert("Name must be start with capital character.");
  }
}

productName.addEventListener("blur", validationProductName);
addProductBtn.addEventListener("click", addProduct);

//View product list
function display(list) {
  let carton = ``;
  for (let i = 0; i < list.length; i++) {
    carton += `<tr>
      <td>${i + 1}</td>
      <td>${list[i].newName ? list[i].newName : list[i].name}</td>
      <td>${list[i].price}</td>
      <td>${list[i].model}</td>
      <td>${list[i].desc}</td>
      <td>
        <button onclick="getUpdatedProduct(${i})" class="btn btn-warning mx-auto">Update</button>
      </td>
      <td>
        <button onclick="deleteProduct(${i})" class="btn btn-danger mx-auto">Delete</button>
      </td>
      </tr>`;
  }
  document.getElementById("tBody").innerHTML = carton;
}

//Search . . .
function searchByName(term) {
  let foundedItems = [];
  for (let i = 0; i < productList.length; i++) {
    if (
      productList[i].name.toLowerCase().includes(term.toLowerCase()) == true
    ) {
      productList[i].newName = productList[i].name
        .toLowerCase()
        .replace(
          term.toLowerCase(),
          `<span class="text-danger">${term}</span>`
        );
      foundedItems.push(productList[i]);
    }
  }
  display(foundedItems);
}

// Delete the data from the form
function updateFormValue(flag) {
  productName.value = flag ? flag.name : "";
  productPrice.value = flag ? flag.price : "";
  productModel.value = flag ? flag.model : "";
  productDesc.value = flag ? flag.desc : "";
}

// Delete an item from the row from the list on click
function deleteProduct(index) {
  productList.splice(index, 1);
  localStorage.setItem("productList", JSON.stringify(productList));
  display(productList);
}

//Get item for Update
function getUpdatedProduct(i) {
  addProductBtn.classList.add("d-none");
  updateProductBtn.classList.replace("d-none", "d-block");
  updateFormValue(productList[i]);
  index = i;
}

// Update
function updateProduct() {
  let newProduct = {
    name: productName.value,
    price: productPrice.value,
    model: productModel.value,
    desc: productDesc.value,
  }
  productList[index] = newProduct;
  display(productList);
  addProductBtn.classList.remove("d-none", "d-block");
  updateProductBtn.classList.replace("d-block", "d-none");
  updateFormValue();
};

updateProductBtn.addEventListener("click", updateProduct);

function validationProductName() {
  const regex = /^[A-Z][a-z]{3,8}$/;
  if (regex.test(productName.value) == true) {
    productName.style = "border: none";
    return true;
  } else {
    productName.style = "border:  5px solid red";
    return false;
  }
}
