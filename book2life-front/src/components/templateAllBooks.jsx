import React, { useEffect } from "react";
import { loadBooksByCat } from '../api/book';
import { useSelector, useDispatch } from 'react-redux';
import { selectBooks, loadBooks } from '../slices/bookSlice';
import SectionBooks from "../components/sectionBooks";

// Toutes les BDs par catégorie 
const TemplateAllBooks = (props) => {
    const dispatch = useDispatch();
    const books = useSelector(selectBooks);

    useEffect(() => {
        // Chargement des livres par catégorie, une seule fois lors du montage initial
        displayBooks();
    }, []); // Tableau vide pour exécuter l'effet uniquement une fois après le montage initial

    // Chargement des livres par catégorie
    const displayBooks = () => {
        loadBooksByCat(props.id_categorie)
            .then((res) => {
                dispatch(loadBooks(res.books));
            })
            .catch(err => console.log(err));
    }

    return (
        <main>
            <section>
                <h1 className="titre_h1">{props.titre_h1}</h1>
                <div className="lastBooks">
                    {/* On affiche la liste des livres */}
                    {books.books.length > 0 ? (
                        <div className="booksCard">
                            {books.books.map((oneBook) => (
                                <SectionBooks
                                    key={oneBook.id_book}
                                    books={oneBook}
                                />
                            ))}
                        </div>
                    ) : (
                        <p>{props.noBooks}</p>
                    )}
                </div>
            </section>
        </main>
    );
}

export default TemplateAllBooks;