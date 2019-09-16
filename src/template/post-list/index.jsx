import React from 'react'
import { graphql } from 'gatsby'
import PropTypes from 'prop-types'

import PostItem from 'component/post-item'
import PageBtnContainer from 'component/page-btn'

import './index.scss'

const Post = ({ data, pageContext }) => {
  const { edges: posts } = data.allMarkdownRemark

  return (
    <div className="blog-posts">
      {
        posts
          .filter(post => post.node.frontmatter.title.length > 0)
          .map(({ node }) => <PostItem key={node.id} post={node} />)
      }
      <PageBtnContainer pageContext={pageContext} />
    </div>
  )
}

Post.propTypes = {
  data: PropTypes.object,
  pageContext: PropTypes.object,
}

export default Post

export const Posts = graphql`
  query Posts($skip: Int, $limit: Int, $categoryName: String) {
    allMarkdownRemark(
      sort: {fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
      filter: {frontmatter: {category: {eq: $categoryName } } }
    ) {
      edges {
        node {
          excerpt
          id
          frontmatter {
            title
            date(formatString: "YYYY/MM/DD")
            path
            tags
            author
          }
        }
      }
    }
  }
`