import React, { Component } from 'react';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';

class Comment extends Component {

  constructor(props) {
    super(props);
    this.refs= firebase.firestore().collection('comments');
    this.unsubscribe = null;
    this.state = {
      key: '',
      text: '',
      postID: '',
      author: '',
    };
    

  }

  componentDidMount() {
    const ref = firebase.firestore().collection('boards').doc(this.props.match.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        const board = doc.data();
        this.setState({
          key: doc.id,
          title: board.title,
          description: board.description,
          author: board.author,
          img: board.img
        });
      } else {
        console.log("No such document!");
      }
    });
  }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);

    
  }



  

  onSubmit = (e) => {
    e.preventDefault();

    const { text, postID, author } = this.state;

    this.ref.add({
      text,
      postID,
      author
    }).then((docRef) => {
      this.setState({
        text: '',
        postID: '',
        author: ''
      });
      this.props.history.push("/")
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
  }


  

  render() {
    const { text, postID, author } = this.state;

    return (
        <div class="container">
          <div class="panel panel-default">
            <div class="panel-heading">
              <h3 class="panel-title">
                ADD COMMENT
              </h3>
            </div>
            <div class="panel-body">
              <h4><Link to={`/show/${comment.postID}`}>Post</Link></h4>
              <form onSubmit={this.onSubmit}>
                <div class="form-group">
                  <label for="title">Comment:</label>
                  <input type="text" class="form-control" name="title" value={text} onChange={this.onChange} placeholder="Comment" />
                </div>
                <div class="form-group">
                  <label for="author">Author:</label>
                  <input type="text" class="form-control" name="author" value={author} onChange={this.onChange} placeholder="Author" />
                </div>
                <br/>
                <button type="submit" class="btn btn-success">Submit</button>
              </form>
              
            </div>
          </div>
        </div>
    );
}
}


export default Comment;