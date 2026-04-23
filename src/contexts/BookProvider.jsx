import { useState } from "react";
import { BookContext } from "./bookContext";

export function BooksProvider({ children }) {
  const [query, setQueryState] = useState("");
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const setQuery = (value) => {
    setQueryState(value);

    if (!value.trim()) {
      setBooks([]);
      setError("");
      setSelectedBook(null);
    }
  };

  const searchBooks = async () => {
    setError("");

    if (!query.trim()) {
      setError("Digite o nome de um livro.");
      setBooks([]);
      return;
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
        setError("Nenhum livro encontrado.");
        setBooks([]);
        return;
      }

      setBooks(data.docs);
    } catch {
      setError("Erro na requisição.");
      setBooks([]);
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
        error,
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
