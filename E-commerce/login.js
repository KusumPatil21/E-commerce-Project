let form = document.querySelector("form");
let userName = document.querySelectorAll("input")[0];
let password = document.querySelectorAll("input")[1];
let euser = document.querySelectorAll("span")[0];
let epass = document.querySelectorAll("span")[1];
let eform = document.querySelectorAll("span")[2];
let dataFromStorage = JSON.parse(localStorage.getItem("data"));
console.log(dataFromStorage);

// console.log(form, userName, password, euser, epass, eform); To check

form.addEventListener("submit", (e) => {
    euser.innerHTML = ""; /To remove the error message/
    epass.innerHTML = ""; /To remove the error message/
    eform.innerHTML = ""; /To remove the error message/

    //matching login data
    let matchedData = dataFromStorage.find((e) => {
        if((e.phone == userName.value && e.pass == password.value) || (e.mail == userName.value && e.pass == password.value))
        {
            return e; /It returns object/
        }
    });

    if(userName.value == "" && password.value == "")
    {
        euser.innerHTML = "Enter the email or mobile number";
        epass.innerHTML = "Enter the password";
        e.preventDefault();
    }

    else if(userName.value == "")
    {
        euser.innerHTML = "*Enter the email or mobile number";
        e.preventDefault();
    }

    else if(password.value == "")
    {
        epass.innerHTML = "Enter the password";
        e.preventDefault();
    }
    else if(matchedData)
    {
        /*If correct then nothing should happen*/
        alert("Welcome to the page"); 
        
        //Once correct login store data in Local Storage
        localStorage.setItem("oneuser", JSON.stringify(matchedData)); /*With stringify it converts data as it is in string format/ /But tostring converts data in to string but changes*/
    }
    else
    {
        eform.innerHTML = "Match not found";
        e.preventDefault();
    }
});

let h3 = document.querySelector("h3");

h3.addEventListener("click", () => {
    if(h3.innerHTML == "show")
    {
        password.type = "text";
        h3.innerHTML = "hide";
    }
    else
    {
        h3.innerHTML = "show";
        password.type = "password";
    }
});