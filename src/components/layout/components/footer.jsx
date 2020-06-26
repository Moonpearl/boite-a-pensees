import React from 'react';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(8),
    textAlign: 'center',
  },
}));

const Footer = () => {
  const styles = useStyles();

  return (    
    <Box component="footer" className={styles.root} color="text.disabled">
      © {new Date().getFullYear()}, Built with
      {` `}
      <a href="https://www.gatsbyjs.org">Gatsby</a>
      {` `}
      and
      {` `}
      <a href="https://www.datocms.com/">DatoCMS</a>
    </Box>
  );
}

export default Footer;
