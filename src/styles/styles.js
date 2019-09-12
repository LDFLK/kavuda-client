const Styles = theme => ({
  appBar: {
    backgroundColor: '#282c34',
    padding: 10,
  },
  container: {
    backgroundColor: '#eeeeee',
    padding: '10px',
    flexGrow: 1,
  },
  footer: {
    backgroundColor: '#282c34',
    paddingTop: 20,
    paddingBottom: 10,
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
});

export default Styles;
