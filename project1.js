// async function userguest(){
//     try{



//     }
// }
//  city= document.getElementById("cityinput");
// let btn = document.getElementById("btn");
// let result = document.getElementById("weatherresult");
//  btn.addEventListener("click",function(){
//      city = Input.value;
//      console.log(city)
    
// //  })
// const weatherform = document.querySelector(".weatherform");
// const cityinput = document.querySelector(".cityinput");

// const card= document.querySelector(".card"); 
// const apikey="7aa452d6226000fb7b79c48080fdaf3d";

// weatherform.addEventListener("submit", async event =>{
//     event.preventDefault();

//     const city=cityinput.value;

//     if(city){
//         try{
//             const weatherdata = await getweatherdata(city);
//             displayweatherinfo(weatherdata);
//         }
//         catch(error){
//             console.log("error",error.message);
//         }
//     }
//     else{
//         displayerror("please enter a city name");
//     }
// })
// async function getweatherdata(city){
//     const apiurl = 
//     `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
      
//     const response = await fetch(apiurl);
//     if(!response.ok){
//         throw new Error("failed to fetch data");
//     }
//     return await reponse.json();
// }
// function displayweatherinfo(data){
//      const{name:city,
//          main:{temp,humidity},
//          weather:[{description,id}]}= data;

//          card.textContent = " ";
//          card.style.display = "flex";

//          const citydisplay= document.createElement("h1");
//           const tempdisplay= document.createElement("p");
//            const humiditydisplay= document.createElement("p");
//             const descdisplay= document.createElement("p"); 
//             const emojidisplay = document.createElement("p");

//             citydisplay.textContent= city;
//             tempdisplay.textContent = `${(temp-273).toFixed(1)}c`;
//             humiditydisplay.textContent = `humidity:${humidity}`;
//             descdisplay.textContent = description;
//             emojidisplay.textContent = getweatheremoji(id);

//             citydisplay.classList.add("citydisplay");
//             tempdisplay.classList.add("tempdisplay");
//             humiditydisplay.classList.add("humiditydisplay")
//             descdisplay.classList.add("descdisplay");
//             emojidisplay.classList.add("weatheremoji");

//             card.appendChild(citydisplay);
//             card.appendChild(tempdisplay);
//             card.appendChild(humiditydisplay);
//             card.appendChild(descdisplay);
//             card.appendChild(emojidisplay);



// }
// function getweatheremoji(weatherid){
//     switch(true){
//         case (weatherid >=200 && weatherid <300):
//             return "🌧";
//         case (weatherid >=300 && weatherid <400):
//             return "🌧";
//         case (weatherid >=400 && weatherid <500):
//             return "🌧";
//         case (weatherid >=500 && weatherid <600):
//             return "🌧";
//         case (weatherid >=600 && weatherid <700):
//             return "❄";
//         case (weatherid >=700 && weatherid <800):
//             return "❄";
//         case (weatherid==800):
//             return "🌞";
//         default:
//             return "❓";
//     }

// }
// function displayerror(message){

//     const errordisplay = document.createElement("p");
//     errordisplay.textContent = message;
//     errordisplay.classList.add("errordisplay")

//     card.textContent=" ";
//     card.style.display = "flex";
//     card.appendChild(errordisplay);

// }
// let

 const weatherform = document.querySelector(".weatherform");
const cityinfo = document.querySelector(".cityinput");
const card = document.querySelector(".card");
const apikey = "7aa452d6226000fb7b79c48080fdaf3d";

weatherform.addEventListener("submit",async event =>{
    event.preventDefault();

    const city= cityinfo.value.trim();
    if(city){
        try{
              
            loadingweather();
            const weatherdata = await getweatherinfo(city);
                  displayweatherinfo(weatherdata);
        }
        catch(error){
            console.log(error); 
            displayerror(error.message);
        }
    }
   else{
    displayerror("please enter a city name");
   }
})



 async function getweatherinfo(city){
    const apiurl= 
     `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apikey}`;
     
    const response = await fetch(apiurl);
    if(response.status === 404){
        throw new Error("city not found");
    }
    else if(response.status === 401){
        throw new Error("invalid api key");
    }
    else if(response.status === 500){
        throw new Error("server error");
    }
    else if(!response.ok) {
        throw new Error("weather request failed");
    };

    return await response.json();

}

function displayweatherinfo(data){
    
    const{name:city,
         main:{temp,humidity},
         weather:[{description,id}]}=data;
         
         card.textContent=" ";
         card.style.display="flex";

         const citydisplay= document.createElement("h1");
          const tempdisplay = document.createElement("p");
           const humiditydisplay= document.createElement("p");
            const descdisplay= document.createElement("p");
             const iddisplay= document.createElement("p");

             citydisplay.textContent = city;
             tempdisplay.textContent = `${(temp-273.15).toFixed(1)}°c`;
             humiditydisplay.textContent = `humidity: ${humidity}`;
             descdisplay.textContent = description;
             iddisplay.textContent = displayemoji(id);

             citydisplay.classList.add("citydisplay");
             tempdisplay.classList.add("tempdisplay");
             humiditydisplay.classList.add("humiditydisplay");
             descdisplay.classList.add("descdisplay");
             iddisplay.classList.add("weatheremoji");

             card.appendChild(citydisplay);
             card.appendChild(tempdisplay);
             card.appendChild(humiditydisplay);
             card.appendChild(descdisplay);
             card.appendChild(iddisplay);

         
    

}
function displayemoji(weatherid){
    switch(true){
        case (weatherid >=200 && weatherid <299):
            return "🌧";
        case (weatherid >=300 && weatherid <399):
            return "🌧";
        case (weatherid >=400 && weatherid <499):
            return "🌧";
        case (weatherid >=500 && weatherid <599):
            return "🌧";
        case (weatherid >=600 && weatherid <699):
            return "❄";
        case (weatherid >=700 && weatherid <799):
            return "❄";
        case (weatherid==800):
            return "🌞";
        default:
            return "❓";

}}

function displayerror(message){
     const error= document.createElement("p");
     
     error.textContent = message;
     error.classList.add("errordisplay")

     card.textContent=" ";

     card.style.display= "flex";

     card.appendChild(error);
}
function loadingweather(){
    const load= document.createElement("p");
    card.textContent = " ";
    card.style.display = "flex";

   load.textContent = "loading weather...";
   card.appendChild(load);
}
            
