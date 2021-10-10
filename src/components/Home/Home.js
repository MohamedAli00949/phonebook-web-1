import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { getContacts } from '../../actions/contacts';
import { getTypes } from '../../actions/phones';
import Contacts from '../Contacts/Contacts';
import ContactDetails from '../ContactDetails/ContactDetails';
import { Grow, Container, Grid, Paper, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import useStyles from './styles'

const Home = (props) => {
    const { currentId, setCurrentId, 
        handleAddContact, handleEditContact, nameAvatar, results
    } = props;
    // const [isLoading, setIsloading] = useState(false);
    const dispatch = useDispatch();
    const classes = useStyles();

    const user = JSON.parse(localStorage.getItem('token'));

    useEffect(() => {
        if(user) {
            dispatch(getContacts());
            dispatch(getTypes());
        }
    }, [user, dispatch]);

    return (
        <Grow in>
            <Container className={classes.mainContainer} maxWidth="xl">
                {user ? (
                        <Grid container spacing={0.5} justify="space-between" alignItems="stretch" className={classes.container}>
                            <Grid item xs={12} md={4}>
                                <Contacts results={results} nameAvatar={nameAvatar} setCurrentId={setCurrentId} currentId={currentId} handleAddContact={handleAddContact} handleEditContact={handleEditContact} />
                            </Grid>
                            <Grid item xs={12} md={8} className="details">
                                <ContactDetails nameAvatar={nameAvatar} currentId={currentId} handleEditContact={handleEditContact} />
                            </Grid>
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
