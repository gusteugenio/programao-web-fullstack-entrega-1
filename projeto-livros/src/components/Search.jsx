import {
  TextField,
  Button,
  Stack,
  InputAdornment
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

function Search({ query, setQuery, onSearch, loading }) {
  return (
    <Stack direction="row" spacing={2} mt={2}>
      <TextField
        fullWidth
        label="Nome do livro"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onSearch()}
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
        onClick={onSearch}
        disabled={loading || !query.trim()}
        startIcon={<SearchIcon />}
      >
        Buscar
      </Button>
    </Stack>
  );
}

export default Search;
