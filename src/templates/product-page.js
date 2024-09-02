import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import Features from "../components/Features";
import Testimonials from "../components/Testimonials";
import Pricing from "../components/Pricing";
import PreviewCompatibleImage from "../components/PreviewCompatibleImage";
import FullWidthImage from "../components/FullWidthImage";

// eslint-disable-next-line
export const ProductPageTemplate = ({
  image,
  title,
  heading,
  description,
  intro,
  main,
  testimonials,
  fullImage, // This might be undefined if not in frontmatter
  pricing,
}) => {
  // Treat `image` as a URL or path
  const heroImage = image;
  const fullWidthImage = fullImage ? fullImage : null; // Handle fullImage similarly

  return (
    <div className="content">
      <FullWidthImage img={heroImage} title={title} />
      <section className="section section--gradient">
        <div className="container">
          <div className="section">
            <div className="columns">
              <div className="column is-7 is-offset-1">
                <h3 className="has-text-weight-semibold is-size-2">
                  {heading}
                </h3>
                <p>{description}</p>
              </div>
            </div>
            <div className="columns">
              <div className="column is-10 is-offset-1">
                <Features gridItems={intro.blurbs} />
                <div className="columns">
                  <div className="column is-7">
                    <h3 className="has-text-weight-semibold is-size-3">
                      {main.heading}
                    </h3>
                    <p>{main.description}</p>
                  </div>
                </div>
                {fullWidthImage && (
                  <div className="column is-10 is-offset-1">
                    <PreviewCompatibleImage imageInfo={{ image: fullWidthImage }} />
                  </div>
                )}
                <Pricing pricing={pricing} />
                <Testimonials testimonials={testimonials} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

ProductPageTemplate.propTypes = {
  image: PropTypes.string, // Changed from PropTypes.oneOfType
  title: PropTypes.string,
  heading: PropTypes.string,
  description: PropTypes.string,
  intro: PropTypes.shape({
    blurbs: PropTypes.array,
  }),
  main: PropTypes.shape({
    heading: PropTypes.string,
    description: PropTypes.string,
  }),
  testimonials: PropTypes.array,
  fullImage: PropTypes.string, // Changed from PropTypes.oneOfType
  pricing: PropTypes.shape({
    heading: PropTypes.string,
    plans: PropTypes.array,
  }),
};

const ProductPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;

  return (
    <Layout>
      <ProductPageTemplate
        image={frontmatter.image}
        title={frontmatter.title}
        heading={frontmatter.heading}
        description={frontmatter.description}
        intro={frontmatter.intro}
        main={frontmatter.main}
        testimonials={frontmatter.testimonials}
        fullImage={frontmatter.fullImage} // Will be undefined if not in frontmatter
        pricing={frontmatter.pricing}
      />
    </Layout>
  );
};

ProductPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
};

export default ProductPage;

export const pageQuery = graphql`
  query ProductPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "product-page" } }) {
      frontmatter {
        title
        image
        heading
        description
        intro {
          blurbs {
            image
            text
          }
          heading
          description
        }
        main {
          heading
          description
        }
        testimonials {
          author
          quote
        }
        fullImage
        pricing {
          heading
          plans {
            description
            items {
              plan
              price
            }
          }
        }
      }
    }
  }
`;
