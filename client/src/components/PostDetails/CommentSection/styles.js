import {makeStyles} from '@material-ui/core';

export default makeStyles((theme) => ({
    commentsOuterContainer: {
        display: 'flex', 
        justifyContent: 'space-between',
        gap: '10px',
        [theme.breakpoints.down('lg')]: {
            flexDirection: 'column-reverse'
        }
    },
    commentsInnerContainer: {
        height: '200px', 
        overflowY: 'auto',
        marginRight: '30px',
    },
    signinPaper: {
        height: 'fit-content',
        width: 'auto',
        padding: '10px',
    }
}))