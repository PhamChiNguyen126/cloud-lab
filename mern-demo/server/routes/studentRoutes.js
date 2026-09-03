const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

// Câu 36: GET /api/students
router.get('/students', async (req, res) => {
  const students = await Student.find();
  res.json(students);
});

// Câu 37: POST /api/students
router.post('/students', async (req, res) => {
  const newStudent = await Student.create(req.body);
  res.status(201).json(newStudent);
});

// Câu 38: PUT /api/students/:id
router.put('/students/:id', async (req, res) => {
  const updatedStudent = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedStudent);
});

// Câu 39: DELETE /api/students/:id
router.delete('/students/:id', async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  res.json({ message: 'Xóa sinh viên thành công' });
});

module.exports = router;