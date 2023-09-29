const selectElement = document.createElement("select");
const selectElementCity = document.createElement("select");
const selectElementSubcity = document.createElement("select");
const selectElementVillage = document.createElement("select");

// Buat elemen <p> untuk menampilkan alamat
const addressElement = document.createElement("p");
const addressContainer = document.getElementById("address-container");
addressContainer.appendChild(addressElement);

let selectedProvince = "";
let selectedCity = "";
let selectedSubcity = "";
let selectedVillage = "";

fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json`)
  .then(response => response.json())
  .then(provinces => provinces.forEach((element, index) => {
    const option = document.createElement("option");
    option.text = provinces[index].name;
    option.value = provinces[index].id;
    selectElement.appendChild(option);
  }));

const container = document.getElementById("container");
container.appendChild(selectElement);

const selectElement2 = document.querySelector("select");

selectElement2.addEventListener("change", () => {
  selectedProvince = selectElement2.options[selectElement2.selectedIndex].text;
  const selectedValue = selectElement2.value;
  let optionHTML = "";
  fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${selectedValue}.json`)
    .then(response => response.json())
    .then(regencies => {
      regencies.forEach((element, index) => {
        optionHTML += '<option value="' + regencies[index].id + '">' + regencies[index].name + '</option>';
      });
      selectElementCity.innerHTML = optionHTML;
      selectedCity = ""; // Reset kota saat provinsi berubah
      selectedSubcity = ""; // Reset kabupaten saat provinsi berubah
      selectedVillage = ""; // Reset desa saat provinsi berubah
      updateAddress();
    });

  const container2 = document.getElementById("container2");
  container2.appendChild(selectElementCity);
});

selectElementCity.addEventListener("change", () => {
  selectedCity = selectElementCity.options[selectElementCity.selectedIndex].text;
  const selectedValueCity = selectElementCity.value;
  let optionHTMLSubcity = "";
  fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/districts/${selectedValueCity}.json`)
    .then(response => response.json())
    .then(districts => {
      districts.forEach((element, index) => {
        optionHTMLSubcity += '<option value="' + districts[index].id + '">' + districts[index].name + '</option>';
      });
      selectElementSubcity.innerHTML = optionHTMLSubcity;
      selectedSubcity = ""; // Reset kabupaten saat kota berubah
      selectedVillage = ""; // Reset desa saat kota berubah
      updateAddress();
    });

  const container3 = document.getElementById("container3");
  container3.appendChild(selectElementSubcity);
});

selectElementSubcity.addEventListener("change", () => {
  selectedSubcity = selectElementSubcity.options[selectElementSubcity.selectedIndex].text;
  const selectedValueSubcity = selectElementSubcity.value;
  let optionHTMLVillage = "";
  fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/villages/${selectedValueSubcity}.json`)
    .then(response => response.json())
    .then(villages => {
      villages.forEach((element, index) => {
        optionHTMLVillage += '<option value="' + villages[index].id + '">' + villages[index].name + '</option>';
      });
      selectElementVillage.innerHTML = optionHTMLVillage;
      updateAddress(); // Perbarui alamat saat opsi desa berubah
    });

  const container4 = document.getElementById("container4");
  container4.appendChild(selectElementVillage);
});

// Tambahkan event listener untuk memperbarui alamat saat opsi desa berubah
selectElementVillage.addEventListener("change", () => {
  selectedVillage = selectElementVillage.options[selectElementVillage.selectedIndex].text;
  updateAddress();
});

// Fungsi untuk menggabungkan alamat dan memperbarui elemen <p> dengan alamat yang baru
function updateAddress() {
  const address = `${selectedVillage}, ${selectedSubcity}, ${selectedCity}, ${selectedProvince}`;
  addressElement.textContent = address;
}
