import { Grid, Typography, IconButton } from "@mui/material";
import Card from "./Card";
import moment from "moment";
import DeleteIcon from "@mui/icons-material/Delete";
import { db, ITransaction } from "../db";

interface IProps {
  record: ITransaction & { id: number };
}
export default function TransactionRecord({ record }: IProps) {
  return (
    <Card>
      <Grid container spacing={2}>
        <Grid item xs={12} style={{ display: "flex", alignItems: "end" }}>
          <Typography variant="body1">{record.amount}</Typography>
          <Typography variant="body2" style={{ marginLeft: 5 }}>
            euros
          </Typography>
          <Typography variant="body2" style={{ marginLeft: "auto" }}>
            {moment(record.date * 1000).format("YYYY/MM/DD")}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1">{record.description}</Typography>
        </Grid>
        <Grid item xs={12} style={{ display: "flex", justifyContent: "end" }}>
          <IconButton
            color="error"
            onClick={() => {
              db.transactions.delete(record.id);
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Card>
  );
}
