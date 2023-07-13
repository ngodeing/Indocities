// membuat tag select untuk provinsi dan kota
const selectElement = document.createElement("select");
const selectElementCity = document.createElement("select");

// memanggil API provinsi di Indonesia
fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json`)
.then(response => response.json())
.then(provinces => provinces.forEach((element,index) => {
    // melakukan looping sesuai array yang ada di dalam API
    const option = document.createElement("option")
    option.text = provinces[index].name
    option.value = provinces[index].id
    selectElement.appendChild(option)
}));
// Memasukan data ke element HTML
const container = document.getElementById("container")
container.appendChild(selectElement)

const selectElement2 = document.querySelector("select");
// Ketika nilai dari option berubah maka akan menjalankan fungsi ambil data kota dari provinsi
selectElement2.addEventListener("change", ()=> {
    const selectedValue = selectElement2.value
    let optionHTML = ""
    fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${selectedValue}.json`)
    .then(response => response.json())
    .then(regencies => regencies.forEach((element,index) => {
    optionHTML += '<option value="' + regencies[index].id + '">' + regencies[index].name + '</option>'
    // agar tak menumpuk gunakan inner html bukan appendchild
    selectElementCity.innerHTML = optionHTML
    }));
    
    const container2 = document.getElementById("container2")
    container2.appendChild(selectElementCity)
});





