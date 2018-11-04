import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'

const SecondPage = () => (
  <Layout>
    <h1>About</h1>
    <p>This is a blog</p>
    <Link to="/">Go back to the homepage</Link>
  </Layout>
)

export default SecondPage
