import { Card, CardContent, Typography, Grid } from "@mui/material";

function BookList({ books }) {
  return (
    <Grid container spacing={2} style={{ marginTop: 20 }}>
      {books.slice(0, 10).map((book, index) => (
        <Grid item xs={12} key={index}>
          <Card>
            <CardContent>
              <Typography variant="h6">
                {book.title}
              </Typography>

              <Typography color="text.secondary">
                {book.author_name?.[0] || "Autor desconhecido"}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default BookList;
