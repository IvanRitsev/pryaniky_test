import { Backdrop, CircularProgress } from "@mui/material";

const Loader = () => {
  return (
    <Backdrop open={true} style={{ zIndex: 9999 }}>
      <CircularProgress size={80} color="inherit" />
    </Backdrop>
  );
};

export default Loader;
