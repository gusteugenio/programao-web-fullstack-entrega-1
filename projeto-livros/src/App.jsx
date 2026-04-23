import { useState, useEffect } from "react";
import Search from "./components/Search";
import BookList from "./components/BookList";
import BookDetail from "./components/BookDetail";

import {
  Container,
  Paper,
  Typography,
  CircularProgress,
  Box
} from "@mui/material";

import MenuBookIcon from "@mui/icons-material/MenuBook";

function App() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setBooks([]);
      setError("");
    }
  }, [query]);

  const buscarLivros = async () => {
    setError("");

    if (!query.trim()) {
      setError("Digite o nome de um livro.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `https://openlibrary.org/search.json?q=${query}`
      );

      if (!response.ok) throw new Error();

      const data = await response.json();

      if (!data.docs || data.docs.length === 0) {
        setError("Nenhum livro encontrado.");
        setBooks([]);
      } else {
        setBooks(data.docs);
      }
    } catch {
      setError("Erro na requisição.");
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Paper elevation={4} sx={{ p: 4 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            mb: 2
          }}
        >
          <MenuBookIcon fontSize="large" />
          <Typography variant="h4" component="span">
            Busca de Livros
          </Typography>
        </Box>

        {!selectedBook && (
          <Search
            query={query}
            setQuery={setQuery}
            onSearch={buscarLivros}
            loading={loading}
          />
        )}

        {error && (
          <Typography color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}

        {loading && (
          <Box mt={2}>
            <CircularProgress />
          </Box>
        )}

        {!loading && !selectedBook && (
          <BookList
            books={books}
            onSelect={setSelectedBook}
          />
        )}

        {selectedBook && (
          <BookDetail
            book={selectedBook}
            onBack={() => setSelectedBook(null)}
          />
        )}
      </Paper>
    </Container>
  );
}

export default App;
