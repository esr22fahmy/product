let namePro = document.getElementById("namePro");
let Price = document.getElementById("Price");
let Category = document.getElementById("Category");
let Description = document.getElementById("Description");
let btnProduct = document.getElementById("btnProduct");
let inSearch = document.getElementById("inSearch");
let alertName = document.getElementById("alertName");
let alertPrice = document.getElementById("alertPrice");
let alertCategory = document.getElementById("alertCategory");

let moodBtn = "add";
let indexUpdate ;
btnProduct.style.color ='white';

// rejex

namePro.onkeyup =function(){
    // console.log("L")

    let nameRejex = /^[A-Za-z]{3,10}$/
    if(!nameRejex.test(namePro.value)){

        alertName.classList.remove("d-none");
        namePro.classList.add("is-invalid");
        namePro.classList.remove("is-valid");


    }else{
        alertName.classList.add("d-none");
        btnProduct.removeAttribute("disabled");
        namePro.classList.add("is-valid");
        namePro.classList.remove("is-invalid");

    }


}

// rejex for price

Price.onkeyup =function(){
    rejexPrice = /^[0-9]+$/

    if(rejexPrice.test(Price.value)){
        Price.classList.add("is-valid");
        Price.classList.remove("is-invalid");
        btnProduct.removeAttribute("disabled");
        alertPrice.classList.add("d-none");


    }
    else{
        Price.classList.add("is-invalid");
        Price.classList.remove("is-valid");
        alertPrice.classList.remove("d-none");


    }
}

function CategoryFun(){

if(Category.value!=""){
   
    Category.classList.add("is-valid");

}
else{
    Category.classList.add("is-invalid");

    alertCategory.classList.remove("d-none");

}

}



btnProduct.onclick =function(){
    if(namePro.value !="" && Price.value!="" && Category.value!=""){



        if(moodBtn == "add"){
            namePro.classList.remove("is-valid");

    
            productStorage();
            displayPro();
            cleanInput();
           
        }
        
        else{

            showUpdate();
    
           
    
        }
    
    }
    else{
        CategoryFun()

        alertName.classList.add("disabled");

    }
}

let productArray =[];
if(localStorage.productKey!=null){

    productArray = JSON.parse(localStorage.productKey);

}else{
    productArray =[];
}

function productStorage(){

    let product ={

        name:namePro.value.toLowerCase(),
        Price:Price.value,
        Category:Category.value.toLowerCase(),
        Description:Description.value.toLowerCase(),
    }

    productArray.push(product);
    localStorage.setItem("productKey" , JSON.stringify(productArray));

   
    // console.log(productArray)

}

// display data
function displayPro(){

    let table ='' ;
    for(let i=0; i < productArray.length ;i++){

        table+=`

        <tr>
        <td>${i+1}</td>
        <td>${productArray[i].name}</td>
        <td>${productArray[i].Price}</td>
        <td>${productArray[i].Category}</td>
        <td>${productArray[i].Description}</td>


        <td><button onclick='updateProduct(${i})'class="upd btn-warning">update</button></td>
        
        <td><button onclick='deleteProduct(${i})'class="del btn-danger" >delete</button></td>

    </tr>

  `
  
    }
    document.getElementById('tableBody').innerHTML=table;
   

    
}
displayPro();

function cleanInput(){
    namePro.value ='';
    Price.value ='';
    Category.value ='';
    Description.value ='';


}


// delet product

function deleteProduct(i){


// console.log(i)


productArray.splice(i,1);

localStorage.setItem("productKey",JSON.stringify(productArray));
displayPro()

}

// update 

function updateProduct(i){

    // console.log('l');

    scroll({
        top:0,
        behavior:"smooth"
    })
    moodBtn ="updatePro";
    namePro.value =  productArray[i].name ;
    Price.value =  productArray[i].Price ;
    Category.value =  productArray[i].Category ;
    Description.value =  productArray[i].Description ;
    btnProduct.innerHTML = 'update';
    btnProduct.style.background ="#ffc107";
    btnProduct.style.color ='#000';
    btnProduct.style.borderColor ="#ffc107";
    indexUpdate =i;   
 
    
}

function showUpdate(){
    


     productArray[indexUpdate].name = namePro.value ;
     productArray[indexUpdate].Price = Price.value ;
     productArray[indexUpdate].Category = Category.value ;
     productArray[indexUpdate].Description = Description.value ;
     console.log(indexUpdate);

     localStorage.setItem("productKey" , JSON.stringify(productArray));
     displayPro();
     cleanInput();
     moodBtn = "add";
     btnProduct.style.background ="#0dcaf0";
     btnProduct.style.color ='white';
     btnProduct.innerHTML = 'Add Product';
    
   


// console.log(productArray)

}

inSearch.onkeyup =function(){
    // console.log("l");

    let table ='' ;
    for(let i=0; i < productArray.length ;i++){

        if(productArray[i].name.includes(inSearch.value.toLowerCase())){
            // console.log("y")
            table+=`

            <tr>
            <td>${i+1}</td>
            <td>${productArray[i].name}</td>
            <td>${productArray[i].Price}</td>
            <td>${productArray[i].Category}</td>
            <td>${productArray[i].Description}</td>
    
    
            <td><button onclick='updateProduct(${i})'class="upd btn-warning">update</button></td>
            
            <td><button onclick='deleteProduct(${i})'class="del btn-danger" >delete</button></td>
    
        </tr>
    
      `
        }
    }

    document.getElementById('tableBody').innerHTML=table;


}

window.onload =function(){
    namePro.focus();
}