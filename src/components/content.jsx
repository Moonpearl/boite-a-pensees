import React from 'react';
import PropTypes from 'prop-types';
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
  },
}));

const Content = ({ children }) => {
  const styles = useStyles();

  return (
    <Paper className={styles.paper}>
      {children}
    </Paper>
  );
}

Content.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Content;
