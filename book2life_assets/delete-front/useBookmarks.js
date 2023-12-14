import React, {useState, useEffect} from "react"

//hook qui permet de gérer des favoris. On veut pouvoir ajouter, supprimer un favori, consulter la liste des favoris, et savoir si un utilisateur est en favori ou non.
const UseBookmarks = (props) =>{
  const token = window.localStorage.getItem('book2life-token')
    const [bookmarks, setBookmarks] = useState(() => {
      const ls = localStorage.getItem(`bookmarks${token}`);
      if (ls) return JSON.parse(ls);
      else return [];
    });
  
    const toggleItemInLocalStorage = (id_book) => () => {
      const isBookmarked = bookmarks.includes(id_book);
      if (isBookmarked) setBookmarks((prev) => prev.filter((b) => b !== id_book));
      else setBookmarks((prev) => [...prev, id_book]);
    };
  
    useEffect(() => {
      localStorage.setItem(`bookmarks${token}`, JSON.stringify(bookmarks));
    }, [bookmarks]);
  
    return [bookmarks, toggleItemInLocalStorage];
}

export default UseBookmarks

