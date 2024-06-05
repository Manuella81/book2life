import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  books: [],
  selectedBookId: null, // ID du livre sélectionné
  selectedBookTitle: null // Titre du livre sélectionné
};

export const bookSlice = createSlice({
    name: "books",
    initialState,
    reducers: {
        loadBooks: (state, action) =>{
            state.books = action.payload;
        },
        selectBook: (state, action) => {
            state.selectedBookId = action.payload.id_book;
            state.selectedBookTitle = action.payload.title; // Stocker le titre du livre sélectionné
        }
    }
});

export const { loadBooks, selectBook } = bookSlice.actions;

export const selectBooks = (state) => state.books;
export const selectedBookId = (state) => state.books.selectedBookId;
export const selectedBookTitle = (state) => state.books.selectedBookTitle; // Sélecteur pour récupérer le titre du livre sélectionné

export default bookSlice.reducer;
