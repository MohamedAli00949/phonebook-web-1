import React from 'react';
import { InputAdornment, IconButton, TextField } from '@material-ui/core';

import { MdVisibility } from 'react-icons/md';
import { MdVisibilityOff } from "react-icons/md";

const Input = (props) => {
    const { name, label, handleChange, autoFocus, type, handleShowPassword } = props;
    return (
        <TextField
            className="input"
            style={{margin: "0px 10px 10px", top: '4%'}}
            name={name}
            title={label}
            onChange={handleChange}
            variant="outlined"
            required
            fullWidth
            label={label}
            autoFocus={autoFocus}
            type={type}
            InputProps={name === 'password' ? {
                endAdornment : (
                    <InputAdornment position='end'>
                        <IconButton onClick={handleShowPassword}>
                            {type === "password" ? <MdVisibility/> : <MdVisibilityOff/>}
                        </IconButton>
                    </InputAdornment>
                ) 
            } : null}
        />
    )
}

export default Input
