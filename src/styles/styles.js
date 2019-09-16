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
  listContainer: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
  itemLink:{
    textDecoration:'none',
  },
});

export default Styles;
