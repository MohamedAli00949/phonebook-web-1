import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getContacts,
  CONTACT_ERROR,
  START_LOADING,
  FETCH_CONTACTS,
  END_LOADING,
} from "../../actions/contacts";
import { getTypes } from "../../actions/phones";

import Contacts from "../Contacts/Contacts";
import ContactDetails from "../ContactDetails/ContactDetails";
import {
  Grow,
  Container,
  Grid,
  Paper,
  Typography,
  IconButton,
  CircularProgress,
} from "@material-ui/core";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";
import useStyles from "./styles";

const Home = (props) => {
  const {
    currentId,
    setCurrentId,
    handleAddContact,
    setShowDeleteContact,
    handleEditContact,
    nameAvatar,
    searchQuery,
  } = props;
  const classes = useStyles();
  const { isLoading, contacts } = useSelector((state) => state.contacts);
  const dispatch = useDispatch();

  const user = JSON.parse(localStorage.getItem("token"));

  useEffect(() => {
    if (contacts?.length === 0 && user) {
      getContacts()
        .then((res) => {
          dispatch({ type: START_LOADING });
          dispatch({ type: FETCH_CONTACTS, data: res.contacts });
          dispatch({ type: END_LOADING });
        })
        .catch((error) => {
          console.log(error);
          dispatch({ type: CONTACT_ERROR, data: error.response?.data });
        });
      dispatch(getTypes());
    }
  }, []);

  return (
    <Grow in>
      <Container className={classes.mainContainer} maxWidth="xl">
        {user ? (
          <>
            {isLoading ? (
              <Paper elevation={6} className={classes.loadingPaper}>
                <CircularProgress size="7em" />
              </Paper>
            ) : (
              <Grid
                container
                spacing={0.5}
                justify="space-between"
                alignItems="stretch"
                className={classes.container}
              >
                <Grid
                  item
                  xs={12}
                  md={4}
                  style={{ paddingInline: "8px" }}
                  className={classes.contacts}
                >
                  <Contacts
                    nameAvatar={nameAvatar}
                    searchQuery={searchQuery}
                    setCurrentId={setCurrentId}
                    currentId={currentId}
                    setShowDeleteContact={setShowDeleteContact}
                    handleAddContact={handleAddContact}
                    handleEditContact={handleEditContact}
                  />
                </Grid>
                {currentId && window.outerHeight < 960 ? (
                  <Grid
                    item
                    xs={12}
                    md={8}
                    className={currentId ? classes.details : null}
                    style={{ paddingInline: "8px" }}
                  >
                    <IconButton
                      className={classes.close}
                      onClick={() => setCurrentId(null)}
                    >
                      <IoClose />
                    </IconButton>
                    <ContactDetails
                      nameAvatar={nameAvatar}
                      currentId={currentId}
                      handleEditContact={handleEditContact}
                    />
                  </Grid>
                ) : null}
              </Grid>
            )}
          </>
        ) : (
          <Paper elevation={6} className={classes.noContacts}>
            <Typography variant="h6" align="center">
              Please <Link to="/auth">Sign In</Link> to create your own contacts
              or see it.
            </Typography>
          </Paper>
        )}
      </Container>
    </Grow>
  );
};

export default Home;
