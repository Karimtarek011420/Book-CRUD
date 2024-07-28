var bookMakerNameInput = document.getElementById("floatingInput");
var bookMakerEmailInput = document.getElementById("floatingInput1");
var sumBtn = document.querySelector(".btn-outline-info");
var loadBtn = document.querySelector(".btnload  ");
sumBtn.addEventListener("click", getProducts);
loadBtn.addEventListener("click",loadButton );
var Allink = [];
if (localStorage.getItem("Allproducts")!=null) {
  Allink=JSON.parse(localStorage.getItem("Allproducts"))
  displayProducts()
}
function getProducts() {
  var testRegex=valideProduct()
  if (testRegex==true) {
    var Maker = {
      name: bookMakerNameInput.value,
      Email: bookMakerEmailInput.value,
    };
    Allink.push(Maker);
    console.log(Allink);
    localStorage.setItem("Allproducts",JSON.stringify(Allink));
    displayProducts();
    clearProducts();
  }else{
    alert(testRegex)
  }
 
}
function displayProducts() {
  var box = "";
  for (let i = 0; i < Allink.length; i++) {
    box =
      box +`<tr>
              <td>${Allink[i].name}</td>
              <td>
                <button type="button" class="btn btn-outline-info"><a target="_blank" href="${Allink[i].Email}">Visit</a></button>
              </td>
              <td>
                <button onclick="uploadLink(${i})" type="button" class="btn btn-outline-warning">Upload</button>
              </td>
              <td>
                <button onclick="deleteLink(${i})" type="button" class="btn btn-outline-danger">Delete</button>
              </td>
            </tr>
    `;
  }
  document.querySelector("tbody").innerHTML=box;
}
function clearProducts() {
  bookMakerNameInput.value="";
  bookMakerEmailInput.value="";
}
function deleteLink(index) {
  Allink.splice(index,1);
  localStorage.setItem("Allproducts",JSON.stringify(Allink))
  displayProducts();
}
function uploadLink(i) {    
  sumBtn.classList.replace("d-block","d-none");
  loadBtn.classList.remove("d-none")
  bookMakerNameInput.value=Allink[i].name;
  bookMakerEmailInput.value=Allink[i].Email
}
function loadButton() {
  loadBtn.classList.add("d-none")
  sumBtn.classList.replace("d-none","d-block");  
}
function valideProduct() {
  var regalName=/^[A-Z][a-z]{2,7}$/;
  var regalEmail=/^[a-z]{1,}\@gmail\.com$/;
  if (!regalName.test(bookMakerNameInput.value)==true) {
    return "Name must be the first capital letter and seven letters after it"
    
  }else if (!regalEmail.test(bookMakerEmailInput.value)==true) {
    return "Email must be @ gmail.com"
  }
  return true;
}
