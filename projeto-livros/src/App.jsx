import { useState } from "react";
import Search from "./components/Search";
import BookList from "./components/BookList";
import { Container, Paper, Typography, CircularProgress } from "@mui/material";

function App() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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

      if (!response.ok) {
        throw new Error("Erro ao buscar dados da API.");
      }

      const data = await response.json();

      if (!data.docs || data.docs.length === 0) {
        setError("Nenhum livro encontrado.");
        setBooks([]);
      } else {
        setBooks(data.docs);
      }
    } catch (err) {
      setError("Erro na requisição. Tente novamente.");
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" style={{ marginTop: 40 }}>
      <Paper elevation={3} style={{ padding: 30 }}>
        <Typography variant="h4" gutterBottom>
          📚 Busca de Livros
        </Typography>

        <Search
          query={query}
          setQuery={setQuery}
          onSearch={buscarLivros}
        />

        {error && (
          <Typography color="error" style={{ marginTop: 10 }}>
            {error}
          </Typography>
        )}

        {loading && (
          <div style={{ marginTop: 20 }}>
            <CircularProgress />
          </div>
        )}

        {!loading && <BookList books={books} />}
      </Paper>
    </Container>
  );
}

export default App;
