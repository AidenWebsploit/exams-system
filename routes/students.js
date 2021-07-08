const express = require('express');

const Students = require('../models/Students')

const router = express.Router();

//Home for Students
router.get('/students', (req, res) => {
  title = "Concordia | Students"
  Students.find({})
    .then(students => {
      res.render('stats', { title, students })
    })
    .catch(err => {
      req.flash('error_msg', 'ERROR : ' + err);
      res.redirect('/')
    })
})

//Add new student - GET
router.get('/students/new', (req, res) => {
  title = 'Concordia | New Student'
  res.render('newStudent', { title });
})

//Add new student - POST
router.post('/students/new', (req, res) => {
  const eStudent = req.body;
  Students.create(eStudent)
    .then(std => {
      req.flash('success_msg', 'Student data added to database successfully');
      res.redirect('/students');
    })
    .catch(err => {
      req.flash('error_msg', 'ERROR : ' + err);
      res.redirect('/');
    })
})

// Add new Student - GET by Id
router.get('/students/:id/view', (req, res) => {
  title = 'Concordia | Student Details'
  const searchQuery = { admission: req.params.id };
  Students.findOne(searchQuery)
    .then(std => {
      req.flash('success_msg', 'Student data fetched successfully')
      res.render('viewStudent', { title, std })
    })
    .catch(err => {
      req.flash('error_msg', 'ERROR :' + err)
      res.redirect('/')
    })
})

//Update Student - PUT


//Delete student - DELETE by Id
router.delete('/students/:id', (req, res) => {
  const searchQuery = { admission: req.params.id };
  Students.deleteOne(searchQuery)
    .then(std => {
      req.flash('success_msg', 'Student Deleted Successfully');
      res.redirect('/')
    })
    .catch(err => {
      req.flash('error_msg', 'ERROR : ' + err);
      res.redirect('/')
    })
})

router.get('/grading', (req, res)=>{
  title = "Concordia | Grading ";
  res.render('grade', { title });
})

module.exports = router;