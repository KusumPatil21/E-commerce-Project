let oneuser =JSON.parse(localStorage.getItem("oneuser"));
let data = JSON.parse(localStorage.getItem("data"));

let cartItems=oneuser.cartItems;
console.log(oneuser);
let main = document.querySelector("main");

function display(){
    cartItems.map((e)=>{
        main.innerHTML +=`
        <div id=" ${e.product}">
        <div>
            <img src="${e.productImageURLs[0]}" alt="">
        </div>
        <div>
            <h3 ${e.name}></h3>
            <h2 ${e.price}></h2>
        </div>
        <div>
            <button>Delete</button>
        </div>
    </div>`
    })
}
display();

function del(){
    let allBtn=main.querySelectorAll("button");
    allBtn.forEach((btn)=>{

        btn.addEventListener("click",()=>{
            let confirmation=confirm("Are you sure want to remove the product ?");
            if(confirmation)
            {
              cartItems=cartItems.filter((e)=>{

                if(btn.parentElement.parentElement.id !=e.productId)
                {
                    return e;

                }
              });
                  display();
            }
        });
    });
}
del();