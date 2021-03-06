import React from 'react';
import {userSearchAction} from '../Actions/index';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import swal from 'bootstrap-sweetalert';
import {bake_cookie, read_cookie} from 'sfcookies';







class SearchVote extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            search:String

        };//end of this state


    }//end of contructor

    handleVoteSearch() {


        this.props.userSearchAction(this.state.search);
    }//end of handleVoteSearch

  

 


    render() {
        return(
            <div className="container">
                <div className="row">
                    <div className="col-md-6 col-md-offset-3">
                        <h1>Search For Votes</h1>
                    </div>
            </div>
            <div className="row">
                <div className="col-md-4 col-md-offset-3">
                    <form  action='' className="search-form" id='voteSearchInput' onSubmit={this.handleVoteSearch.bind(this)}>
                        <div className="form-group has-feedback">
                            
                            <input 
                            type="text" 
                            className="form-control" 
                            name="search" id="search" 
                            placeholder="Enter access token"
                            autoFocus
                            onChange = {event => this.setState({search:event.target.value})}
                            />
                            <span className="glyphicon glyphicon-search form-control-feedback"  ></span>
                        </div>
                    </form>
                </div>
                
                </div>
        </div>
        );//end of return
    }//end of render
}//end of app


function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        userSearchAction
    },
     dispatch)
}

function mapStateToProps(state) {
    return {
        search:state
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchVote);