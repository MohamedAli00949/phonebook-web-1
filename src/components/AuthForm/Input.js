import React from 'react';
import { InputAdornment, IconButton, TextField } from '@material-ui/core';

import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const Input = (props) => {
    const { name, title, label, handleChange, autoFocus, type, handleShowPassword } = props;
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
                            {type === "password" ? <Visibility/> : <VisibilityOff/>}
                        </IconButton>
                    </InputAdornment>
                ) 
            } : null}
        />
    )
}

export default Input
