import { Box, Typography } from "@mui/material";
import Home from "./pages/Home";

const App = () => {
  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
        <Typography variant="h5">
          Product Management
        </Typography>
      </Box>
      <Home />
    </Box>
  );
};

export default App;