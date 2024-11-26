// script.js
let employees = JSON.parse(localStorage.getItem("employees")) || [];
let currentPage = 1;
const itemsPerPage = 5;

function toggleMenu() {
  const navMenu = document.getElementById("nav-menu");
  navMenu.style.display = navMenu.style.display === "block" ? "none" : "block";
}

function showPage(pageId) {
  document.querySelectorAll(".page").forEach(page => page.classList.add("hidden"));
  document.getElementById(`${pageId}-page`).classList.remove("hidden");
}

function saveEmployee(event) {
  event.preventDefault();
  const name = document.getElementById("name").value;
  const position = document.getElementById("position").value;
  const about = document.getElementById("about").value;
  const joining_date = document.getElementById("joining_date").value;

  employees.push({ name, position, about, joining_date });
  localStorage.setItem("employees", JSON.stringify(employees));
  document.getElementById("employee-form").reset();
  showPage("listing");
  renderEmployees();
}

function renderEmployees() {
  const employeeTable = document.getElementById("employee-table");
  employeeTable.innerHTML = "";

  const filteredEmployees = employees.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  filteredEmployees.forEach((employee, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${employee.name}</td>
      <td>${employee.position}</td>
      <td>${employee.about}</td>
      <td>${employee.joining_date}</td>
      <td><button onclick="deleteEmployee(${index})">Delete</button></td>
    `;
    employeeTable.appendChild(row);
  });

  renderPagination();
}

function renderPagination() {
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = "";

  const totalPages = Math.ceil(employees.length / itemsPerPage);
  for (let i = 1; i <= totalPages; i++) {
    const button = document.createElement("button");
    button.textContent = i;
    button.onclick = () => {
      currentPage = i;
      renderEmployees();
    };
    if (i === currentPage) button.disabled = true;
    pagination.appendChild(button);
  }
}

function deleteEmployee(index) {
  const absoluteIndex = (currentPage - 1) * itemsPerPage + index;
  employees.splice(absoluteIndex, 1);
  localStorage.setItem("employees", JSON.stringify(employees));
  renderEmployees();
}

function searchEmployees() {
  const query = document.getElementById("search-bar").value.toLowerCase();
  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(query)
  );

  const employeeTable = document.getElementById("employee-table");
  employeeTable.innerHTML = "";

  filteredEmployees.forEach((employee, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${employee.name}</td>
      <td>${employee.position}</td>
      <td>${employee.about}</td>
      <td>${employee.joining_date}</td>
      <td><button onclick="deleteEmployee(${index})">Delete</button></td>
    `;
    employeeTable.appendChild(row);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  showPage("registration");
  renderEmployees();
});
