import React from "react";
import { graphql } from "gatsby";
import { Heading, Box } from "grommet";
import Lottie from "lottie-react-web";

import Layout from "../components/Layout";
import SEO from "../components/SEO";
import Container from "../components/Container";
import Column from "../components/Column";
import Grid from "../components/Grid";

import { ParseJSXToReact } from "../helpers";

// import block1Image from "../images/block1-image.svg";
// import block2Image from "../images/block2-image.svg";
// import block3Image from "../images/block3-image.svg";
// import block4Image from "../images/block4-image.svg";

import block1Animation from "../lottie/Main01.json";
import block2Animation from "../lottie/Main02.json";
import block3Animation from "../lottie/Main03.json";
import block4Animation from "../lottie/Main04.json";

const IndexPage = ({ data }) => {
  const page = data.allContentfulPageHome.edges[0].node;

  return (
    <Layout>
      <SEO />
      <Container>
        <Box margin={{ bottom: "xlarge" }}>
          <div>
            <Heading size="large">Header Size Large</Heading>
            <Heading>Header Size</Heading>
            <Heading size="small">Header Size Small</Heading>

            <Heading level="2" size="large">
              Subheader Size Large
            </Heading>
            <Heading level="2">Subheader</Heading>

            <Heading level="2" size="large" noLine>
              Subheader Size Large, No Line
            </Heading>
            <Heading level="2" noLine>
              Subheader, No Line
            </Heading>
          </div>
        </Box>

        {/* Block 1 */}
        <Grid>
          <Column span={{ small: 12, medium: 6, large: 4 }}>
            <ParseJSXToReact block={page.block1} />
          </Column>
          <Column span={{ small: 12, medium: 6, large: 8 }}>
            <Lottie options={{ animationData: block1Animation }} />
          </Column>
        </Grid>

        {/* Block 2 */}
        <Grid>
          <Column span={{ small: 12, medium: 6, large: 8 }}>
            <Lottie options={{ animationData: block2Animation }} />
          </Column>
          <Column span={{ small: 12, medium: 6, large: 4 }}>
            <ParseJSXToReact block={page.block2} />
          </Column>
        </Grid>

        {/* Block 3 */}
        <Grid>
          <Column span={{ small: 12, medium: 6, large: 4 }}>
            <ParseJSXToReact block={page.block3} />
          </Column>
          <Column span={{ small: 12, medium: 6, large: 8 }}>
            <Lottie options={{ animationData: block3Animation }} />
          </Column>
        </Grid>

        {/* Block 4 */}
        <Grid>
          <Column span={{ small: 12, medium: 6, large: 8 }}>
            <Lottie options={{ animationData: block4Animation }} />
          </Column>
          <Column span={{ small: 12, medium: 6, large: 4 }}>
            <ParseJSXToReact block={page.block4} />
          </Column>
        </Grid>
      </Container>
    </Layout>
  );
};

export const IndexPageQuery = graphql`
  query {
    allContentfulPageHome {
      edges {
        node {
          block1 {
            childContentfulRichText {
              html
            }
          }
          block2 {
            childContentfulRichText {
              html
            }
          }
          block3 {
            childContentfulRichText {
              html
            }
          }
          block4 {
            childContentfulRichText {
              html
            }
          }
          block5 {
            childContentfulRichText {
              html
            }
          }
        }
      }
    }
  }
`;

export default IndexPage;