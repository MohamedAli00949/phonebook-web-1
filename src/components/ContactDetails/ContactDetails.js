import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deletePhone } from '../../actions/phones';

import { MdContentCopy, MdDelete, MdModeEdit, MdAdd } from "react-icons/md";
import { Avatar, Button, Paper, CircularProgress } from "@material-ui/core";
import AddOrEditPhone from './AddOrEditPhone';
import useStyles from './styles'

const ContactDetails = ({ currentId, handleEditContact, nameAvatar }) => {
    const contact = useSelector((state) => (currentId ? state.contacts.contacts.find((contact) => contact.id === currentId) : null));
    const dispatch = useDispatch();
    const classes = useStyles();
    const [addPhone, setAddPhone] = useState(false);
    const [editPhone, setEditPhone] = useState(false);
    const [phone, setPhone] = useState({});
    const { types, phones } = useSelector((state) => state.phones);
    const { isLoading } = useSelector((state) => state.contacts);

    const getPhoneType = (phone) => {
        const phoneType = types.data.filter((type) => (type.id === phone?.type_id));
        return phoneType[0]?.value;
    }

    const deletedPhones = phones?.deleted_id;

    const contactPhones = contact?.phones?.filter(phone => phone.id !== deletedPhones);

    const copyText = (text) => {
        navigator.clipboard.writeText(text);
    }

    if (isLoading) {
        return (
        <Paper elevation={6} className={classes.loadingPaper}>
            <CircularProgress size="7em" />
        </Paper>
        );
    }

    return (
        <div className={classes.contactDetails} style={{ background: "#fff"}}>
            {(currentId !== 0) && (
                <>
                    <div className={classes.head}>
                        <Avatar {...nameAvatar(contact?.name || contact?.email)} className={classes.bigAvatar}  />
                        <h2 className={classes.header}>{contact?.name || contact?.email}</h2>
                        <Button className={classes.editButton} variant="contained" color="primary" size="large" onClick={handleEditContact}><MdModeEdit />&nbsp; Edit Contact</Button>
                    </div>
                    <div className={`${classes.contactDetails} contact-info`}>
                        <h3>Contact details</h3>
                        <div className={`${classes.email} contact-item`}>
                            <h4>Email</h4>
                            <h5 className={classes.emailText}>{contact?.email}</h5>
                            <div className="icon" onClick={() => copyText(contact?.email)}><MdContentCopy /></div>
                        </div>
                        <div className={classes.phones}>
                            <h4 className={classes.phonesTitle}>phones</h4>
                            <ul className={`${classes.phonesList} phones`}>
                                {contactPhones?.map((phone) =>(
                                    <li key={phone.id} className={`${classes.phone} contact-item `} >
                                            <p className={classes.phoneNum}>{phone?.value}</p>
                                            <span className={classes.phoneType}>{getPhoneType(phone)}</span>
                                            <div className="icon" onClick={() => {setEditPhone(eP => !eP); setPhone(phone)}}><MdModeEdit /></div>
                                            <div className="icon" onClick={() => dispatch(deletePhone((phone.id))) }><MdDelete /></div>
                                            <div className="icon" onClick={() => copyText(phone.value)}><MdContentCopy /></div>
                                    </li>
                                ))}
                            </ul>
                            <div>
                                <Button className={classes.addPhone} variant="outlined" color="primary" size="large" title="Add Phone" onClick={() => setAddPhone(addPhone => !addPhone)}>Add Phone</Button>
                            </div>
                        </div>
                        <div>
                            {(addPhone || editPhone) && (
                                <>
                                    <div className={classes.overlay}></div>
                                    <AddOrEditPhone editPhone={editPhone} contactId={contact?.id} phone={phone} setPhone={setPhone} setAddPhone={setAddPhone} setEditPhone={setEditPhone} setPhone={setPhone} />
                                </>
                            )}
                        </div>
                    </div>
                    <div className={classes.notes} >
                        <h3>Notes</h3>
                        {contact?.notes || (
                            <Button className={classes.addNotes} variant="contained" color="primary" size="large" onClick={handleEditContact}><MdAdd />&nbsp; Add notes</Button>
                        )}
                    </div>
                </>
            )}
        </div>
    )
}

export default ContactDetails;
