import React, { Component } from 'react';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';

class Comment extends Component {

  constructor(props) {
    super(props);
    this.unsubscribe = null;
    this.state = {
      key: '',
      comments:[],
      newComment:''
    };

  }

  componentDidMount() {
    const comments=[];
    const ref = firebase.firestore().collection('boards').doc(this.props.dataFromParent).collection('comments').orderBy("date_time").get().then(function (snapshot_comments){
      snapshot_comments.forEach((comment)=>{
        const comm=comment.data();
        comments.push(comm);
      })
    }).then((done)=>{
      this.setState({
        comments:comments
      });
    })
  }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);

    
  }

  onSubmit = (e) => {
    e.preventDefault();

    const comment = this.state.newComment;
    var user=firebase.auth().currentUser;
    
    firebase.firestore().collection('boards').doc(this.props.dataFromParent).collection('comments').add({
      comment,
      author:user.displayName,
      date_time: new Date().toLocaleString()
      
    }).then((docRef) => {
      this.setState({
        newComment:''
      });
      window.location.reload(false);
    })
    .catch((error) => {
      console.error("Error adding comment: ", error);
    });    
  }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }
  

  render() {
    const comments=this.state.comments;

    return (
        <div class="container">
          <div class="panel-coments">
              <form onSubmit={this.onSubmit}>
              <div class="form-group">
              <table class="table table-stripe">
                <thead>
                  <tr>
                    <th>Comments</th>
                  </tr>
                </thead>
                <tbody>
                  {comments.map(comment =>
                    <tr>
                      <td>{comment.author}: {comment.comment} at {comment.date_time}</td>
                    </tr>
                  )}
                </tbody>
              </table>
                <label for="title">Writte a comment!</label>
                <textArea class="form-control" name="newComment" onChange={this.onChange} placeholder="Your Comment" cols="80" rows="3"></textArea>
                <br/>
                <button type="submit" class="btn btn-success">Submit</button>
              </div>
              </form>
            </div>
        </div>
    );
  }
}


export default Comment;