import React from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import { AppBar, Toolbar, Typography, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { MdHome } from 'react-icons/md';

const useStyles = makeStyles({
  icon: {
    color: 'white',

    '&:hover': {
      color: 'white',
    },
  },
});

const Header = ({ siteTitle }) => {
  const styles = useStyles();

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          color="#inherit"
        >
          <Link
            to='/'
            className={styles.icon}
          >
            <MdHome />
          </Link>
        </IconButton>
        <Typography variant="h6">
          {siteTitle}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: ``,
};

export default Header;
