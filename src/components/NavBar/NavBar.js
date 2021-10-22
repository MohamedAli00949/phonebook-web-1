import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppBar, Toolbar, Typography, Button, TextField, Paper, Grid } from '@material-ui/core';
import Contact from '../Contacts/Contact/Contact'
import { MdAdd, MdDelete, MdModeEdit, MdSearch, MdArrowForward } from 'react-icons/md';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { deleteContact } from "../../actions/contacts";
import { LOGOUT } from '../../actions/auth';
import decode from 'jwt-decode';

import logo from '../../phonebook.png';

import useStyles from './styles';

function NavBar(props) {
    const { addContact, currentId, setCurrentId, handleEditContact, nameAvatar, searchQuery, setSearchQuery, results, setResults } = props;
    const [openSearch, setOpenSearch] = useState(false);

    const { contacts } = useSelector(state => state.contacts);
    const classes = useStyles();
    const dispatch= useDispatch();
    const history = useHistory();
    const location = useLocation();

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('token')));

    useEffect(() => {
        if (user) {
            const decodedToken = decode(user.token);

            if(decodedToken.exp * 1000 < new Date().getTime()) return logout();
            else if (!decodedToken.exp) {
                alert('Not valid');
                localStorage.clear();
            } 
        }

        setUser(JSON.parse(localStorage.getItem('token')));
    }, [location])

    const logout = async () => {
        dispatch({ type: LOGOUT });

        history.push('/auth');

        setUser(null);
    };

    const handleChange = async (e) => {
        const value = e.target.value?.toLowerCase();
        await setSearchQuery(value);

        const searchResult = contacts.filter(contact => (contact.name?.toLowerCase().includes(value) || contact.email?.toLowerCase().includes(value) || contact.phones.find(phone => phone.value.toLowerCase().includes(value))));
        await setResults(searchResult);
    }

    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
            <Link to="/" className={classes.brandContainer} >
                <img src={logo} className={classes.logo} />
                <Typography className={classes.heading}>Phonebook</Typography>
            </Link>
            <Toolbar className={classes.toolbar}>
                {user ? (
                    <>
                        <div className={classes.searchContainer} style={{ width: openSearch && '85%' }}>
                            {openSearch ? (
                                <>
                                    <Button className={classes.searchArrow} color="primary" onClick={() => setOpenSearch(oS => !oS)} size="large" style={{fontSize: "25px"}} ><MdArrowForward /></Button>
                                    <TextField variant="filled" label="Search" fullWidth value={searchQuery} onChange={handleChange} autoFocus style={{zIndex: '100'}}/>
                                    <Paper className={classes.searchResults}>
                                        {(searchQuery.length !== 0 )? (
                                            <>
                                                <Typography style={{ color: 'blue' }}>Search About '{searchQuery}'</Typography>
                                                <Grid container direction="column-reverse" justifyContent="center" alignItems="stretch">
                                                    {results?.map((contact) => (
                                                        <Grid item key={contact?.id} xs={12} md={12} className={classes.contact}>
                                                            <Contact nameAvatar={nameAvatar} contact={contact} setCurrentId={setCurrentId} key={contact?.id} handleEditContact={handleEditContact} />
                                                        </Grid>
                                                    ))}
                                                </Grid>
                                            </>
                                        ) : (
                                            <Typography>Enter your search query</Typography>
                                            )}
                                        {(results?.length === 0 && searchQuery.length !== 0) && (
                                            <Typography>No results found</Typography>
                                        )}
                                    </Paper>
                                </>
                            ) : (
                                <Button color="primary" className={classes.searchButton} onClick={() => {setOpenSearch(oS => !oS); setCurrentId(0);}} size="large" style={{fontSize: "25px"}}><MdSearch /></Button>
                                )}
                        </div>
                        {currentId && !openSearch ? (
                            <>
                                <Button className={classes.dAEButton} size="large" color="primary" onClick={() => {dispatch(deleteContact(currentId)); setCurrentId(0)}} ><MdDelete />&nbsp; Delete</Button>
                                <Button className={classes.dAEButton} size="large" color="primary" onClick={handleEditContact}><MdModeEdit />&nbsp; Edit</Button>
                            </>
                        ) : null}
                        <Button variant="contained" className={classes.addButton} color="primary" onClick={addContact}><MdAdd />&nbsp;Create</Button>
                        <Button variant="contained" className={classes.logout} color="secondary" fullWidth onClick={logout}>Logout</Button>
                    </>
                    ) : (
                    <>
                        <Button varient="contained" component={Link} to="/auth" className={classes.signin} variant="contained" color="primary">Login</Button>
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;
