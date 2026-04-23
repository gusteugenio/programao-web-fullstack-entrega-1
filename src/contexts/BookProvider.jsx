import { useState } from "react";
import { BookContext } from "./bookContext";

export function BooksProvider({ children }) {
  const [query, setQueryState] = useState("");
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [searchError, setSearchError] = useState("");
  const [loading, setLoading] = useState(false);

  const setQuery = (value) => {
    setQueryState(value);
    setSearchError("");

    if (!value.trim()) {
      setBooks([]);
      setSelectedBook(null);
    }
  };

  const searchBooks = async () => {
    setSearchError("");

    if (!query.trim()) {
      setBooks([]);
      setSelectedBook(null);
      return false;
    }

    try {
      setLoading(true);
      setSelectedBook(null);

      const response = await fetch(
        `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`
      );

      if (!response.ok) {
        throw new Error("REQUEST_ERROR");
      }

      const data = await response.json();

      if (!data.docs || data.docs.length === 0) {
        setSearchError("Nenhum livro foi encontrado para essa busca.");
        setBooks([]);
        return false;
      }

      setBooks(data.docs);
      return true;
    } catch {
      setSearchError("Nao foi possivel buscar os livros agora. Tente novamente.");
      setBooks([]);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const selectBook = (book) => {
    setSelectedBook(book);
  };

  const clearSelectedBook = () => {
    setSelectedBook(null);
  };

  return (
    <BookContext.Provider
      value={{
        query,
        setQuery,
        books,
        selectedBook,
        searchError,
        loading,
        searchBooks,
        selectBook,
        clearSelectedBook,
      }}
    >
      {children}
    </BookContext.Provider>
  );
}
