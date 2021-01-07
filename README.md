# Nae's Library

This is an app to manage a library's book inventory.

## Demo:
https://youtu.be/AAxAalHtxcs

## Features
### For Admin/Librarian:
* Add a book to the library.
  - Add a new copy (an existing isbn)
  - Add a new isbn
* Remove a book from the library
  - delete a copy of a book by isbn
* View a list of all overdue books

### For General Users:
* Check out a book
  - When checking out a book, a 2 week due date is assigned
  - Users cannot checkout a book if they currently have 3 checked out books.
  - Users cannot checkout a book if they are overdue on returning any book.
* Return a checked out book to the library
* View all currently checked out books for that user.

## How to run the app locally 
* Start the server
  - npm install in backend directory
  - Create a .env file in the backend and follow the envtemplate to populate it
  - npm start
  
 ***You will need permissions to access the database
* Start the ui
  - npm install in ui directory
  - Create 'ui/src/enviroment.ts' and follow the environmentTemplate to populate it
  - npm start
  
