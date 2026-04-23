import Search from "./components/Search";
import BookList from "./components/BookList";
import BookDetail from "./components/BookDetail";
import { useBooks } from "./contexts/useBooks";

import {
  Container,
  Paper,
  Typography,
  CircularProgress,
  Box
} from "@mui/material";

import MenuBookIcon from "@mui/icons-material/MenuBook";

function App() {
  const { selectedBook, error, loading } = useBooks();

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
          <Search />
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
          <BookList />
        )}

        {selectedBook && (
          <BookDetail />
        )}
      </Paper>
    </Container>
  );
}

export default App;
