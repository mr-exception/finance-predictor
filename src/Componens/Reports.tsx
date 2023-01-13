import { Grid, Typography } from "@mui/material";
import Card from "./Card";
import { ITransaction } from "../db";

function now() {
  return Math.floor(Date.now() / 1000);
}
interface IProps {
  transactions: ITransaction[];
}
export default function Reports({ transactions }: IProps) {
  let last7days = 0;
  let last30days = 0;
  let last90days = 0;
  for (let i = 0; i < transactions.length; i++) {
    const date = transactions[i].date;
    const amount = transactions[i].amount;
    if (date > now() - 24 * 3600 * 7) {
      last7days += amount;
    }
    if (date > now() - 24 * 3600 * 30) {
      last30days += amount;
    }
    if (date > now() - 24 * 3600 * 90) {
      last90days += amount;
    }
  }
  let avg7 = Number(last7days / 7).toFixed(2);
  let avg30 = Number(last30days / 30).toFixed(2);
  let avg90 = Number(last90days / 90).toFixed(2);
  return (
    <Card>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="body1">
            Last 7 days: {last7days} euros ({avg7} euros avrage per day)
          </Typography>
          <Typography variant="body1">
            Last 30 days: {last30days} euros ({avg30} euros avrage per day)
          </Typography>
          <Typography variant="body1">
            Last 90 days: {last90days} euros ({avg90} euros avrage per day)
          </Typography>
        </Grid>
      </Grid>
    </Card>
  );
}
