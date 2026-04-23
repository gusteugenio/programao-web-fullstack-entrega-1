import {
  TextField,
  Button,
  Stack,
  InputAdornment
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useBooks } from "../contexts/useBooks";

function Search() {
  const { query, setQuery, searchBooks, loading } = useBooks();

  return (
    <Stack direction="row" spacing={2} mt={2}>
      <TextField
        fullWidth
        label="Nome do livro"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && searchBooks()}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />

      <Button
        variant="contained"
        onClick={searchBooks}
        disabled={loading || !query.trim()}
        startIcon={<SearchIcon />}
      >
        Buscar
      </Button>
    </Stack>
  );
}

export default Search;
