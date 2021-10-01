import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { getContacts } from '../../actions/contacts';
import Contacts from '../Contacts/Contacts';
import ContactDetails from '../ContactDetails/ContactDetails';
import ContactForm from '../Contacts/ContactForm/ContactForm';
import { Grow, Container, Grid, Paper, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import useStyles from './styles'

const Home = (props) => {
    const { currentId, setCurrentId, 
        handleAddContact, handleEditContact, setCloseForm, 
        closeForm, addContact, editContact, nameAvatar
    } = props;
    const [isLoading, setIsloading] = useState(false);
    const dispatch = useDispatch();
    const classes = useStyles();

    const user = JSON.parse(localStorage.getItem('token'));

    useEffect(() => {
        if(user) {
            dispatch(getContacts());
        }
    }, [user, currentId, dispatch]);

    const randomAvatarColor = Math.floor(Math.random() * 16777215).toString(16);

    return (
        <Grow in>
            <Container className={classes.mainContainer} maxWidth="xl">
                {user ? (
                        <Grid container spacing={0.5} justify="space-between" alignItems="stretch" className={classes.container}>
                            <Grid item xs={12} md={4}>
                                <Contacts setIsloading={setIsloading} nameAvatar={nameAvatar} setCurrentId={setCurrentId} currentId={currentId} handleAddContact={handleAddContact} handleEditContact={handleEditContact} />
                            </Grid>
                            <Grid item xs={12} md={8} className="details">
                                {(currentId !== 0) && (
                                    <ContactDetails isLoading={isLoading} nameAvatar={nameAvatar} currentId={currentId} handleEditContact={handleEditContact} />
                                )}
                            </Grid>
                            {((addContact || editContact) && !closeForm) && (
                                <>
                                    <div className="form-overlay"></div>
                                    <ContactForm avatar={randomAvatarColor} currentId={currentId} setCloseForm={setCloseForm} />
                                </>
                            )}
                        </Grid>
                ) : (
                    <Paper elevation={6} className='no-contacts'>
                        <Typography variant="h6" align="center">
                            Please <Link to="/auth">Sign In</Link> to create your own contacts or see it.
                        </Typography>
                    </Paper>
                ) }
            </Container>
        </Grow>
    )
}

export default Home;
