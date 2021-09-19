import { makeStyles } from "@material-ui/core/styles";
import { deepPurple } from '@material-ui/core/colors'; 

export default makeStyles((theme) => ({
    appBar: {
        borderRadius: 15,
        margin: '25px 0',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 30px',
        [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
        },
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
        width: '400px',
        [theme.breakpoints.down('sm')]: {
        width: 'auto',
        },
    },
    profile: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '400px',
        alignItems: 'center',
        [theme.breakpoints.down('sm')]: {
        width: 'auto',
        marginTop: 20,
        justifyContent: 'center',
        },
    },
    logout: {
        color: "#7d7dff",
        marginLeft: "20px",
        backgroundColor: "#4a4b56",
        boxShadow: "0px 0px 10px 0px #0000004a"
    },
    profileAction: {
        display: 'flex',
        textAlign: 'initial',
    },
    brandContainer: {
        display: 'flex',
        alignItems: 'center',
    },
    purple: {
        color: theme.palette.getContrastText(deepPurple[500]),
        backgroundColor: deepPurple[500],
        marginRight: '10px',
    },
}));