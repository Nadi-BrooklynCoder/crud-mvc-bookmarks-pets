const express = require('express')
// Create an instance of our express Router that our server can use to route appropriately
const bookmarks = express.Router()

// Import the bookmarks model
const bookmarksArray = require('../models/bookmark')

const { checkForNameKey, checkForDotCom } = require('../validations/bookmarkValidations'); 

// Index Routes: gets all of the bookmarks
// localhost:4001/bookmarks/
bookmarks.get('/', (req, res) => {
    res.json(bookmarksArray)
});

//SHOW ROUTE: get single item
bookmarks.get('/:arrayIndex', (req, res) => {
    const { arrayIndex } = req.params;
    if(bookmarksArray[arrayIndex]){
    res.status(200).json(bookmarksArray[arrayIndex])
    } else {
        res.status(404).json({ error: "Not Found" })
    }
})

//POST ROUTE: create new item and gets added to array
bookmarks.post('/', checkForNameKey, checkForDotCom,  (req , res) => {
    bookmarksArray.push(req.body);
    res.json(bookmarksArray[bookmarksArray.length - 1]);
});

//DELETE ROUTE: delete a single item
bookmarks.delete('/:arrayIndex', (req , res) => {
    const { arrayIndex } = req.params;
    if(bookmarksArray[arrayIndex]){
        const deletedBookmark = bookmarksArray.splice(arrayIndex, 1);
        res.json(deletedBookmark[0])
    } else {
        res.json({ error: "Bookmark not Found"})
    }
});

//UPDATE ROUTE: update a property for an item
 bookmarks.put('/:arrayIndex', (req, res) => {
    const { arrayIndex } = req.params;
    bookmarksArray[arrayIndex] = req.body;
    res.status(200).json(bookmarksArray[arrayIndex]);
 })





module.exports = bookmarks