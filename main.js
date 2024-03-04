    // class for add book

class Book {
    constructor(title , isbn , auther){
        this.title = title
        this.isbn = isbn
        this.auther = auther
    }
}

    //  class for UI

class UI {

    static displayBook(){

        const books = Store.getBook
        books.forEach((book)=>UI.addBookList(book))
    }
    static addBookList(book){
        const list = document.querySelector("#book-list")
        const row = document.createElement("tr")
        row.innerHTML=`
        <td>${book.title}</td>
        <td>${book.isbn}</td>
        <td>${book.auther}</td>
        <td><a href="#" class="btn btn-danger sm delete">x</a></td>
        `
        list.appendChild(row)
    }

    

    static deleteBook(el){
        if(el.classList.contains("delete")){
            el.parentElement.parentElement.remove()
        }

    }

    static showAlert(message, className){
        const div = document.createElement("div")
        div.className = `alert alert-${className}`
        div.appendChild(document.createTextNode(message))
        const container = document.querySelector(".container")
        const form = document.querySelector("#book-form")
        container.insertBefore(div , form)
        setTimeout(()=> document.querySelector(".alert").remove(), 2000)
    }
        
    static clearValue(){
    
        document.querySelector("#title").value = ""
        document.querySelector("#isbn").value = ""
        document.querySelector("#auther").value = ""

    }
}    

//    class for storage

class Store{
    static getBook(){
        let books;
        if(localStorage.getItem("books")===null){
            books=[]
        }
        else{
            books=JSON.parse(localStorage.getItem("book"))
        }
        return books
    }

    static addBook(book){
        const books =Store.getBook()
        books.push(book)
        localStorage.setItem("books", JSON.stringify(books))

    }

    static removeBook(isbn){
        const books = Store.getBook()
        books.forEach((book , index)=>{
            if(book.isbn===isbn){
                books.splice(index , 1)
            }
        })
        localStorage.setItem("books" , JSON.stringify(books))

    }
}

//    event display book


document.addEventListener("DOMContentLoaded" , UI.displayBook)

//    event add book

document.querySelector("#book-form").addEventListener("submit", (e)=>{


    const title = document.querySelector("#title").value
    const isbn = document.querySelector("#isbn").value
    const auther = document.querySelector("#auther").value

    if(title === "" || isbn === "" || auther === ""){
    UI.showAlert("please complete field","danger")
    }
    else{const addBook = new Book(title ,isbn, auther )
        UI.addBookList(addBook)

        Store.addBook(addBook)
        UI.clearValue()
    }

    


    
})  

//   event remove book


document.querySelector("#book-list").addEventListener("click", (e)=>{
    UI.deleteBook(e.target)
})