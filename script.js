function ambil(){
const selectElement = document.createElement("select");

fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json`)
.then(response => response.json())
.then(provinces => provinces.forEach((element,index) => {
    console.log(provinces[index].name)
    const option = document.createElement("option")
    option.text = provinces[index].name
    option.value = index
    selectElement.appendChild(option)
}));
const container = document.getElementById("container")
container.appendChild(selectElement)
}



