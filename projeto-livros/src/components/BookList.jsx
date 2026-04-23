import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from "@mui/material";
import { useMemo } from "react";

function BookList({ books, onSelect }) {
  const limitedBooks = useMemo(() => {
    return books.slice(0, 10);
  }, [books]);

  return (
    <TableContainer component={Paper} sx={{ mt: 3 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><strong>Título</strong></TableCell>
            <TableCell><strong>Autor</strong></TableCell>
            <TableCell><strong>Ano</strong></TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {limitedBooks.map((book, index) => (
            <TableRow
              key={index}
              hover
              sx={{ cursor: "pointer" }}
              onClick={() => onSelect(book)}
            >
              <TableCell>{book.title}</TableCell>
              <TableCell>
                {book.author_name?.[0] || "Desconhecido"}
              </TableCell>
              <TableCell>
                {book.first_publish_year || "N/A"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default BookList;
