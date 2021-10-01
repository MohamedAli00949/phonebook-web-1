import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
    container: {
        [theme.breakpoints.down('xs')]: {
            flexDirection: 'column',
        }
    },
    mainContainer : {
        paddingLeft: "8px",
        paddingRight: "5px",
    }
}))