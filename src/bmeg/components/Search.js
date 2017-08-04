import React, { Component } from 'react'
import { render } from 'react-dom'
import { connect } from "react-redux";

export class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: "",
      timeout: null
    }
    this.debounceInterval = 500;
  }

  triggerSearch(value) {
    const {dispatch, scope} = this.props;
    return new Promise((resolve, reject) => {
      dispatch({
        type: 'SEARCH_ALL_SUBMIT',
        scope: scope,
        search: value,
        callbackError: (error) => {
          reject({_error: error});
        },
        callbackSuccess: () => {
          resolve();
        }
      });
    });
  }

  handleChange(event) {
    if (this.state.timeout) {
      clearTimeout(this.state.timeout);
      this.setState({timeout: null});
    }

    var value = event.target.value;
    var self = this;
    var timeout = setTimeout(function() {self.triggerSearch(value)}, this.debounceInterval)
    this.setState({text: value, timeout: timeout})
  }

  render() {
    return (
      <div>
        <input id="search-input" type="text" onChange={this.handleChange.bind(this)} />
      </div>
    )
  }
}

function mapStateToProps(state, own) {
  return state.search;
}
export default connect(mapStateToProps) (Search);
