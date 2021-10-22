import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
    avatar : {
        flex: '0 0 auto',
        position: 'relative',
        marginInline: '10px',
        marginBlock: 'auto',
    },
    name : {
        marginBlock: "10px",
        fontFamily: "sans-serif",
        fontSize: "14px",
        fontWeight: "400",
    },
    activeContact: {
        backgroundColor: "#c7e0f4",
        boxShadow: "inset 0 0 10px 1px #c6c4c4",
    },
    iconD : {
        border: 'none',
        font: '20px bold',
        float: 'right',
        cursor: 'pointer',
        background: 'none',
        position: 'relative',
        color: '#f50057',
        visibility: 'hidden',
    },
    iconE : {
        border: 'none',
        font: '20px bold',
        float: 'right',
        cursor: 'pointer',
        background: 'none',
        position: 'relative',
        color: '#3f51b5',
        visibility: 'hidden',
    },
    moreButton : {
        padding: '14px',
        margin: '0px',
        fontSize: '24px',
        display: 'none',
        [theme.breakpoints.down('sm')] : {
            display: 'block',
        }
    }
}))



