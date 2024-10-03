let cartItems=[];
let data =JSON.parse(localStorage.getItem("data"));
let oneuser= JSON.parse(localStorage.getItem("oneuser"));
let count =document.querySelector("#count");

console.log(data,oneuser);

if(oneuser)
{
    if(oneuser.cartItems)
    {
        count.innerHTML=oneuser.cartItems.length;
        cartItems=oneuser.cartItems;
    }
}

function loginLogout()
{
    let login=document.querySelector("#right");
    //getting one user data from local storage
let oneUserData=JSON.parse(localStorage.getItem("oneuser"));
console.log(oneUserData);

//user information
if(oneUserData)
{
   //providing information inside right division
    login.innerHTML=`<span>${oneUserData.first}</span> <a href="./main.html">
     <button id="logout">Logout</button></a>`;
     
    //accessing logout button
    let logout= document.querySelector("#logout");
    
    //logout event
    logout.addEventListener("click",()=>{
        localStorage.removeItem("oneuser");
      
    });
}

}
loginLogout();

//fetching data from server
async function allProductdata() {
    let dataFromServer= await fetch("https://www.shoppersstack.com/shopping/products/alpha");
    
    //dataObject in format
    let convertedData= await dataFromServer.json();//msg , sts code, data =properties
    //only data property
    let allData=convertedData.data;//array object
    console.log(allData);

    //filter data for men
    let menData=allData.filter((e)=>
    {
        if(e.category=="men")
        {
            return e;
        }
        
            
    });

    console.log(menData);

    let womenData=allData.filter((e)=>
        {
            if(e.category=="women")
            {
                return e;
            }
            
                
        });
    
        console.log(womenData);

        let kidsData=allData.filter((e)=>
            {
                if(e.category=="kids")
                {
                    return e;
                }
                
                    
            });
        
            console.log(kidsData);

            let electronicData=allData.filter((e)=>
                {
                    if(e.category=="electronic")
                    {
                        return e;
                    }
                    
                        
                });
            
                console.log(electronicData);
        
    let maleOutput=document.querySelector("#maleCont");

    //male data output
    menData.map((e)=>{
        maleOutput.innerHTML+=
        `<div id="${e.productId}">
                <img src="${e.productImageURLs[0]}" alt="">
                <h3>Name:${e.name}</h3>
                <h2>Price:${e.price}</h2>
                <h2>Rating:${e.rating}</h2>
                <button>Add to cart</button>
            </div>`;
    });

    let femaleOutput=document.querySelector("#femaleCont");

    //female output
    womenData.map((e)=>{

        femaleOutput.innerHTML+=
        `<div id="${e.productId}">
                <img src="${e.productImageURLs[0]}" alt="">
                <h3>Name:${e.name}</h3>
                <h2>Price:${e.price}</h2>
                <h2>Rating:${e.rating}</h2>
                <button>Add to cart</button>
            </div>`;
    });

    let kidsOutput=document.querySelector("#kidsCont");

    //kids output
    kidsData.map((e)=>{

         kidsOutput.innerHTML+=
        `<div id="${e.productId}">
                <img src="${e.productImageURLs[0]}" alt="">
                <h3>Name:${e.name}</h3>
                <h2>Price:${e.price}</h2>
                <h2>Rating:${e.rating}</h2>
                <button>Add to cart</button>
            </div>`;
    });

    let electronicOutput=document.querySelector("#electronicCont");
       //electronic output
       electronicData.map((e)=>{

        electronicOutput.innerHTML+=
       `<div id="${e.productId}">
               <img src="${e.productImageURLs[0]}" alt="">
               <h3>Name:${e.name}</h3>
               <h2>Price:${e.price}</h2>
               <h2>Rating:${e.rating}</h2>
               <button>Add to cart</button>
           </div>`;
   });

   //serach results

   let input= document.querySelector("input");//to get value
   let searchBtn= document.querySelector("#searchBtn");//when to display
   let searchResult= document.querySelector("#searchResult")//where to display

   searchBtn.addEventListener("click",(e)=>{
   searchResult.innerHTML="";//clear previous data n we will get new serached data
    allData.map((e)=>{
        //converting both product name n search-input into lower case 
        if(e.name.toLocaleLowerCase().includes(input.value.trim().toLocaleLowerCase()))
        {
            searchResult.innerHTML+=
            `<div id="${e.productId}">
               <img src="${e.productImageURLs[0]}" alt=""/>
               <h3>Name:${e.name}</h3>
               <h2>Price:${e.price}</h2>
               <h2>Rating:${e.rating}</h2>
               <button>Add to cart</button>
           </div>`;
        }
    })
   });

   //accessing all add-to-cart button
   let main =document.querySelector("main");
   let allBtn =main.querySelectorAll("button");
   console.log(allBtn);

   //iterating all btn
   allBtn.forEach((btn)=>
{
    //adding event listener to each button
    btn.addEventListener("click",()=>{
        console.log(btn.parentElement);

        cartItems =cartItems.filter((e)=>{
            if(e.productId !=btn.parentElement.id)
            {
                return e;
            }
        });

        //to find clicked product
        let product=allData.find((e)=>
        {
            if(e.productId==btn.parentElement.id)
            {
                return e;
            }
        });

        //cliked product added to the cart
        cartItems.push(product);
        oneuser.cartItems=cartItems;
        console.log(oneuser);

        //storing data in local storage
        localStorage.setItem("oneuser",JSON.stringify(oneuser));

        //removing current user details
        data= data.filter((e)=>
        {
            if(e.mobileNumber!=oneuser.mobileNumber)
            {
                return e;
            }
            
        });
        //adding current user updated details to data
        data.push(oneuser);
        console.log(data);

        //storing updated data in local storages
        localStorage.setItem("data",JSON.stringify(data));
        count.innerHTML=oneuser.cartItems.length;
    

    });
});
}
allProductdata();

let cartIcon = document.querySelector(".fa-cart-shopping");
cartIcon.addEventListener("click",()=>
{
    window.location.href="./cart.html";
})