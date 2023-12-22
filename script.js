let name = document.querySelector(".name");
let lastName = document.querySelector(".lastName");
let editName = document.querySelector(".editName");
let editLastName = document.querySelector(".editLastName");
let list = document.querySelector(".list");
let button = document.querySelector(".create");
let save = document.querySelector(".save");
let editBox = document.querySelector(".editBox");
let createBox = document.querySelector(".createBox");

let form = document.querySelector("form");
let inputs = document.querySelectorAll("input");

getData();

button.addEventListener("click", () => {
  addData();
});

function addData() {
  if (!name.value || !lastName.value) {
    alert("Заполните поле");
    return;
  }
  let obj = {
    name: name.value.trim(),
    lastName: lastName.value.trim(),
  };
  let data = JSON.parse(localStorage.getItem("person")) || [];
  if (data.some((el) => el.name === obj.name && el.lastName === el.lastName)) {
    alert("Такой элемент уже есть");
    return;
  }
  data.push(obj);
  localStorage.setItem("person", JSON.stringify(data));
  for (let input of inputs) {
    input.value = "";
  }
  getData();
}

function getData() {
  list.innerHTML = "";
  let newData = JSON.parse(localStorage.getItem("person")) || [];
  newData.forEach((el, index) => {
    let infoDiv = document.createElement("div");
    let btnDiv = document.createElement("div");
    let textDiv = document.createElement("div");
    let hName = document.createElement("h2");
    let hLastName = document.createElement("h2");
    let delBtn = document.createElement("button");
    let editBtn = document.createElement("button");

    infoDiv.classList.add("info");
    btnDiv.classList.add("btnDiv");
    textDiv.classList.add("textDiv");
    delBtn.classList.add("del");
    editBtn.classList.add("edit");

    delBtn.innerHTML = '<ion-icon name="trash"></ion-icon>';
    editBtn.innerHTML = '<ion-icon name="create"></ion-icon>';
    hName.innerText += `name: ${
      el.name[0].toUpperCase() + el.name.slice(1).toLowerCase()
    }`;
    hLastName.innerText += `last name: ${
      el.lastName[0].toUpperCase() + el.lastName.slice(1).toLowerCase()
    }`;

    textDiv.append(hName);
    textDiv.append(hLastName);
    btnDiv.append(delBtn);
    btnDiv.append(editBtn);
    infoDiv.append(textDiv);
    infoDiv.append(btnDiv);
    list.append(infoDiv);

    delBtn.addEventListener("click", () => {
      if (confirm("Вы уверены что хотите удалить?")) {
        removeData(index);
      } else {
        return;
      }
    });

    editBtn.addEventListener("click", () => {
      if (confirm("Вы точно хотите изменить?")) {
        editData(index);
      } else {
        return;
      }
    });
  });
}

function removeData(index) {
  let data = JSON.parse(localStorage.getItem("person")) || [];
  data.splice(index, 1);
  localStorage.setItem("person", JSON.stringify(data));
  getData();
}

function editData(id) {
  editBox.style.display = "flex";
  createBox.style.display = "none";

  let data = JSON.parse(localStorage.getItem("person")) || [];

  editName.setAttribute("id", id);
  editLastName.setAttribute("id", id);

  editName.value = data[id].name;
  editLastName.value = data[id].lastName;
}

save.addEventListener("click", () => {
  saveNewData();
});

function saveNewData() {
  let data = JSON.parse(localStorage.getItem("person")) || [];

  let nameId = editName.id;
  let lastNameId = editLastName.id;

  let newObj = {
    name: editName.value,
    lastName: editLastName.value,
  };

  data.splice(nameId, 1, newObj);
  data.splice(lastNameId, 1, newObj);

  localStorage.setItem("person", JSON.stringify(data));

  editBox.style.display = "none";
  createBox.style.display = "flex";
}
