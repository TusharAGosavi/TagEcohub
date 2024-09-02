module.exports = {
  siteMetadata: {
    title: "EcoBrew CMS",
    description: "A content management system built to promote sustainability.",
    author: "Tushar",
  },
  plugins: [
    "gatsby-plugin-react-helmet",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/src`, // Update this to the path where your Markdown files are located
        name: "content",
      },
    },
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    "gatsby-transformer-remark",
    "gatsby-plugin-netlify",
    "gatsby-plugin-sass",
  ],
};
