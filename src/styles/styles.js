import {fade} from "@material-ui/core/styles/colorManipulator";

const Styles = theme => ({
  appBar: {
    backgroundColor: '#282c34',
    padding: theme.spacing(2),
  },
  container: {
    backgroundColor: '#eeeeee',
    padding: theme.spacing(2),
    flexGrow: 1,
  },
  footer: {
    backgroundColor: '#282c34',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(2),
  },
  paper: {
    margin: 10,
    padding: theme.spacing(2),
    textAlign: 'left',
    color: theme.palette.text.primary,
  },
  trendingContainer: {
    margin: 10,
    padding: theme.spacing(2),
    textAlign: 'left',
    color: theme.palette.text.primary,
    backgroundColor:'#ddd'
  },
  trendingListContainer: {
    width: '100%',
  },
  listContainer: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
  link:{
    paddingRight: '10px',
  },
  itemLink:{
    textDecoration:'none',
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
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
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing(1),
    paddingRight: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(1),
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
    width: "80%",
    height: "80%",
    maxHeight:100,
  },
});

export default Styles;
