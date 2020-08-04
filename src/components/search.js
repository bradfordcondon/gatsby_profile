import React, {Component, useState} from 'react'
import {Index} from 'elasticlunr'
import {Link} from 'gatsby'
import {ListGroup, ListGroupItem} from 'reactstrap'
import {useSpring, animated} from 'react-spring'

const SpringResults = ({results}) => {

  const [showAll, setShowAll] = useState(0);

  let length = results.length
  if (results.length > 3 && !showAll) {
    length = 3
  }

  //https://codesandbox.io/embed/lp80n9z7v9
  const springProps = useSpring({
    from: {
      height: 0,
      opacity: 0
    },
    to: {
      opacity: results.length > 0
        ? 1
        : 0,
      height: length * 80
    }
  })

  return (<animated.div style={springProps}>
    <ListGroup style={{
        margin: '0 2px'
      }}>
      {

        results.map((page, key) => {
          let showButton = false
          if (key == results.length - 1 && showAll) {

            showButton = true
          }

          if (key == 3 && !showAll) {
            return <button onClick={() => setShowAll(true)}>show all results</button>
          }
          if (key > 2 & !showAll) {
            return null
          }
          return (<ListGroupItem key={page.id}>
            <Link className="nav-link" to={'/' + page.slug}>
              {page.title}
            </Link>

            {
              showButton && <button onClick={() => setShowAll(false)}>
                  hide
                </button>
            }
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
