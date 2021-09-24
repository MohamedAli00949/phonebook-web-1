import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { TextField, Button } from '@material-ui/core';
import { updatePhone, createPhone } from '../../actions/phones';

function AddOrEditPhone(props) {
    const { editPhone, contactId, phone } = props;
    const dispatch = useDispatch();
    const [phoneData, setPhoneData] = useState({ type_id: 0, value: '',  });
    const { types } = useSelector((state) => state.phones);

    const phoneTypes = types.data;

    useEffect(() => {
        if (editPhone) {
            setPhoneData(phone);
        } else {
            setPhoneData({ type_id: 0, value: '',  });
        }
    }, [editPhone])

    const handleChange = (e) => {
        const typeValue = e.target.value;
        const typeId = phoneTypes.filter((type) => (type.value === typeValue));
        console.log(typeId[0]?.id)
        return setPhoneData({ ...phoneData, type_id: typeId[0]?.id});
    };

    const getPhoneType = (phone) => {
        const phoneType = phoneTypes.filter((type) => (type.id === phone.type_id));
        return phoneType[0]?.value;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (editPhone) {
            await dispatch(updatePhone(phone.id, { value: phoneData.value, type_id: phoneData.type_id }));
        } else {
            await dispatch(createPhone({ ...phoneData, contact_id: contactId}));
        }

    }

    return (
        <div>
            <div className="overlay"></div>
            <form autoComplete='off' noValidate onSubmit={handleSubmit} >
                <div className="phone-input">
                    <TextField variant="outlined" name="phone" label="Phone Number" fullWidth value={phoneData.value} onChange={(e) => setPhoneData({ ...phoneData, value: e.target?.value})} autoFocus type="phone-number"  />
                </div>
                <div className="phone-types">
                    <input list="types" name="type" id="type" onChange={handleChange} value={getPhoneType(phoneData)} />
                    <datalist id="types">
                        {phoneTypes.map((type) => (
                            <option value={type.value} key={type.id} />
                        ))}
                    </datalist>
                </div>
                <Button variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
                <Button variant="outlined" color="secondary" size="large" type="submit" fullWidth>Cancel</Button>
            </form>
        </div>
    )
}

export default AddOrEditPhone;
