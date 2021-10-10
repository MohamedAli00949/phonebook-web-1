import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { TextField, Button } from '@material-ui/core';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { updatePhone, createPhone } from '../../actions/phones';
import useStyles from './styles';

function AddOrEditPhone(props) {
    const { editPhone, contactId, phone, setAddPhone, setEditPhone, setPhone } = props;
    const dispatch = useDispatch();
    const classes = useStyles();
    const [phoneData, setPhoneData] = useState({ type_id: 0, value: '',  });
    const { types } = useSelector((state) => state.phones);

    const phoneTypes = types.data;

    useEffect(() => {
        if (editPhone) {
            setPhoneData(phone);
        } else {
            setPhoneData({ type_id: 0, value: '',  });
        }
    }, [editPhone]);

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

    const close = () => {
        if (editPhone) {
            setEditPhone(eP => !eP);
        } else {
            setAddPhone(aP => !aP);
        }

        setPhoneData({ type_id: 0, value: '',  });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (editPhone) {
            await dispatch(updatePhone(phone.id, { value: phoneData.value, type_id: phoneData.type_id }));
            await setPhone(phoneData);
        } else {
            await dispatch(createPhone({ ...phoneData, contact_id: contactId}));
            await setPhone(phoneData);
        }

        close();
    }

    return (
        <div className={classes.form}>
            <Button className={classes.close} onClick={close}><AiOutlineCloseCircle /></Button>
            <form autoComplete='off' noValidate onSubmit={handleSubmit} >
                <div className="form-inputs">
                    <div className="phone-input">
                        <TextField style={{backgroundColor: '#fff'}} variant="outlined" name="phone" label="Phone Number" fullWidth value={phoneData.value} onChange={(e) => setPhoneData({ ...phoneData, value: e.target?.value})} autoFocus type="phone-number"  />
                    </div>
                    <div className="phone-types">
                        <input list="types" placeholder="Enter the type of phone" name="type" id="type" onChange={handleChange} value={getPhoneType(phoneData) || ''} />
                        <datalist id="types">
                            {phoneTypes.map((type) => (
                                <option value={type.value} key={type.id} />
                            ))}
                        </datalist>
                    </div>
                </div>
                <div className="phone-buttons">
                    <Button variant="contained" color="primary" size="large" type="submit">{editPhone ? 'Save Changes' : 'Add Phone'}</Button>
                    <Button variant="contained" color="secondary" size="large" onClick={close}>Cancel</Button>
                </div>
            </form>
        </div>
    )
}

export default AddOrEditPhone;
