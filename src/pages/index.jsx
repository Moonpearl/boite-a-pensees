import React from 'react';
import { Link } from 'gatsby';
import { Layout, SEO, Image, Header, Content } from '../components';
import { FaAngleRight } from 'react-icons/fa';
import { GrDropbox } from 'react-icons/gr';
import { Typography, Button, Paper } from '@material-ui/core';
import { makeStyles, withStyles, ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { lightenColor, darkenColor } from '../utils/lighten-color';
import { makeTheme } from '../utils';

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

const IndexPage = ({ data }) => {
  const styles = useStyles();

  const people = data.allDatoCmsPerson.edges.map(edge => edge.node);
  console.log(people);

  return (
    <Layout>
      <SEO title="Accueil" />
      <Content>
        <Header level={2}>
          Je m'appelle
        </Header>
        <ThemeProvider>
          {people.map( (person, index) =>
            <ThemeProvider
              theme={makeTheme(person.color.hex)}
            >
              <Link to={`/person/${person.slug}`}>
                <Button
                  variant="contained"
                  color="primary"
                  className={styles.margin}
                >
                  {person.name}
                </Button>
              </Link>
            </ThemeProvider>
          )}
        </ThemeProvider>
      </Content>
    </Layout>
  );
}

export default IndexPage;

export const query = graphql`
  query IndexPageQuery {
    allDatoCmsPerson(sort: {fields: meta___createdAt, order: ASC}) {
      edges {
        node {
          name
          slug
          color {
            hex
          }
        }
      }
    }
  }
`;
