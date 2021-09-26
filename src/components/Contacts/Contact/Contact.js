import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { MdDelete } from "react-icons/md";
import { deleteContact } from "../../../actions/contacts";

const Contact = (props) => {
    const { contact, setCurrentId } = props;
    const dispatch = useDispatch();

    const { phones } = useSelector((state) => state.phones);
    const deletedPhones = phones?.deleted_id;

    const contactPhones = contact?.phones?.filter(phone => phone.id !== deletedPhones);

    return (
        <li className="contact" onClick={() => setCurrentId(contact.id)}>
            <div>
                <h3>{`${contact?.name}` || `${contact?.email}`}</h3>
                {(contactPhones) ? contactPhones[0]?.value : contact?.email}
            </div>
            <button className="delete-button" onClick={() => {dispatch(deleteContact(contact.id)); setCurrentId(0)}} ><MdDelete /></button>
        </li>
    )
};

export default Contact;
