import React from 'react'
import { Link } from 'gatsby'
import { Jumbotron, Button } from 'react-bootstrap';


const Header = () => (
  <Jumbotron>
    <div
      style={{
        margin: '0 auto',
        maxWidth: 980,
        padding: '1.45rem 1.0875rem',
      }}
   >
     <h1 style={{margin: 0, textAlign: 'center',fontSize: '18px'}}>
        <Link to="/"
          style={{
            color: 'black',
            textDecoration: 'none',
          }}
        >
          Bradford Condon, PhD
        </Link>
      </h1>
      <span></span>
    </div>
    </Jumbotron>
);

export default Header
