import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    fontFamily: `'Mountains of Christmas', cursive`,
    textAlign: ({ centered }) => centered && 'center',
    fontWeight: ({ bold }) => bold && 'bold',
  },
});

const Header = props => {
  const styles = useStyles(props);
  const { className, level, children } = props;

  if (level < 0 || level > 6) {
    throw new Error(`Level "${level}" is not a valid header level in Header component`);
  }

  const ComponentName = `h${level}`;

  return (
    <ComponentName
      {...props}
      className={`${className} ${styles.root}`}
    >
      {children}
    </ComponentName>
  );
}

Header.propTypes = {
  level: PropTypes.number,
  children: PropTypes.node.isRequired,
  centered: PropTypes.bool,
  bold: PropTypes.bool,
};

Header.defaultProps = {
  level: 1,
};

export default Header;
