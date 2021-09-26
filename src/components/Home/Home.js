import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { getContacts } from '../../actions/contacts';
import Contacts from '../Contacts/Contacts';
import ContactDetails from '../ContactDetails/ContactDetails';
import ContactForm from '../Contacts/ContactForm/ContactForm';
import { Paper, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

const Home = () => {
    const [currentId, setCurrentId] = useState(0);
    const [editContact, setEditContact] = useState(false);
    const [addContact, setAddContact] = useState(false);
    const [closeForm, setCloseForm] = useState(false);
    const dispatch = useDispatch();

    const user = JSON.parse(localStorage.getItem('token'));

    useEffect(() => {
        if(user) {
            dispatch(getContacts());
        }
    }, [user, currentId, dispatch]);

    return (
        <div>
            {user ? (
                <div>
                    <div className="container">
                        <div className="contacts">
                            <Contacts setCurrentId={setCurrentId} setAddContact={setAddContact} setCloseForm={setCloseForm} />
                        </div>
                        <div className="details">
                            {(currentId !== 0) && (
                                <ContactDetails currentId={currentId} setEditContact={setEditContact} setCloseForm={setCloseForm} />
                            )}
                        </div>
                        {((addContact || editContact) && !closeForm) && (
                            <>
                                <div className="form-overlay"></div>
                                <ContactForm currentId={currentId} setCloseForm={setCloseForm} />
                            </>
                        )}
                    </div>
                </div>
            ) : (
                <Paper>
                    <Typography variant="h6" align="center">
                        Please <Link href="/auth">Sign In</Link> to create your own contacts or see it.
                    </Typography>
                </Paper>
            ) }
        </div>
    )
}

export default Home;
