import {
  Stack,
  Box,
  Slide,
  Snackbar,
  SnackbarContent,
  Button,
  Typography,
} from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

function TransitionUp(props) {
  return (
    <Slide {...props} direction="left" timeout={{ enter: 500, exit: 500 }} />
  );
}

export default function NewFlightModal({
  newFlihgt,
  open,
  handleClose,
  ...props
}) {
  let sta = newFlihgt.length
    ? new Date(newFlihgt.arrival_sta.seconds * 1000)
    : new Date();

  const message = (
    <Box>
      <Box sx={{ mb: 2, display: "flex", justifyContent: "center" }}>
        <ErrorOutlineIcon fontSize="large" sx={{ color: "#efa53e" }} />
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Typography color="black" variant="h4" align="justify">
          New Flight Detected
        </Typography>
      </Box>
      <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
        <Typography color="black" variant="body2" align="justify">
          {newFlihgt.arrival_number +
            " / " +
            newFlihgt.arrival_origin +
            "-" +
            newFlihgt.airport +
            " / " +
            "STA " +
            sta.getHours() +
            ":" +
            sta.getMinutes()}
        </Typography>
      </Box>
      <Box sx={{ mt: 4, display: "flex", flexDirection: "row-reverse" }}>
        <Button variant="contained" onClick={() => handleClose()}>
          Ok
        </Button>
      </Box>
    </Box>
  );

  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      TransitionComponent={TransitionUp}
      open={open}
      message={message}
    >
      <Stack spacing={2} sx={{ mt: 10, maxWidth: 500 }}>
        <SnackbarContent
          sx={{ p: 3, background: "#f3f3f4" }}
          message={message}
        />
      </Stack>
    </Snackbar>
  );
}
