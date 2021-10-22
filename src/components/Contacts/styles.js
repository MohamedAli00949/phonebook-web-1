import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
    noContacts : {
        textAlign: 'center',
        backgroundColor: '#fff',
        borderRadius: "10px",
        padding: "10px 20px",
        boxShadow: '0px 0px 16px 4px #6e6e6e80',
        margin: "10px",
    },
    loadingPaper: {
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        padding: '20px', 
        borderRadius: '15px', 
        height: '39vh',
    },
}))