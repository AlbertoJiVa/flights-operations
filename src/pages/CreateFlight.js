import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import firebase from "firebase/compat/app";
import {
  Box,
  Grid,
  TextField,
  Button,
  Card,
  CardHeader,
  CardContent,
  Divider,
} from "@mui/material";
import { Typography } from "@material-ui/core";

const defaultValues = {
  airport: "",
  reg: "",
  type: "",
  status: "",
  arrival_number: "",
  arrival_origin: "",
  arrival_eta: firebase.firestore.FieldValue.serverTimestamp(),
  arrival_sta: firebase.firestore.FieldValue.serverTimestamp(),
  arrival_ata: "",
  arrival_tob: "",
  arrival_bag: "",
  arrival_stand: "",
  departure_number: "",
  departure_destiny: "",
  departure_ctot: "",
  departure_etd: "",
  departure_std: firebase.firestore.FieldValue.serverTimestamp(),
  departure_atd: "",
  departure_tob: "",
  departure_bag: "",
  departure_stand: "",
};

const CreateFlight = ({ user, signOut, ...props }) => {
  const navigate = useNavigate();
  const db = firebase.firestore();
  const flightsRef = db.collection("flights");
  const [flight, setFlight] = useState(defaultValues);

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const handleChange = (event) => {
    setFlight((prevFlight) => {
      return { ...prevFlight, [event.target.name]: event.target.value };
    });
  };

  const handleSubmit = () => {
    flightsRef.add(flight);
    setFlight(defaultValues);
  };

  if (!user) return <Navigate to="/" />;

  return (
    <>
      <Card sx={{ background: "#d9ebfc" }}>
        <CardHeader title="Create new Flight" />
        <Divider />
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="subtitle2">Flight information</Typography>
            </Grid>
            <Grid item xs={3}>
              <TextField
                fullWidth
                onChange={handleChange}
                id="airport"
                name="airport"
                label="Airport"
                variant="outlined"
                value={flight.airport}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                fullWidth
                onChange={handleChange}
                id="status"
                name="status"
                label="Initial status"
                variant="outlined"
                value={flight.status}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                fullWidth
                onChange={handleChange}
                id="reg"
                name="reg"
                label="Reg"
                variant="outlined"
                value={flight.reg}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                fullWidth
                onChange={handleChange}
                id="type"
                name="type"
                label="A/C Type"
                variant="outlined"
                value={flight.type}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="subtitle2">Arrival information</Typography>
            </Grid>
            <Grid item xs={2}>
              <TextField
                fullWidth
                onChange={handleChange}
                id="arrival_number"
                name="arrival_number"
                label="Flight Nº"
                variant="outlined"
                value={flight.arrival_number}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                fullWidth
                onChange={handleChange}
                id="arrival_origin"
                name="arrival_origin"
                label="Orig"
                variant="outlined"
                value={flight.arrival_origin}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                fullWidth
                onChange={handleChange}
                id="arrival_tob"
                name="arrival_tob"
                label="TOB"
                variant="outlined"
                value={flight.arrival_tob}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                fullWidth
                onChange={handleChange}
                id="arrival_bag"
                name="arrival_bag"
                label="BAG"
                variant="outlined"
                value={flight.arrival_bag}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="subtitle2">Departure information</Typography>
            </Grid>
            <Grid item xs={2}>
              <TextField
                fullWidth
                onChange={handleChange}
                id="departure_number"
                name="departure_number"
                label="Flight Nº"
                variant="outlined"
                value={flight.departure_number}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                fullWidth
                onChange={handleChange}
                id="departure_destiny"
                name="departure_destiny"
                label="Dest"
                variant="outlined"
                value={flight.departure_destiny}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                fullWidth
                onChange={handleChange}
                id="departure_tob"
                name="departure_tob"
                label="TOB"
                variant="outlined"
                value={flight.departure_tob}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                fullWidth
                onChange={handleChange}
                id="departure_bag"
                name="departure_bag"
                label="BAG"
                variant="outlined"
                value={flight.departure_bag}
              />
            </Grid>
          </Grid>

          <Box sx={{ mt: 4 }}>
            <Button
              color="primary"
              sx={{ mr: 2 }}
              onClick={() => handleSubmit()}
              variant="contained"
            >
              Create flight
            </Button>
          </Box>
        </CardContent>
      </Card>

      <Box sx={{ mt: 2, display: "flex", flexDirection: "row-reverse" }}>
        <Button
          color="error"
          sx={{ mr: 2 }}
          onClick={() => handleSignOut()}
          variant="contained"
        >
          Sign Out
        </Button>
        <Button
          sx={{ mr: 2 }}
          component={RouterLink}
          to="/"
          variant="contained"
        >
          Back to Menu
        </Button>
      </Box>
    </>
  );
};

export default CreateFlight;
