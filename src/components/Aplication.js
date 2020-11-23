import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firebase from '../Firebase';
import { app, firestore } from 'firebase';

class App extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('boards');
    this.unsubscribe = null;
    this.state = {
      boards: [],
      user:firebase.auth().currentUser
    };
  }
  //se encarga de mantener la coleccion de la aplicacion en linea con la de firebase si hay actualizaciones
  onCollectionUpdate = (querySnapshot) => {
    const boards = [];
    querySnapshot.forEach((doc) => {
      const { title, description, author } = doc.data();
      const ref_img = firebase.firestore().collection('boards').doc(doc.id).collection('images').get().then(function (snapshot){
          snapshot.forEach((image)=>{
            const {img}=image.data();
            console.log(img);
            boards.push({
              key: doc.id,
              doc, // DocumentSnapshot
              title,
              description,
              author,
              img
            });
          })
      }).then((done)=>{
        this.setState({
          boards
       });
       console.log(this.state.boards);
      })
    });
  }

  
  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  render() {

    return (
      <div class="container">
        <p>Signed as {this.state.user.displayName}</p>
        <h4><Link to="/user">My Profile</Link></h4>
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              BOARD LIST
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to="/create">Add Board</Link></h4>
            <table class="table table-stripe">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Author</th>
                  <th>Imagen</th>
            </tr>
              </thead>
              <tbody>
                {this.state.boards.map(board =>
                  <tr>
                    <td><Link to={`/show/${board.key}`}>{board.title}</Link></td>
                    <td>{board.description}</td>
                    <td>{board.author}</td>
                    <td><img src={board.img}></img></td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default App;