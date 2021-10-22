import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { MdDelete, MdModeEdit } from "react-icons/md";
import { Avatar, IconButton, Typography } from '@material-ui/core';
import useStyles from './styles';

const Contact = (props) => {
    const { contact, setCurrentId, nameAvatar, currentId, handleEditContact, setShowDeleteContact } = props;
    const dispatch = useDispatch();
    const classes = useStyles();

    const { phones } = useSelector((state) => state.phones);
    const deletedPhones = phones?.deleted_id;

    const contactPhones = contact?.phones?.filter(phone => phone.id !== deletedPhones);

    const selectedContact = (id) => {
        setCurrentId(id);
    }

    return (
        <div className={currentId === contact.id ? `${classes.activeContact} contact` : 'contact'} onClick={() => selectedContact(contact.id)}>
            <Avatar {...nameAvatar(contact?.name || contact?.email)} className={classes.avatar} />
            <div style={{width: "60%"}}>
                <Typography variant="h3" className={classes.name}>{`${contact?.name}` || `${contact?.email}`}</Typography>
                {(contactPhones) ? contactPhones[0]?.value : contact?.email}
            </div>
            <div style={{display: 'flex'}}>
                <IconButton className={`${classes.iconE} contact-icon`} onClick={handleEditContact} color="primary" ><MdModeEdit /></IconButton>
                <IconButton className={`${classes.iconD} contact-icon`} onClick={() => setShowDeleteContact(true)} color="secondary" ><MdDelete /></IconButton>
            </div>
            <div>
                
            </div>
        </div>
    )
};

export default Contact;
