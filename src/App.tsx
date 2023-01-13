import { Container, Grid } from "@mui/material";
import AddRecord from "./Componens/AddRecord";
export default function App() {
  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <AddRecord />
        </Grid>
        <Grid item xs={12}>
          list of expenses
        </Grid>
      </Grid>
    </Container>
  );
}
