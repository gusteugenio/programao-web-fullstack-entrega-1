import {
  Typography,
  Button,
  Paper,
  Box
} from "@mui/material";

function BookDetail({ book, onBack }) {
  return (
    <Paper sx={{ p: 3, mt: 3 }}>
      <Button variant="contained" onClick={onBack}>
        Voltar
      </Button>

      <Box mt={2}>
        <Typography variant="h5">
          {book.title}
        </Typography>

        <Typography>
          <strong>Autor:</strong>{" "}
          {book.author_name?.[0] || "Desconhecido"}
        </Typography>

        <Typography>
          <strong>Ano:</strong>{" "}
          {book.first_publish_year || "N/A"}
        </Typography>

        <Typography>
          <strong>Edições:</strong>{" "}
          {book.edition_count || 0}
        </Typography>

        <Typography>
          <strong>ID:</strong> {book.key}
        </Typography>
      </Box>
    </Paper>
  );
}

export default BookDetail;
