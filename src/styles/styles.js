import {fade} from "@material-ui/core/styles/colorManipulator";

const Styles = theme => ({
  appBar: {
    backgroundColor: '#282c34',
    padding: theme.spacing(1),
  },
  container: {
    backgroundColor: '#eeeeee',
    padding: theme.spacing(2),
    flexGrow: 1,
  },
  footer: {
    backgroundColor: '#282c34',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(2),
  },
  paper: {
    margin: theme.spacing(2),
    padding: theme.spacing(2),
    textAlign: 'left',
    color: theme.palette.text.primary,
  },
  headerText:{
    color:'#000000DE',
    marginLeft:theme.spacing(2),
  },
  trendingContainer: {
    margin: 10,
    padding: theme.spacing(2),
    textAlign: 'left',
    color: theme.palette.text.primary,
    backgroundColor: '#ddd'
  },
  trendingListContainer: {
    width: '100%',
  },
  listContainer: {
    width: '100%',
  },
  inline: {
    display: 'inline',
  },
  link: {
    paddingRight: '10px',
  },
  collapsible: {
    maxHeight: "300px",
    overflow: "hidden",
  },
  itemLink: {
    display: 'inline',
    textDecoration: 'none',
  },
  search: {
    position: 'relative',
    borderRadius: '20px',
    backgroundColor: fade(theme.palette.common.white, 1),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 1),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(2),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(9),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: '#0000008F',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing(1),
    paddingRight: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(1),
    marginLeft:theme.spacing(1),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 400,
    },
  },
  bigAvatar: {
    margin: 10,
    width: 100,
    height: 100,
  },
  searchAvatar: {
    margin: 10,
    width: 100,
    height: 100,
    float: 'right'
  },
});

export default Styles;
