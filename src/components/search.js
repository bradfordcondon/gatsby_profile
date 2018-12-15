import React, { Component } from "react"
import { Index } from "elasticlunr"
import {Link} from "gatsby"
import {ListGroup, ListGroupItem} from 'reactstrap'

// Search component
export default class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      query: ``,
      results: [],
      dropdownOpen: true
    }
  }


  render() {
    return (
      <div>
        <input type="text" value={this.state.query} onChange={this.search} />
        <ListGroup      style={{margin: '0 2px'}}>
          {this.state.results.map(page => (
            <ListGroupItem key={page.id}>
               <Link className="nav-link" to={"/" + page.slug}>{page.title}</Link>
            </ListGroupItem>
          ))}
        </ListGroup>
      </div>
    )
  }
  getOrCreateIndex = () =>
    this.index
      ? this.index
      : // Create an elastic lunr index and hydrate with graphql query results
        Index.load(this.props.searchIndex)

  search = evt => {
    const query = evt.target.value
    this.index = this.getOrCreateIndex()
    let results = this.index
      .search(query, {})
      // Map over each ID and return the full document
      .map(({ ref }) => this.index.documentStore.getDoc(ref))

      let show = true
      // console.log(results)
      //
      // if (results.isEmpty()){
      //   show = false
      // }
      console.log(show)

    this.setState({
      query,
      // Query the index with search string to get an [] of IDs
      results: results,
      dropdownOpen: show
    })
  }
}
