import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, TextField } from '@material-ui/core';
import { useForm } from 'react-hook-form';

import { AiOutlineCloseCircle } from 'react-icons/ai';
import { MdAdd } from 'react-icons/md';

import { createContact, updateContact } from '../../../actions/contacts';
import { createPhone, updatePhone, deletePhone } from '../../../actions/phones';

function ContactForm(props) {
    const { currentId, setCloseForm } = props;
    const [ contactData, setContactData ] = useState({ email: '', name: '', notes: '', phones: [] });
    const [phoneData, setPhoneData] = useState({ type_id: 0, value: '', id: 1, phone_id: 1 });
    const [noChange, setNoChange] = useState(true);
    const [phones, setPhones] = useState([]);
    const contact = useSelector((state) => state.contacts.contacts.find(contact => contact.id === currentId));
    const dispatch = useDispatch();
    const { types } = useSelector((state) => state.phones);

    const { register, errors, handleSubmit } = useForm();
    const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const phonePattern = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,9}$/;

    const phoneTypes = types?.data;

    // This Function For Handleing the Change At The Type of Phone.
    const handleChangeType = (e) => {
        const typeValue = e.target?.value;
        const typeId = phoneTypes.filter((type) => (type.value === typeValue));
        return setPhoneData({ ...phoneData, type_id: typeId[0]?.id});
    };

    //This Function For Getting the Phone Type Value.
    const getPhoneType = (phone) => {
        const phoneType = phoneTypes?.find((type) => (type.id === phone?.type_id));
        return phoneType?.value;
    };

    // This Function For Clearing the Contact Data.
    const clear = () => {
        setContactData({ email: '', name: '', notes: '', phones: [] });
        setCloseForm(true);
        setShowMenu(false);
        setAddPhone(false);
    }

    
    useEffect(() => {
        if (contact) {
            if (!contact.phones[0]) {
                setPhones([]);
            }else {
                setPhones(contact.phones);
            }

            setContactData({ email: contact.email, name: contact.name, notes: contact.notes, phones: [] });

            console.log(contactData, phones);
        }
    }, [contact]);

    const handleSubmitData = async () => {

        const phone = phones.find(phone => (phone.value === phoneData.value && phone.type_id === phoneData.type_id));
        
        if (phoneData.value && phoneData.type_id && !phone) {
            phones.push(phoneData);
        }

        if (contact) {
            await delete contactData.phones;
            if (!contactData.notes) {
                await delete contactData.notes;
            }

            if (!contactData.email) {
                await delete contactData.email;
            }
            dispatch(updateContact(contact.id, contactData))
            if(!phoneData.value) {
                const afterDelete = phones.filter(phone => phone.id !== phoneData.id);
                await setPhones(afterDelete);
            }
            phones.map((phone) => {
                if (phone.value !== '') {
                    if (phone.type_id === 0) {
                        if(phone.phone_id === phone.id ) {
                            dispatch(createPhone({ value: phone.value, contact_id: contact.id}));
                        } else { 
                            dispatch(updatePhone(phone.id, { value: phone.value }));
                        }
                    } else {
                        if(phone.phone_id === phone.id ) {
                            dispatch(createPhone({ value: phone.value, type_id: phone.type_id, contact_id: contact.id}));
                        } else { 
                            dispatch(updatePhone(phone.id, { value: phone.value, type_id: phone.type_id }));
                        }
                    }
                }
            })

            if ( phoneData.id !== phoneData.phone_id && contact && phoneData.value === '') {
                dispatch(deletePhone(phoneData.id))
            }
        } else {
            await phones?.map((phone) => {
                delete phone.id;
                delete phone.phone_id;
                {phone.type_id ===  0 ?   delete phone.type_id: null}
            });
            const realPhones = phones.filter((phone) => phone.value !== '' || phone.type_id !== 0);
            
            await realPhones.map((phone) => setContactData({ ...contactData, phone: contactData.phones.push(phone) }));

            if (!contactData.email) {
                await delete contactData.email; 
            }

            if (!contactData.notes) {
                await delete contactData.notes;
            } 

            if (!contactData.name) {
                await delete contactData.name;
            }

            await dispatch(createContact(contactData));
        }

        clear();
    };

    const handleChange = (e) => {
        setContactData({ ...contactData, [e.target.name] : e.target.value });
        setNoChange(false);
    };

    
    const selectPhones = async (e) => {
        const phone = phones.find(phone => phone.value == e.target?.value);
        const oldPhone = phones.find(phone => phone.id == phoneData.id);
        {phoneData.value && phoneData?.type_id && !oldPhone ? phones.push(phoneData) : setPhoneData({ value: phone?.value, type_id: phone?.type_id, id: phone?.id })};

        if(oldPhone && oldPhone.value !== phoneData.value && phoneData.value) {
            oldPhone.value = phoneData?.value;
        }

        if(!phoneData.value) {
            const afterDelete = phones.filter(phone => phone.id !== phoneData.id);
            await setPhones(afterDelete);
            await console.log(afterDelete, phones);
        }

        setNoChange(false);
    }

    const addPhones = async () => {
        const phone = phones.find(phone => phone.id == phoneData.id);

        if (!phone) {
            phones.push(phoneData)
        } else if(phone?.value !== phoneData?.value) {
            phone.value = phoneData?.value;
        }

        await console.log(phoneData, phones) 
        await setPhoneData({ type_id: 0, value: '', id: phones.length + 1, phone_id: contact ? phones.length + 1 : null });
    }

    return (
        <div className="contact-form">
            <Button className="close" onClick={clear}><AiOutlineCloseCircle /></Button>
            <form autoComplete="off" onSubmit={handleSubmit(handleSubmitData)}>
                <TextField 
                    className='input' name="name" 
                    variant="filled" label="Name" fullWidth
                    onChange={handleChange} value={contactData.name}
                    inputRef={register({required: 'Name is required'})}
                />
                {errors.name && (<span className='contact-error'>{errors.name.message}</span>)}
                <TextField 
                    className='input' name="email" 
                    variant="filled" label="Email" fullWidth 
                    onChange={handleChange} value={contactData.email}
                    inputRef={register({pattern: { value:emailPattern, message: 'Email is invalid' }})}
                />
                {errors.email && (<span className='contact-error'>{errors.email.message}</span>)}
                <TextField 
                    className='input' name="notes" 
                    variant="filled" label="Notes" fullWidth 
                    value={contactData.notes} onChange={handleChange} 
                />
                {(phones.length >= 1 ) ? (
                    <select onChange={selectPhones}>
                        <option >Select phone</option>
                        {phones.map((phone) => (
                            <option value={phone.value} id={phone.id}>{`${phone.value} - ${phone.type_id ? getPhoneType(phone) : 'No type'}`}</option>
                        ))}
                    </select>
                ) : null}
                <div className="form-inputs">
                    <div className="phone-input">
                        <TextField 
                            style={{backgroundColor: '#fff'}} variant="outlined" 
                            name="phone" label="Phone Number" fullWidth value={phoneData?.value || ''} 
                            onChange={(e) => {setPhoneData({ ...phoneData, value: e.target?.value}); setNoChange(false);}} autoFocus type="phone-number" 
                            inputRef={register({ pattern: { value: phonePattern, message: 'Please enter a valid phone number'} })}
                        />
                    </div>
                    <div className="phone-types">
                        <input list="types" placeholder="Enter the type of phone" 
                            name="type" id="type" onChange={handleChangeType} value={getPhoneType(phoneData) || '' } />
                        <datalist id="types">
                            {phoneTypes.map((type) => (
                                <option value={type.value} key={type.id} />
                            ))}
                        </datalist>
                    </div>
                </div>
                {errors.phone && (<span className='contact-error'>{errors.phone.message}</span>)}
                <div className="contact-buttons">
                    <Button 
                        className="submit" style={{ width: '31%', marginInline: '1%', height: '50px', textTransform: 'capitalize' }} 
                        variant="contained" color="primary" size="large" type="submit" 
                        fullWidth disabled={noChange}>{contact ? `Save Changes` : `Add Contact`}</Button>
                    <Button 
                        className="submit" style={{ width: '31%', marginInline: '1%', height: '50px', textTransform: 'capitalize' }} 
                        variant="contained" color="secondary" size="large" type="button" 
                        fullWidth onClick={clear}>Close</Button>
                    <Button 
                        className="submit" style={{ width: '31%', marginInline: '1%', background: 'aliceblue', height: '50px', textTransform: 'capitalize'}} 
                        color="primary" onClick={addPhones} type="button" 
                        disabled={!phoneData?.value}><MdAdd /> &nbsp; Add Phone</Button>
                </div>
            </form>
        </div>
    )
}

export default ContactForm;
