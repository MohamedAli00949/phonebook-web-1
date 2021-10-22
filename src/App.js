import React, {useState, useEffect} from 'react';
import { Container, Paper, Typography, Button } from '@material-ui/core';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import NavBar from './components/NavBar/NavBar';
import AuthForm from './components/AuthForm/AuthForm';
import Home from './components/Home/Home';
import ContactForm from './components/Contacts/ContactForm/ContactForm';
import { useDispatch, useSelector } from 'react-redux';
import { getContacts, CONTACT_ERROR, START_LOADING, FETCH_CONTACTS, END_LOADING, deleteContact } from './actions/contacts';
import { getTypes } from './actions/phones';

const App = () => {
    const [currentId, setCurrentId] = useState(null);
    const [editContact, setEditContact] = useState(false);
    const [addContact, setAddContact] = useState(false);
    const [closeForm, setCloseForm] = useState(false);
    const [results, setResults] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [showDeleteContact, setShowDeleteContact] = useState(false);
    const { contacts } = useSelector((state) => state.contacts);
    
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('token'));
    
    useEffect(() => {
        if(contacts.length === 0 && user) {
            getContacts()
            .then((res) => {
                dispatch({ type: START_LOADING });
                dispatch({ type: FETCH_CONTACTS, data : res.contacts });
                dispatch({ type: END_LOADING });
            })
            .catch((error) => {
                console.log(error);
                dispatch({ type: CONTACT_ERROR, data: error.response?.data });
            })
            dispatch(getTypes());
        }
    }, []);

    const handleAddContact = () => {
        setCurrentId(0); 
        setAddContact(true)
        setCloseForm(false);
    };

    const handleEditContact = () => {
        setEditContact(true);
        setCloseForm(false);
    }

    
    const stringToColor = (string) => {
        let hash = 0;
        let i;
        for(i = 0; i < string?.length; i++ ) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }

        let color = '#';
        for(i = 0; i < 3; i++ ) {
            const value = (hash >> (i * 8)) & 0xff;
            color += `00${value.toString(16)}`.substr(-2);
        }
        return color;
    }

    const nameAvatar = (name) => {
        return {
            sx: {
                bgcolor: stringToColor(name),
            },
            children: `${name?.split(' ')[0][0]}`
        }
    }

    const realDeleteContact = () => {
        dispatch(deleteContact(currentId)); 
        setCurrentId(null);
    }


    return (
        <BrowserRouter>
            <Container maxWidth="lg" style={{paddingInline: '3px'}}>
                <NavBar setShowDeleteContact={setShowDeleteContact}
                    addContact={handleAddContact} nameAvatar={nameAvatar} currentId={currentId} 
                    setCurrentId={setCurrentId} searchQuery={searchQuery} setSearchQuery={setSearchQuery}
                    handleEditContact={handleEditContact} results={results} setResults={setResults}
                    />
                <Switch>
                    <Route path="/" exact component={() => <Home searchQuery={searchQuery} setShowDeleteContact={setShowDeleteContact}
                        currentId={currentId} setCurrentId={setCurrentId} nameAvatar={nameAvatar} 
                        handleAddContact={handleAddContact} handleEditContact={handleEditContact} results={results}
                        />} 
                        />
                    <Route path="/auth" exact component={AuthForm} />
                </Switch>
                {((addContact || editContact) && !closeForm) && (
                    <>
                        <div className="form-overlay"></div>
                        <ContactForm currentId={currentId} setCloseForm={setCloseForm} />
                    </>
                )}
                {(showDeleteContact && currentId) && (
                    <>
                        <div className="form-overlay"></div>
                        <Paper className="contact-form">
                            <Typography variant="h5" color="error">Are you sure you want to delete this contact ?</Typography>
                            <div className="phone-buttons">
                                <Button variant="contained" color="secondary" size="large" type="button" onClick={realDeleteContact}>Yes</Button>
                                <Button variant="contained" color="primary" size="large" type="button" onClick={() => setShowDeleteContact(false)}>No</Button>
                            </div>
                        </Paper>
                    </>
                )}
            </Container>
        </BrowserRouter>
    );
}
export default App;