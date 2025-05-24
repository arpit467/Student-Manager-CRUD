const Student = require('../models/studentModel');

// GET all students
const getStudents = async (req, res) => {
  const students = await Student.find();
  res.json(students);
};

// POST a new student
const createStudent = async (req, res) => {
  const { name, rollNo, email } = req.body;
  const student = new Student({ name, rollNo, email });
  await student.save();
  res.status(201).json(student);
};

// PUT (Update) student
const updateStudent = async (req, res) => {
  const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(student);
};

// DELETE student
const deleteStudent = async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  res.json({ message: 'Student deleted' });
};

module.exports = {
  getStudents,
  createStudent,
  updateStudent,
  deleteStudent,
};
