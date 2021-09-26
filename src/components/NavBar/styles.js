import { makeStyles } from "@material-ui/core/styles";
import { deepPurple } from '@material-ui/core/colors'; 

export default makeStyles((theme) => ({
    appBar: {
        borderRadius: 15,
        margin: '18px 0',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '8px 25px',
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
        marginLeft: "20px",
        backgroundColor: "#bfd0ff",
        color: "#6363d1",
        borderRadius: "5px",
        boxShadow: "5px 5px 10px 0px #849bd9, -5px -5px 24px #b2d1ff",
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