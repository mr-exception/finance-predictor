import { Container, Grid } from "@mui/material";
import { useLiveQuery } from "dexie-react-hooks";
import AddRecord from "./Componens/AddRecord";
import Reports from "./Componens/Reports";
import TransactionRecord from "./Componens/TransactionRecord";
import { db, ITransaction } from "./db";
export default function App() {
  const transactions = useLiveQuery(() => db.transactions.toArray());
  console.log(transactions);
  return (
    <Container>
      <Grid container spacing={2} style={{ marginTop: 14 }}>
        {!!transactions && (
          <Grid item xs={12}>
            <Reports transactions={transactions} />
          </Grid>
        )}
        <Grid item xs={12}>
          <AddRecord />
        </Grid>
        {!!transactions &&
          (transactions as (ITransaction & { id: number })[])
            .sort((a, b) => b.date - a.date)
            .map((record) => (
              <Grid item xs={12}>
                <TransactionRecord record={record} />
              </Grid>
            ))}
      </Grid>
    </Container>
  );
}
