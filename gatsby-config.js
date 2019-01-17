require("dotenv").config();

const proxy = require("http-proxy-middleware");
const {
  BLOCKS,
  MARKS,
  INLINES,
  EMBEDDED_ENTRY
} = require("@contentful/rich-text-types");

const lambdaServerDefaults = filename => ({
  typePrefix: "lambda__",
  method: "GET",
  headers: {
    "Content-Type": "application/json"
  },
  url:
    process.env.NODE_ENV == "production"
      ? `${process.env.URL}/.netlify/functions/${filename}`
      : `http://localhost:9000/${filename}`
});

const breezyServerOptions = {
  name: `breezy`,
  ...lambdaServerDefaults("getBreezyJobListings"),
  schemaType: {
    id: 1,
    position: "String",
    link: "String",
    location: "String",
    offering: "String"
  },
  verboseOutput: true
};

const gitcoinServerOptions = {
  name: `gitcoin`,
  ...lambdaServerDefaults("getGitcoinBounties"),
  verboseOutput: true
};

module.exports = {
  siteMetadata: {
    title: `Centrifuge`,
    siteUrl: process.env.URL || "http://localhost:8000",
    longTitle: `Centrifuge - The Operating System For Global Commerce`,
    description: `Centrifuge is an open, decentralized operating system to connect the global financial supply chain. It allows any business to transact on a global network while maintaining ownership of their data, including their validated company details, their reputation, business relationships, and subsequent transactions.`,
    author: `@centrifuge`
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `centrifuge-website`,
        short_name: `centrifuge`,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#2762ff`,
        display: `minimal-ui`,
        icon: `src/images/centrifuge-logo.png` // This path is relative to the root of the site.
      }
    },
    {
      resolve: "gatsby-plugin-mailchimp",
      options: {
        endpoint: `https://centrifuge.us17.list-manage.com/subscribe/post?u=27084e1d9e6f92398b5c7ce91&amp;id=e00b1ece80`
      }
    },
    {
      resolve: "gatsby-source-apiserver",
      options: breezyServerOptions
    },
    {
      resolve: "gatsby-source-apiserver",
      options: gitcoinServerOptions
    },
    {
      resolve: "gatsby-source-contentful",
      options: {
        spaceId: `pvsr19vg7gf2`,
        accessToken:
          process.env.PRODUCTION === "true"
            ? `e3b22c70dea0a1a493bb6d9ad550b73d8ce287d6b47fd9a6d624a0229a92eb9b`
            : `ae1115a81ba7be43ad060bdc094f907aff4275e9776fc1d3de7e1cc963f73612`,
        host:
          process.env.PRODUCTION === "true"
            ? `cdn.contentful.com`
            : `preview.contentful.com`
      }
    },
    {
      resolve: "@contentful/gatsby-transformer-contentful-richtext",
      options: {
        renderOptions: {
          renderNode: {
            [BLOCKS.HEADING_1]: node =>
              `<Heading level='1'>${node.content[0].value}</Heading>`,
            [BLOCKS.HEADING_2]: node =>
              `<Heading level='2'>${node.content[0].value}</Heading>`,
            [BLOCKS.HEADING_3]: node =>
              `<Heading level='3'>${node.content[0].value}</Heading>`,
            [BLOCKS.HEADING_4]: node =>
              `<Heading level='4'>${node.content[0].value}</Heading>`,
            [BLOCKS.HEADING_5]: node =>
              `<Heading level='5'>${node.content[0].value}</Heading>`,
            [BLOCKS.HEADING_6]: node =>
              `<Heading level='6'>${node.content[0].value}</Heading>`,

            [BLOCKS.EMBEDDED_ENTRY]: node => {
              switch (node.data.target.sys.contentType.sys.id) {
                case "componentButton":
                  const buttonFields = node.data.target.fields;
                  return `<Button primary href='${
                    buttonFields.link["en-US"]
                  }' label='${buttonFields.text["en-US"]}' />`;
                default:
                  return `<p>ENTRY NOT MAPPED</p>`;
              }
            }
          }
        }
      }
    },
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-catch-links`,
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-netlify-cache`,
    `gatsby-plugin-netlify`
  ],
  developMiddleware: app => {
    app.use(
      "/.netlify/functions/",
      proxy({
        target: "http://localhost:9000",
        pathRewrite: {
          "/.netlify/functions/": ""
        }
      })
    );
  }
};