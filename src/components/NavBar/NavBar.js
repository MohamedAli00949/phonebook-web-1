import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import { LOGOUT } from '../../actions/auth';

import useStyles from './styles';

function NavBar() {
    const classes = useStyles();
    const dispatch= useDispatch();
    const history = useHistory();

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('token')));

    const logout = async () => {
        dispatch({ type: LOGOUT });

        history.push('/');

        setUser(null);
    };

    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
            <div className={classes.brandContainer} >
                <Typography component={Link} to="/" className={classes.heading}>Phonebook</Typography>
            </div>
            <Toolbar className={classes.toolbar}>
                {user ? (
                    <>
                        <Button varient="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
                    </>
                    ) : (
                    <Button varient="contained" component={Link} to="/auth" className={classes.signin} variant="contained" color="primary">Login</Button>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default NavBar
