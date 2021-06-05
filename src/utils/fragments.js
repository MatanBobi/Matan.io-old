  
import {graphql} from 'gatsby'

export const bannerImage = graphql`
  fragment bannerImage260 on File {
    childImageSharp {
      fluid(maxWidth: 260, quality: 50, maxHeight: 170) {
        ...GatsbyImageSharpFluid_withWebp
      }
    }
  }
  fragment bannerImage640 on File {
    childImageSharp {
      fluid(maxWidth: 640) {
        ...GatsbyImageSharpFluid_withWebp
      }
    }
  }
  fragment bannerImage720 on File {
    childImageSharp {
      fluid(maxWidth: 720, quality: 75) {
        ...GatsbyImageSharpFluid_withWebp
      }
    }
  }
`
