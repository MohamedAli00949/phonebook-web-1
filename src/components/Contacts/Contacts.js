import React, { useEffect } from 'react';
import useStyles from './styles';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { MdAdd } from 'react-icons/md';
import { Typography, Button } from "@material-ui/core";

import { getTypes } from '../../actions/phones';
import Contact from './Contact/Contact';

const Contacts = (props) => {
    const classes = useStyles();

    const dispatch = useDispatch();

    const { setCurrentId } = props;

    const { contacts } = useSelector((state) => state.contacts);
    

    useEffect(() => {
        dispatch(getTypes());
    }, [dispatch]);

    if (!contacts.length) {
        return (
            <div className={classes.noContacts}>
                <Typography>No one has been added to your contacts yet.</Typography>
                <Button component={Link} to="/newContact"><MdAdd /> Add Contact</Button>
            </div>
        )
    }
    return (
        <ul>
            {contacts.map((contact) => (
                <Contact contact={contact} setCurrentId={setCurrentId} key={contact.id} />
            )) }
        </ul>
    )
}

export default Contacts;
