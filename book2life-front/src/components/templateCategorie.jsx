import React, { useState, useEffect } from 'react';
import { loadBooksByCat, loadBooksByLocationAndCat, loadLastFreeBooksByCat } from '../api/book';
import SectionBooks from "../components/sectionBooks";
import Slider from "../components/slider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

// Page catégorie 
const TemplateCategorie = (props) => {
    
    const [books, setBooks] = useState([]);
    const [booksLocation, setBooksLocation] = useState([]);
    const [freeBooks, setFreeBooks] = useState([]);
    const [location, setLocation] = useState("");

    useEffect(() => {
        // Appel des fonctions une seule fois après le montage initial
        displayBooks();
        displayFreeBooks();
    }, []); // Tableau vide en tant que dépendance

    // Récupération des livres de la catégorie
    const displayBooks = () => {
        loadBooksByCat(props.id_categorie)
            .then((res) => {
                // Mise à jour de l'état avec les livres récupérés
                setBooks(res.books);
            })
            .catch(err => console.log(err));
    }

    // Récupération des livres dans l'API en fonction de la recherche par lieu et catégorie
    const searchByLocation = () => {
        loadBooksByLocationAndCat(location, props.id_categorie)
            .then((res) => {
                // Mise à jour de l'état avec les livres récupérés par localisation
                setBooksLocation(res.result);
            })
            .catch(err => console.log(err));
    }

    // Récupération des livres gratuits
    const displayFreeBooks = () => {
        loadLastFreeBooksByCat(props.id_categorie)
            .then((res) => {
                // Mise à jour de l'état avec les livres gratuits récupérés
                setFreeBooks(res.books);
            })
            .catch(err => console.log(err));
    }

    return (
        <main id='jeunesse'>

            <p>{props.accueil}</p>

            <h1 className="titre_h1">{props.titre_h1}</h1>

            {/* Rubrique par catégorie */}
            <section className='bloc bdGraphiques'>
                <h2 className="titre_h2">{props.titre_h2}</h2>
                {books.length > 0 && (
                    <div>
                        <Slider
                            books={books}
                        />
                    </div>
                )}

                <p className="all">{props.all}</p>
            </section>

            <div className="trait"></div>

            {/* Rubrique BDs autour de moi */}
            <section>
                <div className='bloc bdAroundMe'>
                    <h2 className="titre_h2">{props.aroundMe}</h2>
                    {/* Recherche par lieu */}
                    <div className="search">
                        <form
                            className="form1"
                            onSubmit={(e) => {
                                e.preventDefault();
                                searchByLocation();
                            }}
                        >
                            <input
                                type="text"
                                name="location"
                                id="location"
                                placeholder="Entrez une ville, un CP ..."
                                onChange={(e) => {
                                    setLocation(e.currentTarget.value);
                                }}
                            />

                            <button
                                type="submit"
                            >
                                <FontAwesomeIcon icon={faMagnifyingGlass} />
                            </button>
                        </form>
                    </div>
                </div>

                {/* Affichage de la liste des livres récupérés grâce à la localisation */}
                {booksLocation.length > 0 && <h2 className="titre_h2">Liste des livres</h2>}
                {booksLocation.length > 0 && (
                    <div className="booksCard">
                        {booksLocation.map((oneBook) => (
                            <SectionBooks
                                key={oneBook.id_book}
                                books={oneBook}
                            />
                        ))}
                    </div>
                )}
            </section>

            <div className="trait"></div>

            {/* Rubrique BDs gratuits */}
            <section className='freeBd'>
                <h2 className="titre_h2">{props.freeBooks}</h2>
                {freeBooks.length > 0 && (
                    <div className="booksCard">
                        {freeBooks.map((oneBook) => (
                            <SectionBooks
                                key={oneBook.id_book}
                                books={oneBook}
                            />
                        ))}
                    </div>
                )}
            </section>

        </main>
    )
}

export default TemplateCategorie;