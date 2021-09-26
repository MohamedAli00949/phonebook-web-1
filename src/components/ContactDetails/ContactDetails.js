import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deletePhone } from '../../actions/phones';

import { MdContentCopy, MdDelete, MdModeEdit, MdAdd } from "react-icons/md";
import { Button } from "@material-ui/core";
import AddOrEditPhone from './AddOrEditPhone';

const ContactDetails = ({ currentId, setEditContact, setCloseForm }) => {
    const contact = useSelector((state) => (currentId ? state.contacts.contacts.find((contact) => contact.id === currentId) : null));
    const dispatch = useDispatch();
    const [addPhone, setAddPhone] = useState(false);
    const [editPhone, setEditPhone] = useState(false);
    const [phone, setPhone] = useState({});
    const { types, phones } = useSelector((state) => state.phones);

    const getPhoneType = (phone) => {
        const phoneType = types.data.filter((type) => (type.id === phone.type_id));
        return phoneType[0].value;
    }

    const deletedPhones = phones?.deleted_id;

    const contactPhones = contact?.phones?.filter(phone => phone.id !== deletedPhones);

    const copyText = (text) => {
        navigator.clipboard.writeText(text);
    }

    const editContact = () => {
        setEditContact(true);
        setCloseForm(false);
    }

    return (
        <div className="contact-details">
            {(currentId !== 0) ? (
                <>
                    <div className="contact-header">
                        <h2>{contact?.name}</h2>
                        <Button className="edit-button" variant="contained" color="primary" size="large" onClick={editContact}><MdModeEdit />&nbsp; Edit Contact</Button>            
                    </div>
                    <div className="contact-info">
                        <h3>Contact Information</h3>
                        <div className="contact-items">
                            <div className="contact-item">
                                <div className="copy" onClick={copyText(contact?.email)}><MdContentCopy /></div>
                                <h4>Email</h4>
                                <h5>{contact?.email}</h5>
                            </div>
                            <ul className="phones">
                                {contactPhones?.map((phone) =>(
                                    <li key={phone.id} className="contact-item phone" >
                                        <div className="phone-details">
                                            <h4>{getPhoneType(phone)}</h4>
                                            <p>{phone.value}</p>
                                        </div>
                                        <div className="phone-icons">
                                            <div className="phone-icon" onClick={copyText(phone.value)}><MdContentCopy /></div>
                                            <div className="phone-icon" onClick={() => dispatch(deletePhone((phone.id))) }><MdDelete /></div>
                                            <div className="phone-icon" onClick={() => {setEditPhone(eP => !eP); setPhone(phone)}}><MdModeEdit /></div>
                                        </div>
                                    </li>
                                ))}
                                <li>
                                    <Button className="add" variant="outlined" color="primary" size="large" title="Add Phone" onClick={() => setAddPhone(addPhone => !addPhone)}>Add Phone</Button>
                                </li>
                            </ul>
                        </div>
                        <div>
                            {(addPhone || editPhone) && (
                                <AddOrEditPhone editPhone={editPhone} contactId={contact?.id} phone={phone} setAddPhone={setAddPhone} setEditPhone={setEditPhone} />
                            )}
                        </div>
                        <div className="contact-notes" >
                            <h3>Notes</h3>
                            {contact?.notes || (
                                <Button className="edit-button" variant="contained" color="primary" size="large" onClick={editContact}><MdAdd />&nbsp; Add notes</Button>
                            )}
                        </div>
                    </div>
                </>
            ) : (
                <div>
                    <h3>Click at contact to see contact details</h3>
                </div>
            )}
        </div>
    )
}

export default ContactDetails;
