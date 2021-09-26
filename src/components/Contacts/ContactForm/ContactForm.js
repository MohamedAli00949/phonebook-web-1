import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, TextField } from '@material-ui/core';

import { createContact, updateContact } from '../../../actions/contacts';
import AddOrEditPhone from '../../ContactDetails/AddOrEditPhone';

function ContactForm(props) {
    const { currentId, setCloseForm } = props;
    const [phoneData, setPhoneData] = useState({ type_id: 0, value: '',  });
    const [ contactData, setContactData ] = useState({ email: '', name: '', notes: '', phones: [] });
    const [addPhone, setAddPhone] = useState(true);
    const [editPhone, setEditPhone] = useState(true);
    const contact = useSelector((state) => state.contacts.contacts.find(contact => contact.id === currentId));
    const dispatch = useDispatch();
    const { types } = useSelector((state) => state.phones);

    const phoneTypes = types.data;

    // This Function For Handleing the Change At The Type of Phone.
    const handleChangeType = (e) => {
        const typeValue = e.target.value;
        const typeId = phoneTypes.filter((type) => (type.value === typeValue));
        return setPhoneData({ ...phoneData, type_id: typeId[0]?.id});
    };

    //This Function For Getting the Phone Type Value.
    const getPhoneType = (phone) => {
        const phoneType = phoneTypes.filter((type) => (type.id === phone.type_id));
        return phoneType[0]?.value;
    };

    // This Function For Clearing the Contact Data.
    const clear = () => {
        setContactData({ email: '', name: '', notes: '', phones: [] });
        setCloseForm(true);
    }

    
    useEffect( async () => {
        if (contact) {
            if (!contact.phones[0]) {
                setAddPhone(aP => !aP);
            }else {
                setEditPhone(eP => !eP);
            }
            const phones = contact.phones.map(phone => {
                delete phone.id;
            });
            console.log(contact.phones)
            setContactData({ email: contact.email, name: contact.name, notes: contact.notes, phones: phones });
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
    };

    const handleChange = (e) => {
        setContactData({ ...contactData, [e.target.name] : e.target.value });
    };

    const selectPhones = async (e) => {
        const phone = contact?.phones?.filter(phone => phone.value == e.target.value);
        await setPhoneData(phone[0]);
        await console.log(phoneData);
    }

    return (
        <div className="contact-form">
            <form autoComplete="off" onSubmit={handleSubmit}>
                <TextField className='input' name="name" variant="filled" label="Name" fullWidth value={contactData.name} onChange={handleChange} />
                <TextField className='input' name="email" variant="filled" label="Email" fullWidth value={contactData.email} onChange={handleChange} />
                <TextField className='input' name="notes" variant="filled" label="Notes" fullWidth value={contactData.notes} onChange={handleChange} />
                {(contact.phones[0]) && (<select onChange={selectPhones} >
                    <option >Select Phones</option>
                    {contact?.phones?.map((phone) => (
                        <option value={phone.value}>{`${phone.value} - ${getPhoneType(phone)}`}</option>
                    ))}
                </select>)}
                <div className="form-inputs">
                    <div className="phone-input">
                        <TextField style={{backgroundColor: '#fff'}} variant="outlined" name="phone" label="Phone Number" fullWidth value={phoneData?.value} onChange={(e) => setPhoneData({ ...phoneData, value: e.target?.value})} autoFocus type="phone-number"  />
                    </div>
                    <div className="phone-types">
                        <input list="types" placeholder="Enter the type of phone" name="type" id="type" onChange={handleChangeType} value={getPhoneType(phoneData)} />
                        <datalist id="types">
                            {phoneTypes.map((type) => (
                                <option value={type.value} key={type.id} />
                            ))}
                        </datalist>
                    </div>
                </div>
                <div className="contact-buttons">
                    <Button className="submit" variant="contained" color="primary" size="large" type="submit" fullWidth>{contact ? `Save Changes` : `Add Contact`}</Button>
                    <Button className="submit" variant="contained" color="secondary" size="large" type="submit" fullWidth onClick={clear}>Close</Button>
                </div>
            </form>
        </div>
    )
}

export default ContactForm;
