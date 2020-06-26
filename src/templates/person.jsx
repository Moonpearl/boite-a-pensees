import React, { useState } from 'react';
import { Link, graphql } from 'gatsby';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { Paper, ThemeProvider, Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { getDayOfYear } from 'date-fns';

import { Layout, SEO, Header, Content } from '../components';
import { makeTheme } from '../utils';
import { useMemo } from 'react';

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1),
  },
  text: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
}));

const random = seed => {
  var x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

const hashCode = s => s.split('').reduce((a,b)=>{a=((a<<5)-a)+b.charCodeAt(0);return a&a},0);

const sample = (array, seed) => {
  const day = getDayOfYear(new Date());
  const index = Math.floor(random(day * hashCode(seed)) * array.length);
  return array[index];
}

const PersonPage = ({ data }) => {
  const {
    datoCmsPerson: person,
    allDatoCmsThought,
    allDatoCmsThoughtType,
  } = data;

  const thoughts = allDatoCmsThought.edges.map(edge => edge.node);
  const types = allDatoCmsThoughtType.edges.map(edge => edge.node);

  const styles = useStyles();

  const [currentType, setCurrentType] = useState(null);

  const currentThought = useMemo(
    () => currentType && sample(
      thoughts
      .filter(thought => thought.thoughtType.id === currentType)
      .map(thought => thought.descriptionNode),
      currentType
    ),
  [currentType]);

  return (
    <Layout>
      <SEO title={person.name} />
      <Content>
        <Header level={2}>
          Je souhaite avoir une pensée
        </Header>

        <ThemeProvider>
          {types.map( (type, index) =>
            <ThemeProvider
              key={index}
              theme={makeTheme(type.color.hex)}
            >
              <Button
                variant="contained"
                color="primary"
                className={styles.margin}
                onClick={() => setCurrentType(type.id)}
              >
                {type.description}
              </Button>
            </ThemeProvider>
          )}
        </ThemeProvider>

        {currentType &&
          <div className={styles.text}>
            <Header level={2}>
              Ta pensée du jour est...
            </Header>
            <Typography>
              <div
                dangerouslySetInnerHTML={{
                  __html: currentThought.childMarkdownRemark.html
                }}
              />
            </Typography>
          </div>
        }
      </Content>
    </Layout>
  );
}

export default PersonPage;

export const query = graphql`
  query PersonPageQuery($slug: String!) {
    datoCmsPerson(slug: {eq: $slug}) {
      name
    }
    allDatoCmsThought(filter: {person: {slug: {eq: $slug}}}) {
      edges {
        node {
          descriptionNode {
            childMarkdownRemark {
              html
            }
          }
          thoughtType {
            id
          }
        }
      }
    }
    allDatoCmsThoughtType(sort: {fields: id}) {
      edges {
        node {
          name
          description
          id
          color {
            hex
          }
        }
      }
    }
  }
`;
