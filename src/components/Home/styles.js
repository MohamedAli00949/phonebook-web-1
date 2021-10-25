import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  container: {
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
    },
  },
  mainContainer: {
    paddingLeft: "8px",
    paddingRight: "5px",
  },
  contacts: {
    [theme.breakpoints.up("md")]: {
      maxHeight: "610px",
      overflowY: "auto",
    },
  },
  details: {
    [theme.breakpoints.down("sm")]: {
      position: "fixed",
      width: "100%",
      left: "0",
      top: "0",
      height: "100%",
      background: "rgb(255 255 255)",
      padding: "10px",
      zIndex: "100",
    },
  },
  close: {
    background: "red",
    padding: "5px",
    position: "relative",
    left: "96%",
    display: "none",
    [theme.breakpoints.down("sm")]: {
      display: "block",
    },
    [theme.breakpoints.down("xs")]: {
      left: "92%",
    },
  },
  loadingPaper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    borderRadius: "15px",
    height: "39vh",
  },
  noContacts: {
    margin: '50px',
    padding: '20px',
    boxShadow: '0 0 10px #3e3d3d',
  }
}));
