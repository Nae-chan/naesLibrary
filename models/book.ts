/**
 * Type definition for a new Book
 */

export interface NewBook {
    _id: string,
    isbn: string, 
    title: string,
    author: string, 
}

/**
 * Type definition for a new book input
 */
export interface NewBookInput {
    isbn: string, 
    title: string,
    author: string, 
}

/**
 * Type definition for a checked out Book
 */
export interface Book {
    _id: string, 
    isbn: string, 
    title: string,
    author: string, 
    rentedBy: string,
    dueDate: string
}
