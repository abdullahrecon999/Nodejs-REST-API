const express = require('express')
const router = express.Router()
const Student = require('../models/Student')

// Get All students
router.get('/', async (req, res) => {
    try {
        const students = await Student.find()
        res.json(students)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// Get one Student
router.get('/:id', getStudents, (req, res) => {
    res.json(res.student)
})

// create Student
router.post('/', async (req, res) => {
    const student = new Student({
        name: req.body.name,
        roll: req.body.roll
    })

    try {
        const newStudent = await student.save()
        res.status(201).json(newStudent)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

// Update Student
router.patch('/:id', getStudents, async (req, res) => {
    if(req.body.name != null){
        res.student.name = req.body.name
    }
    if(req.body.roll != null){
        res.student.roll = req.body.roll
    }

    try {
        const uStudent = await res.student.save()
        res.json(uStudent)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

// Delete Student
router.delete('/:id', getStudents, async (req, res) => {
    try {
        await res.student.remove()
        res.json({ message: "Deleted Student" })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

async function getStudents(req, res, next) { 
    let student
    try {
        student = await Student.findById(req.params.id)
        if(student == null){
            return res.status(404).json({ message: 'Cannot find specified Student' })
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }

    res.student = student
    next()
}

module.exports = router