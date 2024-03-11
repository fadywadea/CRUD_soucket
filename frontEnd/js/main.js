/*
  CRUD 
  C  ==> create
  R  ==> retrieve
  U  ==> update
  D  ==> delete
  +S ==> search
*/
const socket = io('http://localhost:3000');

var productName = document.getElementById("productName");
var productPrice = document.getElementById("productPrice");
var productModel = document.getElementById("productModel");
var productDesc = document.getElementById("productDesc");
var addProductBtn = document.getElementById("addProductBtn");
var updateProductBtn = document.getElementById("updateProductBtn");
var productList = [];

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
    var product = {
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
    alert("invalid")
  }
};

//View product list
function display(list) {
  var carton = ``;
  for (var i = 0; i < list.length; i++) {
    carton +=
      `<tr>
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
  };
  document.getElementById("tBody").innerHTML = carton;
};

// Delete an item from the row from the list on click
function deleteProduct(index) {
  productList.splice(index, 1);
  localStorage.setItem("productList", JSON.stringify(productList));
  display(productList);
};

//Search . . .
function searchByName(term) {
  var foundedItems = [];
  for (var i = 0; i < productList.length; i++) {
    if (productList[i].name.toLowerCase().includes(term.toLowerCase()) == true) {
      productList[i].newName = productList[i].name.toLowerCase().replace(term.toLowerCase(), `<span class="text-danger">${term}</span>`)
      foundedItems.push(productList[i]);
    }
  }
  display(foundedItems);
}

//Get item for Update 
function getUpdatedProduct(updated) {
  addProductBtn.classList.add("d-none");
  updateProductBtn.classList.replace("d-none", "d-block");
  // productName.value = productList[updated].name;
  // productPrice.value = productList[updated].price;
  // productModel.value = productList[updated].model;
  // productDesc.value = productList[updated].desc;
  updateFormValue(productList[updated])
}

//Delete the data from the form
function updateFormValue(flag) {
  productName.value = flag ? flag.name : "";
  productPrice.value = flag ? flag.price : "";
  productModel.value = flag ? flag.model : "";
  productDesc.value = flag ? flag.desc : "";
};

//Update
function updateProduct() {
  addProductBtn.classList.remove("d-none", "d-block");
  updateProductBtn.classList.replace("d-block", "d-none");
}


function validationProductName() {
  var regex = /^[A-Z][a-z]{3,8}$/;
  if (regex.test(productName.value) == true) {
    productName.style = "border: none";
    return true;
  } else {
    productName.style = "border:  5px solid red";
    return false;
  }
}