import { Grid, TextField, Button, InputAdornment } from "@mui/material";
import Card from "./Card";
import moment from "moment";
import EuroIcon from "@mui/icons-material/Euro";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { useFormik } from "formik";
import { db } from "../db";

export default function AddRecord() {
  const formik = useFormik({
    initialValues: {
      description: "",
      amount: "",
      date: moment(),
    },
    onSubmit: async (values) => {
      db.transactions.add({
        description: values.description,
        amount: Number(values.amount),
        date: values.date.unix(),
      });
    },
    validate: (values) => {
      const errors: { [key: string]: string } = {};
      if (!values.description) {
        errors.description = "please describe your transaction";
      }
      if (!values.amount) {
        errors.amount = "please set an amount";
      }
      if (!values.date) {
        errors.date = "please define a date";
      }
      console.log(errors, values);
      return errors;
    },
  });
  return (
    <Card>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="description"
              fullWidth
              size="small"
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              error={
                formik.touched.description && Boolean(formik.errors.description)
              }
              helperText={
                formik.touched.description && formik.errors.description
              }
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EuroIcon />
                  </InputAdornment>
                ),
              }}
              label="amount"
              fullWidth
              size="small"
              name="amount"
              value={formik.values.amount}
              onChange={formik.handleChange}
              error={formik.touched.amount && Boolean(formik.errors.amount)}
              helperText={formik.touched.amount && formik.errors.amount}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <DesktopDatePicker
              label="Date desktop"
              inputFormat="MM/DD/YYYY"
              value={formik.values.date}
              onChange={(value) => {
                formik.setFieldValue("date", value);
              }}
              renderInput={(params) => (
                <TextField fullWidth size="small" {...params} name="date" />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained">
              Add Record
            </Button>
          </Grid>
        </Grid>
      </form>
    </Card>
  );
}
