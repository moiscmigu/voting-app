import React from 'react';
import {newVoteAction} from '../Actions/index';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import axios from 'axios';



class NewVote extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title:'',
            numOfVotes:Number
        };//end of state

    }//end of constructo]

    addNewVote() {  
        
        let votes = [];
        let tomorrow = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
        let votesInputValue = document.getElementsByName('voteInput');
        


        for(let v = 0; v < votesInputValue.length; v++) {
            votes.push({vote:votesInputValue[v].value, like:0});
        }//end of for loop

        
        let categories = {
            title:this.state.title,
            categories: votes,
            expDate: tomorrow
        };//enf of categories


        //posting vote to the data base
        if(categories.title === '' || categories.title === ' ' || categories.title === undefined) {
            swal(
                    'Please Enter a title',
                    '',
                    'error'
                  );
        } else {
        axios.post('/votes', categories).then(res => {
            if(res.status === 200) {
                swal(
                    'Your Access token is ' + res.data,
                    'Vote Created',
                    'success'
                  );
                  this.setState({
                    title:"",
                    numOfVotes:Number
                  })
            } else {
                swal(
                    'Error',
                    'Your Vote was not created',
                    'error'
                  )
            }
        });//end of axios
    }
        



        


    }//end of addNewVote

    displayNumOfVotes() {
      
        let arr = [];

        for(let v = 0; v < this.state.numOfVotes ; v++) {
            arr.push(v);
        }//end of for loop

        if(this.state.numOfVotes === 0) {
            return false;
        } else {


            return(
                <div>
                    {
                        arr.map((i, id) => {
                            return (
                                <div className="card w-75 card-block-1" key={id}>
                                    <div className="card-block-1">
                                        <input type="text" placeholder='Enter a category' name='voteInput'/>
                                        
                                    </div>
                                </div>
                              
                             
                               
                            );
                        })//end of map 
                    }
                </div>
            );///end of retrun  
        }//end of else statement       
    }//end of displayNumOfBotes

    render(){
        return(
            <div className="col-md-4 ">           
                <button id='startNewVoteButton' className="btn btn-danger" type="submit" data-toggle="modal" data-target="#myModal" >Start New Vote</button>

                <div id="myModal" className="modal fade" role="dialog">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                                <h4 className="modal-title" >Start New Vote</h4>
                            </div>
                            <div className="modal-body">

                                <input id='titleFocus' type="text" onChange={event => this.setState({title:event.target.value})}  placeholder='The title' value={this.state.title}/>
                                <input type="number" onChange={event => this.setState({numOfVotes:Number(event.target.value)}) } placeholder='How Many Categories?' value={this.state.numOfVotes}/>
                                {this.displayNumOfVotes()}

                                
                                
                            </div>
                            <div className="modal-footer">
                                <button type="button" className='btn btn-success'  data-dismiss="modal" onClick={this.addNewVote.bind(this)}>Submit</button>
                            </div>
                        </div>
                    
                    </div>
                </div>
            </div>
        );//end of return
    }//end of render

}//end of app


function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        newVoteAction
    },
     dispatch)
}

function mapStateToProps(state) {
    return {
        newVote:state
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewVote);