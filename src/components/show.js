import React, { Component } from 'react';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';
import Comment from '../components/Comment'
import Galery from './Galery';
class Show extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      board: {},
      images: [],
      key: '',
      comments:[],
      newComment:''
    };
  }

   componentDidMount() {
    const imgs=[];
    const comments=[];
    const ref = firebase.firestore().collection('boards').doc(this.props.match.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        const ref_img = firebase.firestore().collection('boards').doc(doc.id).collection('images').get().then(function (snapshot){
          snapshot.forEach((image)=>{
            const img=image.data();
            imgs.push(img.image);
          })
        }).then((done)=>{
          const ref_comments = firebase.firestore().collection('boards').doc(doc.id).collection('comments').get().then(function (snapshot_comments){
            snapshot_comments.forEach((comment)=>{
              const comm=comment.data();
              comments.push(comm);
            })
          }).then((done)=>{
            this.setState({
              board: doc.data(),
              key: doc.id,
              isLoading: false,
              images: imgs,
              comments:comments
            });
          })
        });
        
      } else {
        console.log("No such document!");
      }
    });
    //const imagenes=this.state.images;
    
  }

  onSubmit = (e) => {
    e.preventDefault();

    const comment = this.state.newComment;
    var user=firebase.auth().currentUser;
    const ref = firebase.firestore().collection('boards').doc(this.props.match.params.id).collection('comments');
    
    firebase.firestore().collection('boards').doc(this.props.match.params.id).collection('comments').add({
      comment,
      author:user.displayName,
      date_time: new Date().toLocaleString()
      
    }).then((docRef) => {
      this.setState({
        newComment:''
      });
      this.props.history.push("/show/"+this.props.match.params.id)
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

  delete(id){
    firebase.firestore().collection('boards').doc(id).delete().then(() => {
      console.log("Document successfully deleted!");
      this.props.history.push("/")
    }).catch((error) => {
      console.error("Error removing document: ", error);
    });
  }

  render() {

    const imagenes=this.state.images;
    const comments=this.state.comments;
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
          <h4><Link to="/">Board List</Link></h4>
            <h3 class="panel-title">
              {this.state.board.title}
            </h3>
          </div>
          <div class="panel-body">
            <dl>
              <dt>Description:</dt>
              <dd>{this.state.board.description}</dd>
              <dt>Author:</dt>
              <dd>{this.state.board.author}</dd>
            </dl>
            <Galery dataFromParent = {this.props.match.params.id}/>
            <Link to={`/edit/${this.state.key}`} class="btn btn-success">Edit</Link>&nbsp;
            <button onClick={this.delete.bind(this, this.state.key)} class="btn btn-danger">Delete</button>
            <div class="panel-coments">
              <Comment dataFromParent = {this.props.match.params.id}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Show;