import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { getContacts } from '../../actions/contacts';
import Contacts from '../Contacts/Contacts';
import ContactDetails from '../ContactDetails/ContactDetails';
import ContactForm from '../Contacts/ContactForm/ContactForm';

const Home = () => {
    const [currentId, setCurrentId] = useState(0);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getContacts());
    }, [currentId, dispatch]);

    return (
        <div>
            <div>
                <div className="container">
                    <div className="contacts">
                        <Contacts setCurrentId={setCurrentId} />
                    </div>
                    <div className="details">
                        {(currentId !== 0) && (
                            <ContactDetails currentId={currentId} />
                        )}
                    </div>
                    <div className="contact-form">
                        <ContactForm />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;
