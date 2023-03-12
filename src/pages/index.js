import React, { useState } from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../components/layout'//Layout is only for non-splash pages.
import {
  Badge,
  Col,
  Row,
  Card,
  CardImg,
  CardBody,
  CardText,
} from 'reactstrap'
import { NodeGroup } from 'react-move'
import { MyHelmet } from '../components/layout.js'

import Typist from 'react-typist-component';

const standardDelay=5000

const IndexPage = (page) => {
  const data = page.data
  const badgeTypes = [
    'primary', 'success', 'danger', 'info', 'light', 'dark', 'warning'
  ]

  return (
    <Layout data={data} landing={true}>
      <div className="splash">
        <div className="splash__container">
          <p class="splash__container__text">
            Bradford Condon {" "}
            <Typist typingDelay={100} loop={true} >
              <Typist.Delay ms={standardDelay} />
              <span>PhD</span>
              <Typist.Delay ms={standardDelay} />
              <Typist.Backspace count={100}  />
              <span>Web Developer</span>
              <Typist.Delay ms={standardDelay} />
              <Typist.Backspace count={100}  />
              <span>Scientist</span>
              <Typist.Delay ms={standardDelay} />
              <Typist.Backspace count={100}  />
              <span>Dog Person</span>
              <Typist.Delay ms={standardDelay} />
              <Typist.Backspace count={100} />
              <span>Computer Person</span>
              <Typist.Delay ms={standardDelay} />
              <Typist.Backspace count={100}  />
            </Typist>
          </p>
        </div>
      </div>
    </Layout>
  )
}


export default IndexPage
