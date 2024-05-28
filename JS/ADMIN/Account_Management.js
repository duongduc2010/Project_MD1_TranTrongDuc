const tbody = document.querySelector("tbody");
let usersLocal = JSON.parse(localStorage.getItem("FFusers")) || [];

// DEVICE PAGE
const pageList = document.getElementById("page-list");
let pageSize = 5;
let totalPage = 1;
let currentPage = 1;

// MOVEPAGE
function movePage(index) {
  currentPage = index;
  renderAccount();
}

// RENDER
function renderAccount(data) {
  let usersLocal = JSON.parse(localStorage.getItem("FFusers")) || [];
  if (Array.isArray(data)) {
    usersLocal = data;
  }

  totalPage = Math.ceil(usersLocal.length / pageSize);
  let page = "";
  for (let i = 1; i <= totalPage; i++) {
    if (currentPage == i) {
      page += `<span onclick="movePage(${i})" class="page-number active-page">${i}</span>`;
    } else {
      page += `<span onclick="movePage(${i})" class="page-number ">${i}</span>`;
    }
  }
  pageList.innerHTML = page;
  let start = 0;
  let end = 0;
  start = (currentPage - 1) * pageSize;
  end = pageSize * currentPage - 1;

  let trHtml = "";

  if (usersLocal.length - 1 <= end) {
    end = usersLocal.length - 1;
  }

  for (let i = start; i <= end; i++) {
    trHtml += `
    <tr>
    <td>${i + 1}</td>
                    <td>${usersLocal[i].username}</td>
                    <td>${usersLocal[i].email}</td>
                    <td>${usersLocal[i].status ? "Active" : "Block"}</td>
                    <td>20/05/2024</td>
                    <td><button onclick="changeStatus(${usersLocal[i].id})">${
      usersLocal[i].status ? "Block" : "Active"
    }</button></td>

    `;
  }
  tbody.innerHTML = trHtml;
}

renderAccount();

// SEARCH
const btnSearch = document.querySelector("#btn-search");

btnSearch.addEventListener("click", () => {
  const usersLocal = JSON.parse(localStorage.getItem("FFusers")) || [];
  const contentSearch = document
    .querySelector(".search-input")
    .value.toLowerCase();
  userFilter = usersLocal.filter((item) =>
    item.email.toLowerCase().includes(contentSearch)
  );
  renderAccount(userFilter);
});

// CHANGE ACTIVE/BLOCK

function changeStatus(id) {
  let usersLocal = JSON.parse(localStorage.getItem("FFusers")) || [];
  const index = usersLocal.findIndex((item) => item.id === id);
  usersLocal[index].status = !usersLocal[index].status;
  localStorage.setItem("FFusers", JSON.stringify(usersLocal));
  renderAccount();
}

// CHANGE PAGE
function changePage() {}

// =====================
// OPEN + CLOSE SUBACCOUNT
const settingDown = document.querySelector(".fa-chevron-down");
const subAccount = document.querySelector(".sub__menu__account");

settingDown.addEventListener("click", (e) => {
  e.stopPropagation();
  subAccount.classList.toggle("hidden");
});

subAccount.addEventListener("click", (e) => {
  e.stopPropagation();
});

window.addEventListener("click", () => {
  subAccount.classList.add("hidden");
});

// SIGN OUT
const btnCancel = document.querySelector("#btnCancel");
const btnOK = document.querySelector("#btnOK");
const signOutOverlay = document.querySelector(".signOutOverlay");
const signOut = document.querySelector("#signOut");

signOutOverlay.addEventListener("click", (e) => {
  e.stopPropagation();
});

signOut.addEventListener("click", (e) => {
  signOutOverlay.classList.toggle("hidden");
});

btnOK.addEventListener("click", () => {
  window.location.href = "../SignIn.html";
});

btnCancel.addEventListener("click", (e) => {
  signOutOverlay.classList.toggle("hidden");
});
