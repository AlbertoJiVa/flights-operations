import { Box, Card, Button } from "@mui/material";
import { Typography } from "@material-ui/core";
import GoogleIcon from "@mui/icons-material/Google";

const SignIn = ({ signInWithGoogle, ...props }) => {
  return (
    <Card
      sx={{
        width: 500,
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
        <Typography variant="h4">Sign in to start the demo</Typography>
        <br />
        <Button
          startIcon={<GoogleIcon />}
          color="error"
          onClick={signInWithGoogle}
          variant="contained"
        >
          Sign in with Google
        </Button>
      </Box>
    </Card>
  );
};

export default SignIn;
