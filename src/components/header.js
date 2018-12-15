import React from 'react'
import {Link} from 'gatsby'
import {Jumbotron, InputGroup, InputGroupAddon, Form, Input, Button} from "reactstrap";
import algoliasearch from 'algoliasearch/lite';
import {InstantSearch, SearchBox, Hits} from 'react-instantsearch-dom';

import Navcomponent from './Navcomponent'

const searchClient = algoliasearch(
    'Y8SHL6PF2G',
    '5cb958188465bc857e6052fa967bdab0'
);

const Header = () => (
    <div>
        <Jumbotron className={'pb-0 pt-3 border-bottom'} style={{borderColor: '#ccc'}}>
            <div className="container">
                <div className="d-flex justify-content-between">
                    <Link to="/"
                          style={{
                              color: 'black',
                              textDecoration: 'none',
                          }}
                    >
                        <h1 className="display-6 font-weight-bold"> Bradford Condon, PhD</h1>
                        <p className="lead">Bionformatics, Data Science, Web & Mobile Development</p>
                    </Link>
                    <InstantSearch
                        indexName="prod_gatsby_bcondon"
                        searchClient={searchClient}
                    >
                        <SearchBox />
                        <Hits />
                    </InstantSearch>
                </div>
                <Navcomponent/>
            </div>
        </Jumbotron>
    </div>
);

export default Header
