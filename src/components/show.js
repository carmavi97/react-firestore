import React, { Component } from 'react';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';
import Comment from '../components/Comment'
import Galery from './Galery';
import Maps from './Maps';
class Show extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      board: {},
      key: '',
      newComment:'',
      user:firebase.auth().currentUser,
      admin:false
    };
  }

   componentDidMount() {
    
    const ref = firebase.firestore().collection('boards').doc(this.props.match.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        var currentUser=firebase.auth().currentUser;
        this.setState({
          board: doc.data(),
          key: doc.id,
          isLoading: false,
          user: currentUser
        });
        
      } else {
        console.log("No such document!");
      }
    }).then(()=>{
      const uName=this.state.user.displayName
      firebase.firestore().collection('users').where('userName','==',uName).get().then((snapshot)=>{
        snapshot.forEach((user)=>{
          const {admin}=user.data()
          
          this.setState({admin});
          
        })
      })
    })
    //const imagenes=this.state.images;
    
  }

  delete(id){
    firebase.firestore().collection('boards').doc(id).delete().then(() => {
      console.log("Document successfully deleted!");
      this.props.history.push("/")
    }).catch((error) => {
      console.error("Error removing document: ", error);
    });
  }

  follow= (e)=>{
    const userID='';
    const author=this.state.board.author;
    const currentUser=firebase.auth().currentUser;
    if(author=='Colonia'){
      firebase.firestore().collection('users').where("userName","==",currentUser).then((snapshot)=>{
        snapshot.forEach(doc=>{
          userID=doc.id;
          firebase.firestore().collection('users').doc(userID).set({Colonia: true})
        })
      })
    }if(this.state.board.author=='Manada'){
      firebase.firestore().collection('users').where("userName","==",firebase.auth().currentUser).then((snapshot)=>{
        snapshot.forEach(doc=>{
          userID=doc.id;
          firebase.firestore().collection('users').doc(userID).set({Manada: true})
        })
      })
    }if(this.state.board.author=='Tropa'){
      firebase.firestore().collection('users').where("userName","==",firebase.auth().currentUser).then((snapshot)=>{
        snapshot.forEach(doc=>{
          userID=doc.id;
          firebase.firestore().collection('users').doc(userID).set({Tropa: true})
        })
      })
    }if(this.state.board.author=='Unidad'){
      firebase.firestore().collection('users').where("userName","==",firebase.auth().currentUser).then((snapshot)=>{
        snapshot.forEach(doc=>{
          userID=doc.id;
          firebase.firestore().collection('users').doc(userID).set({Unidad: true})
        })
      })
    }if(this.state.board.author=='Clan'){
      firebase.firestore().collection('users').where("userName","==",firebase.auth().currentUser).then((snapshot)=>{
        snapshot.forEach(doc=>{
          userID=doc.id;
          firebase.firestore().collection('users').doc(userID).set({Clan: true})
        })
      })
    }
  }

  render() {
    let bEdit=<br/>;
    let bDelete=<br/>;
    if(this.state.admin){
      bEdit=<Link to={`/edit/${this.state.key}`} class="btn btn-success">Edit</Link>
      bDelete=<button onClick={this.delete.bind(this, this.state.key)} class="btn btn-danger">Delete</button>
    }

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
            <div id="mapas">

            </div>
            {bDelete}
            
            {bEdit}
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