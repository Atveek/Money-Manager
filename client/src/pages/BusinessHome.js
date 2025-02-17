import React from "react";
import TransactionAnalysis from "./TransactionAnalysis";
import ProfitGraph from "./ProfitGraph";
import { Container, Grid, Paper } from "@mui/material";

export default function BusinessHome() {
  return (
    <Container className="m-0 p-0">
      <Grid container spacing={6}>
        <Grid item xs={12} sm={6}>
          <Paper
            elevation={3}
            style={{ padding: "16px", height: "400px", width: "615px" }}
          >
            <div style={{ height: "100%" }}>
              <TransactionAnalysis />
            </div>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper elevation={3} style={{ padding: "16px", height: "550px" }}>
            <div style={{ height: "100%" }}>
              <ProfitGraph />
            </div>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
