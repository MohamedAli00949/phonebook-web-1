import React from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { InputAdornment, IconButton, TextField } from '@material-ui/core';

import { MdVisibility } from 'react-icons/md';
import { MdVisibilityOff } from "react-icons/md";

export const Input = (props) => {
    const { name, label, inputRef, autoFocus, type, handleShowPassword } = props;
    return (
        <TextField
            className="input"
            style={{margin: "0px 10px 10px", top: '0%'}}
            name={name}
            title={label}
            inputRef={inputRef}
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

export const Error = (props) => {
    const { message, className } = props;

    return(
        <Stack className={className} sx={{ width: '100%' }} spacing={2}>
            <Alert sx={{ mb: 2 }} severity="error" variant="filled">{message}<strong> - Try again later !</strong></Alert>
        </Stack>
    )
}
