import React from 'react'
import { Link } from 'gatsby'

import { FaTwitter, FaGithub, FaLinkedin } from 'react-icons/fa'
import { IconContext } from 'react-icons'

const MyFooter = () => (
  <div
    className="container"
    style={{ display: 'flex', justifyContent: 'center' }}
  >
    <IconContext.Provider
      value={{ color: '#007bff', className: 'icon-footer', size: '5em' }}
    >
      <a href="https://twitter.com/bradfordcondon">
        {' '}
        <FaTwitter size={20} />
      </a>
      <a href="https://github.com/bradfordcondon">
        <FaGithub size={20}/>
      </a>
      <a href="https://www.linkedin.com/in/bradford-condon-0843823b/">
        <FaLinkedin size={20} />
      </a>
    </IconContext.Provider>

    <a href='https://pngtree.com/so/coffee'>coffee png from pngtree.com/</a>
  </div>
)

export default MyFooter
