/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';
import { Container, CssBaseline } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { Header as Title } from '..';
import { Header, Footer } from './components';

import '../../styles/reset.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { GrDropbox } from 'react-icons/gr';

const useStyles = makeStyles(theme => ({
  title: {
    color: '#9E846C',
    margin: theme.spacing(4),
  },
}));

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  const styles = useStyles();

  return (
    <>
      <CssBaseline />
      <Header siteTitle={data.site.siteMetadata.title} />
      <Container>
        <Title
          bold
          centered
          className={styles.title}
        >
          <GrDropbox size='2em' />
          <div>
            La boîte à pensées
          </div>
        </Title>
        <main>{children}</main>
        <Footer />
      </Container>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
