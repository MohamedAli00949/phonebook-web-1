import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
    appBar: {
        borderRadius: 15,
        margin: '1% 0',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0.7% 2%',
        zIndex: '100',
        [theme.breakpoints.down('sm')]: {
            flexFlow: 'wrap',
            justifyContent: 'center',
        },
        boxShadow: '0 0 10px #ccc',
        border: '2px solid #dddcdc',
    },
    heading: {
        color: theme.palette.primary.main,
        textDecoration: 'none',
        fontSize: '2em',
        fontWeight: 300,
    },
    toolbar: {
        display: 'flex',
        justifyContent: 'flex-end',
        width: '62%',
        [theme.breakpoints.down('sm')]: {
            width: 'auto',
            flexFlow: 'row',
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
        fontSize: '15px',
    },
    logout: {
        width: "22%",
        marginInline: "5px",
        margin: "5px",
        padding: "5px",
    },
    brandContainer: {
        display: 'flex',
        alignItems: 'center',
    },
    logo : {
        width: '40px',
        margin: '10px',
    }, 
    dAEButton: {
        margin: '5px',
        padding: "5px",
        width: "185px",
        textTransform: 'capitalize',
        [theme.breakpoints.down('sm')] : {
            display: 'none',
        }
    },
    addButton : { 
        width: "32%",
        margin: "5px",
        padding: "5px",
    },
    searchButton : {
        fontSize: '25px',
        background: '#ebf6ff',
        borderRadius: '20px',
    },
    searchResults : {
        position: 'absolute',
        top: '100%',
        right: '25%',
        width: '100%',
        background: 'aliceblue',
        alignItems: 'center',
        textAlign: 'center',
        zIndex: '100',
        padding: '16px',
        boxShadow: '0px 7px 10px #817878',
        [theme.breakpoints.down('sm')] : {
            display: 'none',
        }
    },
    contact : {
        marginInline: '5px',
        marginBlock: '10px'
    },
    searchContainer : {
        display: 'flex',
        flexDirection: 'row-reverse',
        width: '85%',
        zIndex: '100',
        [theme.breakpoints.down('sm')] : {
            width: '100%',
        },
        [theme.breakpoints.down('xs')] : {
            width: '110%',
        },
    },
    searchArrow : {
        fontSize: '25px',
        background: 'aliceblue',
        marginInline: '8px',
        [theme.breakpoints.down('sm')] : {
            marginInline: '2px',
        }
    },
}));