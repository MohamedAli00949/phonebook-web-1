import React, { useEffect } from 'react';
import useStyles from './styles';
import { useSelector, useDispatch } from 'react-redux';
import { MdAdd } from 'react-icons/md';
import { Typography, Button, Grid, Paper, CircularProgress } from "@material-ui/core";

import { getTypes } from '../../actions/phones';
import Contact from './Contact/Contact';

const Contacts = (props) => {
    const { currentId, setCurrentId, handleAddContact, nameAvatar, handleEditContact } = props;
    const dispatch = useDispatch();
    const classes = useStyles();

    const { contacts, isLoading } = useSelector((state) => state.contacts);

    useEffect(() => {
        dispatch(getTypes());
    }, [dispatch]);

    if (!contacts?.length && !isLoading) {
        return (
            <div className={classes.noContacts}>
                <Typography>No one has been added to your contacts yet.</Typography>
                <Button variant="contained" color="primary" size="large" fullWidth onClick={handleAddContact}><MdAdd />&nbsp;Add Contact</Button>
            </div>
        )
    }

    return (
        isLoading ? (
            <Paper elevation={6} className={classes.loadingPaper}>
                <CircularProgress size="7em" />
            </Paper>
        ) : (
            <Grid container direction="column-reverse" justifyContent="center" alignItems="stretch">
                {contacts.map((contact) => (
                    <Grid item key={contact.id} xs={12} md={11}>
                        <Contact nameAvatar={nameAvatar} contact={contact} setCurrentId={setCurrentId} key={contact.id} currentId={currentId} handleEditContact={handleEditContact} />
                    </Grid>
                ))}
                <Grid item xs={12} sm={12} md={11} className="contact">
                    <Button variant="contained" color="primary" fullWidth onClick={handleAddContact}><MdAdd />&nbsp;Add Contact</Button>
                </Grid>
            </Grid>
        )
    )
}

export default Contacts;
