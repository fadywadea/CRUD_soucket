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

socket.on('connect', (x) => {
  console.log("connected to server!");
  socket.emit('load');
});

// Add product
function addProduct() {
  let product = {
    name: productName.value,
    price: productPrice.value,
    model: productModel.value,
    desc: productDesc.value,
  };
  //send data to server
  socket.emit('addProduct', product);
  updateFormValue();
  socket.on("invalid", () => {
    alert("Invalid input! Please check your fields.");
  });
};
addProductBtn.addEventListener("click", addProduct);

//View product list
socket.on('displayProduct', (products) => {
  list = products;
  display(products);
});

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
        <button onclick="getUpdatedProduct('${list[i]._id}')" class="btn btn-warning mx-auto">Update</button>
      </td>
      <td>
        <button onclick="deleteProduct('${list[i]._id}')" class="btn btn-danger mx-auto">Delete</button>
      </td>
      </tr>`;
  }
  document.getElementById("tBody").innerHTML = carton;
}

// Delete the data from the form
function updateFormValue(flag) {
  productName.value = flag ? flag.name : "";
  productPrice.value = flag ? flag.price : "";
  productModel.value = flag ? flag.model : "";
  productDesc.value = flag ? flag.desc : "";
}

// Delete product
function deleteProduct(id) {
  socket.emit("deleteProduct", id);
}

//Get item for Update
function getUpdatedProduct(i) {
  addProductBtn.classList.add("d-none");
  updateProductBtn.classList.replace("d-none", "d-block");
  socket.emit("getProduct", i);
  socket.on("updateDisplay", (product) => {
    updateFormValue(product);
  });
  index = i;
}

// Update product
function updateProduct() {
  let newProduct = {
    name: productName.value,
    price: productPrice.value,
    model: productModel.value,
    desc: productDesc.value,
  }
  socket.emit("updateProduct", newProduct);
  addProductBtn.classList.remove("d-none", "d-block");
  updateProductBtn.classList.replace("d-block", "d-none");
  updateFormValue();
};
updateProductBtn.addEventListener("click", updateProduct);

//Search...
// function searchByName(term) {
//   let foundedItems = [];
//   console.log(term);
//   for (let i = 0; i < list.length; i++) {
//     if (
//       list[i].name.toLowerCase().includes(term.toLowerCase()) == true
//     ) {
//       list[i].newName = list[i].name.toLowerCase().replace(term.toLowerCase(),
//         `<span class="text-danger">${term}</span>`
//       );
//       foundedItems.push(list[i]);
//     }
//   }
//   display(foundedItems);
// }
