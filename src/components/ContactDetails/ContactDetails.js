import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deletePhone, DELETE_PHONE } from '../../actions/phones';

import { MdContentCopy, MdDelete, MdModeEdit, MdAdd, MdMailOutline, MdCall, MdMoreHoriz } from "react-icons/md";
import { Avatar, Button, Paper, Typography } from "@material-ui/core";
import AddOrEditPhone from './AddOrEditPhone';
import useStyles from './styles'

const ContactDetails = ({ currentId, handleEditContact, nameAvatar }) => {
    const contact = useSelector((state) => (currentId ? state.contacts.contacts.find((contact) => contact.id == currentId) : null));
    const dispatch = useDispatch();
    const classes = useStyles();
    const [addPhone, setAddPhone] = useState(false);
    const [editPhone, setEditPhone] = useState(false);
    const [phone, setPhone] = useState({});
    const [phoneId, setPhoneId] = useState(null);
    const { types, phones } = useSelector((state) => state.phones);

    const getPhoneType = (phone) => {
        const phoneType = types?.data?.find((type) => (type.id === phone?.type_id));
        return phoneType?.value;
    }

    const deletedPhones = phones?.deleted_id;

    const contactPhones = contact?.phones?.filter(phone => phone.id !== deletedPhones);

    const copyText = (text) => {
        navigator.clipboard.writeText(text);
    }

    const deletePhones = (id) => {
        return deletePhone(id)
            .then((response) => {
                dispatch({ type: DELETE_PHONE, data: response });
            })
            .catch((error) => {
                console.error(error);
                dispatch({ type: PHONE_ERROR, data: error.response?.data });
            })
    }

    const [openMenu, setOpenMenu] = useState(false)

    return (
        <div className={classes.contactDetails}>
            {(contact && currentId) ? (
                <>
                    <div className={classes.head}>
                        <Avatar {...nameAvatar(contact?.name || contact?.email)} className={classes.bigAvatar}  />
                        <h2 className={classes.header}>{contact?.name || contact?.email}</h2>
                        <Button className={classes.editButton} variant="contained" color="primary" size="large" onClick={handleEditContact}><MdModeEdit />&nbsp; Edit</Button>
                    </div>
                    <div className={classes.detailsContainer}>
                        <div className={`${classes.details} contact-info`}>
                            <h3>Contact details</h3>
                            <div style={{ display: 'flex', flexFlow: 'column'}}>
                                {contact?.email ? (<div className={`${classes.email} contact-item`}>
                                    <MdMailOutline style={{ fontSize: '20px', marginRight: '10px' }} />
                                    <h5 className={classes.emailText}>{contact?.email}</h5>
                                    <div className="icon" onClick={() => copyText(contact?.email)}><MdContentCopy /></div>
                                </div>) : null}
                                {contactPhones?.map((phone) =>(
                                    <div key={phone.id} className={`${classes.phone} contact-item `} >
                                            <MdCall style={{ fontSize: '20px', marginRight: '10px', width: '10%' }} />
                                            <p className={classes.phoneNum}>{phone?.value}</p>
                                            <span className={classes.phoneType}>{getPhoneType(phone)}</span>
                                            <Button style={{fontSize: '20px', width: '10%'}} onClick={() => {setPhoneId(phone.id); setOpenMenu(o => !o);}}><MdMoreHoriz /></Button>
                                            {(phone.id === phoneId && openMenu) && (<div className={classes.icons}>
                                                <div className="icon" onClick={() => copyText(phone.value)}><MdContentCopy /></div>
                                                <div className="icon" onClick={() => deletePhones((phone.id))}><MdDelete /></div>
                                                <div className="icon" onClick={() => {setEditPhone(eP => !eP); setPhone(phone)}}><MdModeEdit /></div>
                                            </div>)}
                                    </div>
                                ))}
                                <Button className={classes.addPhone} variant="outlined" color="primary" size="large" title="Add Phone" onClick={() => setAddPhone(addPhone => !addPhone)}>Add Phone</Button>
                                <div>
                                    {(addPhone || editPhone) && (
                                        <>
                                            <div className={classes.overlay}></div>
                                            <AddOrEditPhone editPhone={editPhone} contactId={contact?.id} phone={phone} setPhone={setPhone} setAddPhone={setAddPhone} setEditPhone={setEditPhone} setPhone={setPhone} />
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className={classes.notes} >
                            <h3 style={{ marginBlock: '5px' }}>Notes</h3>
                            {contact?.notes ? (
                                <Typography style={{ marginBlock: '5px' }}>{contact.notes}</Typography>
                            ): (
                                <Button className={classes.addNotes} variant="contained" color="primary" size="large" onClick={handleEditContact}><MdAdd />&nbsp; Add notes</Button>
                            )}
                        </div>
                    </div>
                </>
            ) : (
                <Paper elevation={6} className={classes.loadingPaper}>
                    <Typography>Click at contact to see details of the contact</Typography>
                </Paper>
            )}
        </div>
    )
}

export default ContactDetails;
