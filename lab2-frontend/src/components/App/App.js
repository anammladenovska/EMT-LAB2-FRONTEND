import './App.css';
import {Component} from "react";
import {BrowserRouter as Router, Redirect, Route} from 'react-router-dom'
import Authors from '../Authors/authors';
import Books from '../Books/BookList/books';
import Header from '../Header/header';
import BookAdd from '../Books/BookAdd/bookAdd';
import BookService from "../../repository/bookRepository";
import BookEdit from "../Books/BookEdit/bookEdit";


class App extends Component{

    constructor(props) {
        super(props);
        this.state = {
            authors: [],
            books: [],
            categories: [],
            selectedBook: {}
        }
    }

    render() {
        return (
            <Router>
                <Header/>
                <main>
                    <div className="container">
                        <Route path={"/authors"} exact render={() =>
                            <Authors authors={this.state.authors}/>}/>
                        <Route path={"/books/add"} exact render={() =>
                            <BookAdd authors={this.state.authors}
                                        onAddProduct={this.addBook}/>}/>
                        <Route path={"/books/edit/:id"} exact render={() =>
                            <BookEdit authors={this.state.authors}
                                         onEditBook={this.editBook}
                                         book={this.state.selectedBook}/>}/>
                        <Route path={"/books"} exact render={() =>
                            <Books books={this.state.books}
                                      onDelete={this.deleteBook}
                                      onEdit={this.getBook}/>}/>
                        <Redirect to={"/books"}/>
                    </div>
                </main>
            </Router>
        );
    }

    componentDidMount() {
        this.fetchData()
    }

    fetchData = () => {
        this.loadAuthors();
        this.loadBooks();
    }

    loadAuthors = () => {
        BookService.fetchAuthors()
            .then((data) => {
                this.setState({
                    authors: data.data
                })
            });
    }

    loadBooks = () => {
        BookService.fetchBooks()
            .then((data) => {
                this.setState({
                    books: data.data
                })
            });
    }

    deleteBook = (id) => {
        BookService.deleteBook(id)
            .then(() => {
                this.loadBooks();
            });
    }

    addBook = (name,  category, author, availableCopies) => {
        BookService.addBook(name,  category, author, availableCopies)
            .then(() => {
                this.loadBooks();
            });
    }

    getBook = (id) => {
        BookService.getBook(id)
            .then((data) => {
                this.setState({
                    selectedBook: data.data
                })
            })
    }

    editBook = (id, name,  category, author, availableCopies) => {
        BookService.editBook(id, name,  category, author, availableCopies)
            .then(() => {
                this.loadBooks();
            });
    }

}

export default App;
