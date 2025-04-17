import React from "react";
import TransactionAnalysis from "./TransactionAnalysis";
import ProfitGraph from "./ProfitGraph";
import { Container, Grid, Paper, Typography } from "@mui/material";
import { motion } from "framer-motion";

export default function BusinessHome() {
  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography
        variant="h4"
        component="h1"
        sx={{
          mb: 4,
          fontWeight: 600,
          color: "#2c3e50",
          textAlign: "center",
        }}
      >
        Business Analytics Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} lg={6}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Paper
              elevation={3}
              sx={{
                height: "100%",
                minHeight: "600px",
                borderRadius: "16px",
                background: "linear-gradient(145deg, #ffffff, #f8fafc)",
                transition:
                  "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 12px 28px rgba(0, 0, 0, 0.1)",
                },
                overflow: "hidden",
              }}
            >
              <TransactionAnalysis />
            </Paper>
          </motion.div>
        </Grid>
        <Grid item xs={12} lg={6}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Paper
              elevation={3}
              sx={{
                height: "100%",
                minHeight: "600px",
                borderRadius: "16px",
                background: "linear-gradient(145deg, #ffffff, #f8fafc)",
                transition:
                  "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 12px 28px rgba(0, 0, 0, 0.1)",
                },
                overflow: "hidden",
              }}
            >
              <ProfitGraph />
            </Paper>
          </motion.div>
        </Grid>
      </Grid>
    </Container>
  );
}
