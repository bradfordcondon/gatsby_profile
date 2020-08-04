import React, {Component} from 'react'
import {Index} from 'elasticlunr'
import {Link} from 'gatsby'
import {ListGroup, ListGroupItem} from 'reactstrap'
import {useSpring, animated} from 'react-spring'

const SpringResults = ({results}) => {

  let length = results.length
  if (results.length > 3){
    length = 3
  }

//https://codesandbox.io/embed/lp80n9z7v9
  const springProps = useSpring({
    from: {
      height: 0,
      opacity: 0
    },
    to: {
      opacity: results.length > 0 ? 1 : 0,
      height: length * 75
    }

  })
  // if (!results || results.length == 0) {
  //   console.log(results)
  //   return null
  // }

  return (<animated.div style={springProps}>
    <ListGroup style={{
        margin: '0 2px'
      }}>
      {

        results.map((page, key) => {

          if (key > 2){
            return null
          }
          return (<ListGroupItem key={page.id}>
            <Link className="nav-link" to={'/' + page.slug}>
              {page.title}
            </Link>
          </ListGroupItem>)
        })
      }
    </ListGroup>
  </animated.div>)

}

// Search component
export default class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      query: ``,
      results: []
    }
  }

  render() {
    return (<div className="searchbox">
      <input type="text" value={this.state.query} placeholder="search" onChange={this.search}/>

      <SpringResults results={this.state.results}/>
    </div>)
  }
  getOrCreateIndex = () => this.index
    ? this.index
    : // Create an elastic lunr index and hydrate with graphql query results
    Index.load(this.props.searchIndex)

  search = evt => {
    const query = evt.target.value
    this.index = this.getOrCreateIndex()
    let results = this.index.search(query, {})
    // Map over each ID and return the full document
      .map(({ref}) => this.index.documentStore.getDoc(ref))

    this.setState({
      query,
      // Query the index with search string to get an [] of IDs
      results: results
    })
  }
}
