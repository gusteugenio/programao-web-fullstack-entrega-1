import { TextField, Button, Stack } from "@mui/material";

function Search({ query, setQuery, onSearch }) {
  return (
    <Stack direction="row" spacing={2}>
      <TextField
        fullWidth
        label="Nome do livro"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onSearch();
          }
        }}
      />

      <Button variant="contained" onClick={onSearch}>
        Buscar
      </Button>
    </Stack>
  );
}

export default Search;
