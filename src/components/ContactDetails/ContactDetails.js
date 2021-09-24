import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deletePhone } from '../../actions/phones';

import { MdContentCopy, MdExpandMore, MdDelete, MdModeEdit } from "react-icons/md";
import AddOrEditPhone from './AddOrEditPhone';

const ContactDetails = ({ currentId }) => {
    const contact = useSelector((state) => (currentId ? state.contacts.contacts.find((contact) => contact.id === currentId) : null));
    const phones = useSelector((state) => state.phones);
    // const deletedPhones = phones
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const [addPhone, setAddPhone] = useState(false);
    // const [deleteItem, setDeleteItem] = useState(false);
    const [editPhone, setEditPhone] = useState(false);
    const [phone, setPhone] = useState({});
    const { types } = useSelector((state) => state.phones);

    const getPhoneType = (phone) => {
        const phoneType = types.data.filter((type) => (type.id === phone.type_id));
        return phoneType[0].value;
    }

    const copyText = (text) => {
        navigator.clipboard.writeText(text);
    }

    // const deleteItem = (id, type) => {
    //     // let yes = window.confirm('Are you want to delete?');

    //     // if(yes) {
    //         if (type === "phone") {
    //             dispatch(deletePhone(id));
    //         }
    //     // }
    // };

    return (
        <div className="contact-details">
            <h2>{contact.name}</h2>
            <div className="contact-info">
                <h3>Contact Information</h3>
                <div className="contact-items">
                    <div className="contact-item">
                        <div className="copy" onClick={copyText(contact.email)}><MdContentCopy /></div>
                        <h4>Email</h4>
                        <p>{contact.email}</p>
                    </div>
                    <ul className="phones">
                        {contact?.phones.map((phone) =>(
                            <li key={phone.id} className="contact-item phone" >
                                <div className="menu">
                                    <div  className="icon" onClick={() => setShowMenu(showMenu => !showMenu)}><MdExpandMore /></div>
                                        {showMenu && (
                                            <div className="phone-icons">
                                                <div className="phone-icon" onClick={copyText(phone.value)}><MdContentCopy /></div>
                                                <div className="phone-icon" onClick={() => dispatch(deletePhone(phone.id))}><MdDelete /></div>
                                                <div className="phone-icon" onClick={() => {
                                                    setEditPhone(true)
                                                    setPhone(phone)
                                                }}><MdModeEdit /></div>
                                            </div>
                                        )}
                                </div>
                                <h4>{getPhoneType(phone)}</h4>
                                <p>{phone.value}</p>
                            </li>
                        ))}
                        <button className="add" title="Add Phone" onClick={() => setAddPhone(true)}>Add Phone</button>
                    </ul>
                </div>
                <div className="contact-notes" >
                    <h4>Notes</h4>
                    {contact.notes || (
                        <div>
                            Add notes
                        </div>
                    )}
                </div>
            </div>
            <div>
                {addPhone || editPhone && (
                    <AddOrEditPhone editPhone={editPhone} contactId={contact.id} phone={phone} />
                )}
            </div>
        </div>
    )
}

export default ContactDetails;
