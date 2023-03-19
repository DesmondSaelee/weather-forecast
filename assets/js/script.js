// var apiKey = "5d5ccc86fbb89a5309c6bcc0e4baaab9"
var apiKey = "9c26d768ead86b39036caf98fb0abbfa"
var submitButton = document.querySelector("#submitButton");

submitButton.addEventListener("click",function(){
    var cityname = document.getElementById("cityInput").value
    var previousSearch = JSON.parse(localStorage.getItem("weatherForecast")) || []
    previousSearch.push(cityname)
    localStorage.setItem("weatherForecast",JSON.stringify(previousSearch))
    storeCity(cityname)
    getForecast(cityname)
})



function getForecast(cityname){
  
  var URL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityname}&appid=${apiKey}&units=imperial`
  fetch(URL)
  .then(response => response.json())
  .then(weatherApiData => {
    console.log(weatherApiData)
    var j = 1
    var cityname = document.getElementById("cityInput").value
    for(let i=0;i<weatherApiData.list.length;i = i+7){
        var divid = "day"+j
        $("#"+divid).children(".card-body").children(".card-title").text(cityname + " " + weatherApiData.list[i].dt_txt)
        $("#"+divid).children(".card-body").children("#image-"+j).attr("src", ` https://openweathermap.org/img/wn/${weatherApiData.list[i].weather[0].icon}@2x.png` )
        $("#"+divid).children(".card-body").children("#temp-"+j).text(`Temp: ${weatherApiData.list[i].main.temp}`)
        $("#"+divid).children(".card-body").children("#wind-"+j).text(`wind Speed: ${weatherApiData.list[i].wind.speed}`)
        $("#"+divid).children(".card-body").children("#humidity-"+j).text(` humidity-: ${weatherApiData.list[i].main.humidity}`)

    //    document.getElementById("date-"+j).textContent =weatherApiData.list[i].dt_txt

    //     document.getElementById("image-"+j).setAttribute("src",`https://openweathermap.org/img/wn/${weatherApiData.list[i].weather[0].icon}@2x.png` )

    //     document.getElementById("temp-"+j).textContent = `Temp: ${weatherApiData.list[i].main.temp}`

    //     document.getElementById("wind-"+j).textContent = `wind Speed: ${weatherApiData.list[i].wind.speed}`

    //     document.getElementById("#humidity-"+j).textContent =` humidity-: ${weatherApiData.list[i].main.humidity}`
        j++
    }
  })
}

function storeCity(){
    var previousSearch = JSON.parse(localStorage.getItem("weatherForecast")) || []
    var htmlCode = ""
    for(let i=0;i<previousSearch.length;i++){
        htmlCode += `
        <li><button class="btn btn-secondary searchCity ">${previousSearch[i]}</button></li>
        `
    }

    document.getElementById("cities").innerHTML = htmlCode
    var searchList = document.querySelectorAll(".searchCity")
    searchList.forEach(element => element.addEventListener("click",getForecastCity))
}

storeCity()


function getForecastCity(event){
    var city = event.target.innerText
    console.log(city)
    getForecast(city)
}