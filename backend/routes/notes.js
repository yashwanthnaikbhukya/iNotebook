const express = require('express');
const router = express.Router();
var fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note');
const {body, validationResult} = require('express-validator');

// ROUTE 1: Get all Notes using GET "api/auth/getuser"
router.get('/fetchallnotes', fetchuser, async (req, res)=>{
    // Fetch all notes of the user
    try {
        const notes = await Note.find({user: req.user.id});
        res.json(notes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
})

// ROUTE 2: Add new notes using POST "api/auth/addnote"
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid ttile').isLength({ min: 3 }),
    body('description', 'Decription must be atleast 5 characters').isLength({ min: 5 })
], async (req, res)=>{

    try {
        const {title, description, tag} = req.body;
        //validating inputs
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array() });
        }
        const note = new Note({
            title, description, tag, user: req.user.id
        })
        const savedNote = await note.save();
    
        res.json(savedNote);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
})

// ROUTE 3: Update existing note PUT "api/auth/updatenote"
router.put('/updatenote/:id', fetchuser, async (req, res)=>{

    try {
        const {title, description, tag} = req.body;
        //create new notw object
        const newNote = {};
        if(title){newNote.title = title};
        if(description){newNote.description = description};
        if(tag){newNote.tag = tag};
    
        //find note to be updated and update it
        let note = await Note.findById(req.params.id);
        if(!note){
            return res.status(404).json({ error: 'Not found' });
        }
        if(note.user.toString() !== req.user.id){
            return res.status(401).json({ error: 'Not allowed' });
        }
    
        note = await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true});
        res.json({note});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
    
})

// ROUTE 4: Delete existing note DELETE "api/auth/deletenote"
router.delete('/deletenote/:id', fetchuser, async (req, res)=>{

    try {
        //find note to be updated and delete it
        let note = await Note.findById(req.params.id);
        if(!note){
            return res.status(404).json({ error: 'Not found' });
        }
        if(note.user.toString() !== req.user.id){
            return res.status(401).json({ error: 'Not allowed' });
        }

        note = await Note.findByIdAndDelete(req.params.id);
        res.json({"Success" : "Note has been deleted"});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
    
})

module.exports = router