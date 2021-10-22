import React, { useState } from 'react';

import Contacts from '../Contacts/Contacts';
import ContactDetails from '../ContactDetails/ContactDetails';
import { Grow, Container, Grid, Paper, Typography, IconButton } from '@material-ui/core';
import { IoClose } from 'react-icons/io5'
import { Link } from 'react-router-dom';
import useStyles from './styles'

const Home = (props) => {
    const { currentId, setCurrentId, handleAddContact, 
        handleEditContact, nameAvatar, results, searchQuery
    } = props;
    const classes = useStyles();

    const user = JSON.parse(localStorage.getItem('token'));

    return (
        <Grow in>
            <Container className={classes.mainContainer} maxWidth="xl">
                {user ? (
                    <Grid container spacing={0.5} justify="space-between" alignItems="stretch" className={classes.container}>
                        <Grid item xs={12} md={4} /*style={{ display: ((window.outerHeight < 960 && currentId)) ? 'none' : 'block' }}*/ className={classes.contacts}>
                            <Contacts 
                                results={results} nameAvatar={nameAvatar} searchQuery={searchQuery}
                                setCurrentId={setCurrentId} currentId={currentId}
                                handleAddContact={handleAddContact} handleEditContact={handleEditContact} 
                            />
                        </Grid>
                        {(currentId  && window.outerHeight < 960) ? (
                            <Grid item xs={12} md={8} className={currentId ? classes.details : null} style={{ paddingInline: '4px' }}>
                                {currentId ? (<IconButton className={classes.close} onClick={() => setCurrentId(null)}><IoClose /></IconButton>) : null}
                                <ContactDetails nameAvatar={nameAvatar} currentId={currentId} handleEditContact={handleEditContact} />
                            </Grid>
                        ) : null}
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
