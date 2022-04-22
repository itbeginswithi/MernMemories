import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  heading: {
    color: "rgba(0,183,255, 1)",
  },
  image: {
    marginLeft: "15px",
  },
  [theme.breakpoints.down('sm')]: {
    mainContainer: {
      flexDirection: 'column-reverse'
    }
  },
  appSearchBar: {
    borderRadius: 4,
    marginBottom: '1rem',
    display: 'flex', 
    padding: '16px'
  },
}));