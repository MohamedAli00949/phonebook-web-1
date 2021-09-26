import React, { useEffect } from 'react';
import useStyles from './styles';
import { useSelector, useDispatch } from 'react-redux';
import { MdAdd } from 'react-icons/md';
import { Typography, Button } from "@material-ui/core";

import { getTypes } from '../../actions/phones';
import Contact from './Contact/Contact';

const Contacts = (props) => {
    const classes = useStyles();

    const dispatch = useDispatch();

    const { setCurrentId, setAddContact, setCloseForm } = props;

    const { contacts } = useSelector((state) => state.contacts);

    const addContact = () => {
        setCurrentId(0); 
        setAddContact(true)
        setCloseForm(false);
    };

    useEffect(() => {
        dispatch(getTypes());
    }, [dispatch]);

    if (!contacts?.length) {
        return (
            <div className={classes.noContacts}>
                <Typography>No one has been added to your contacts yet.</Typography>
                <Button variant="contained" color="primary" size="large" fullWidth onClick={addContact}><MdAdd />&nbsp;Add Contact</Button>
            </div>
        )
    }

    return (
        <ul>
            {contacts.map((contact) => (
                <Contact contact={contact} setCurrentId={setCurrentId} key={contact.id} />
            ))}
            <li className="contact">
                <Button variant="contained" color="primary" size="large" fullWidth onClick={addContact}><MdAdd />&nbsp;Add Contact</Button>
            </li>
        </ul>
    )
}

export default Contacts;
