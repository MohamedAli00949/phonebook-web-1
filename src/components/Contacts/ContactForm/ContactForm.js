import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, TextField } from '@material-ui/core';

import { createContact, updateContact } from '../../../actions/contacts';
import AddOrEditPhone from '../../ContactDetails/AddOrEditPhone';

function ContactForm(props) {
    const { currentId, setCloseForm } = props;
    const [phoneData, setPhoneData] = useState({ type_id: 0, value: '',  });
    const [ contactData, setContactData ] = useState({ email: '', name: '', notes: '', phones: [] });
    const contact = useSelector((state) => state.contacts.contacts.find(contact => contact.id === currentId));
    const dispatch = useDispatch();
    const { types } = useSelector((state) => state.phones);

    const phoneTypes = types.data;

    const handleChangeType = (e) => {
        const typeValue = e.target.value;
        const typeId = phoneTypes.filter((type) => (type.value === typeValue));
        return setPhoneData({ ...phoneData, type_id: typeId[0]?.id});
    };

    const getPhoneType = (phone) => {
        const phoneType = phoneTypes.filter((type) => (type.id === phone.type_id));
        return phoneType[0]?.value;
    };

    const clear = () => {
        setContactData({ email: '', name: '', notes: '', phones: [] });
        setCloseForm(true);
    }

    useEffect( async () => {
        if (contact) {
            const phones = contact.phones;
            await phones.map(phone => {
                delete phone.id;
            });
            setContactData({ email: contact.email, name: contact.name, notes: contact.notes, phones: contact.phones });
        }
    }, [contact]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (phoneData.type_id !== 0 && phoneData.value !== '' ) {
            await setContactData({ ...contactData, phones: contactData.phones.push(phoneData) });
        }

        if (currentId) {
            await dispatch(updateContact(currentId, contactData));
        }else {
            await dispatch(createContact(contactData));
        }

        clear();
    }

    const handleChange = (e) => {
        setContactData({ ...contactData, [e.target.name] : e.target.value });
    }

    return (
        <div className="contact-form">
            <form autoComplete="off" onSubmit={handleSubmit}>
                <TextField name="name" variant="filled" label="Name" fullWidth value={contactData.name} onChange={handleChange} />
                <TextField name="email" variant="filled" label="Email" fullWidth value={contactData.email} onChange={handleChange} />
                <TextField name="notes" variant="filled" label="Notes" fullWidth value={contactData.notes} onChange={handleChange} />
                {contact && (
                    <>
                        <select >
                            {contact?.phones?.map((phone) => (
                                    <option>{`${phone.value} - ${getPhoneType(phone)}`}</option>
                            ))}
                        </select>
                        <AddOrEditPhone />
                    </>
                )}
                {/* <div className="form-phone">
                    <div className="phone-input">
                        <TextField variant="outlined" name="phone" label="Phone Number" fullWidth value={phoneData.value} onChange={(e) => setPhoneData({ ...phoneData, value: e.target?.value})} autoFocus type="phone-number"  />
                    </div>
                    <div className="phone-types">
                        <input list="types" placeholder="Enter the type of phone" name="type" id="type" onChange={handleChangeType} value={getPhoneType(phoneData)} />
                        <datalist id="types">
                            {phoneTypes.map((type) => (
                                <option value={type.value} key={type.id} />
                            ))}
                        </datalist>
                    </div>
                </div> */}
                <Button variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
                <Button variant="contained" color="secondary" size="large" type="submit" fullWidth onClick={clear}>Close</Button>
            </form>
        </div>
    )
}

export default ContactForm;
