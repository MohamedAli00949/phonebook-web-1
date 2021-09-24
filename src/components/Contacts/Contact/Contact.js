import React from "react";
import { useSelector } from "react-redux";

const Contact = (props) => {
    const { contact, setCurrentId } = props;

    const { phones } = useSelector((state) => state.phones);
    const deletedPhones = phones?.deleted_id;

    const contactPhones = contact?.phones.filter(phone => phone.id !== deletedPhones);

    return (
        <li className="contact" onClick={() => setCurrentId(contact.id)}>
            <p>{`contact name : ${contact.name}` || `contact email : ${contact.email}`}</p>
            <div>
                {contactPhones[0]?.value || contact.email}
            </div>
        </li>
    )
};

export default Contact;
