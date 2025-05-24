const API_URL = 'http://localhost:5000/api/students';

const form = document.getElementById('studentForm');
const nameInput = document.getElementById('name');
const rollNoInput = document.getElementById('rollNo');
const emailInput = document.getElementById('email');
const tableBody = document.querySelector('#studentTable tbody');

let editId = null;

// Fetch and display students
async function loadStudents() {
  const res = await fetch(API_URL);
  const students = await res.json();
  tableBody.innerHTML = '';
  students.forEach(student => {
    const row = `
      <tr>
        <td>${student.name}</td>
        <td>${student.rollNo}</td>
        <td>${student.email}</td>
        <td>
          <button onclick="editStudent('${student._id}', '${student.name}', '${student.rollNo}', '${student.email}')">Edit</button>
          <button onclick="deleteStudent('${student._id}')">Delete</button>
        </td>
      </tr>
    `;
    tableBody.innerHTML += row;
  });
}

// Add or Update Student
form.addEventListener('submit', async e => {
  e.preventDefault();
  const student = {
    name: nameInput.value,
    rollNo: rollNoInput.value,
    email: emailInput.value,
  };

  if (editId) {
    await fetch(`${API_URL}/${editId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(student),
    });
    editId = null;
  } else {
    await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(student),
    });
  }

  form.reset();
  loadStudents();
});

// Delete
async function deleteStudent(id) {
  await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  loadStudents();
}

// Edit
function editStudent(id, name, rollNo, email) {
  nameInput.value = name;
  rollNoInput.value = rollNo;
  emailInput.value = email;
  editId = id;
}

loadStudents();
