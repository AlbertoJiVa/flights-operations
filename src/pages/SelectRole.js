import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Box, Card, Button } from "@mui/material";
import { Typography } from "@material-ui/core";

const SelectRole = ({ handleSelectRole, signOut, ...props }) => {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <Card
      sx={{
        width: 700,
        background: "#8ca4d4",
        p: 5,
        mt: 25,
        mx: "auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box>
        <Typography variant="h4">
          Welcome to Azul Handling Flights Operations
        </Typography>
        <Typography variant="body2" gutterBottom>
          Customers will be shown the upcoming arrivals and departures.
          Operators could create new flights.
        </Typography>
        <br />
        <Button
          sx={{ mr: 2 }}
          component={RouterLink}
          to="/client"
          variant="contained"
        >
          I'm client
        </Button>
        <Button
          sx={{ mr: 2 }}
          component={RouterLink}
          to="/operator"
          variant="contained"
        >
          I'm operator
        </Button>
        <Button
          color="error"
          onClick={() => handleSignOut()}
          variant="contained"
        >
          Sign Out
        </Button>
      </Box>
    </Card>
  );
};

export default SelectRole;
