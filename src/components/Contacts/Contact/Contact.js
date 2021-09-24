import React from "react";

const Contact = (props) => {
    const { contact, setCurrentId } = props;

    return (
        <li className="contact" onClick={() => setCurrentId(contact.id)}>
            <p>{`contact name : ${contact.name}` || `contact email : ${contact.email}`}</p>
            <div>
                {contact?.phones[0]?.value || contact.email}
            </div>
        </li>
    )
};

export default Contact;
