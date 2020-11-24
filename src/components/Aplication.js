import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firebase from '../Firebase';
import { app, firestore } from 'firebase';

class App extends Component {
  constructor(props) {
    super(props);
    this.unsubscribe = null;
    this.state = {
      ref:firebase.firestore().collection('boards').orderBy("date_time"),
      boards: [],
      filter: '*',
      user:firebase.auth().currentUser
    };
    this.ref = firebase.firestore().collection('boards').orderBy("date_time");
  }
  //se encarga de mantener la coleccion de la aplicacion en linea con la de firebase si hay actualizaciones
  onCollectionUpdate = (querySnapshot) => {
    const boards = [];
    querySnapshot.forEach((doc) => {
      const { title, description, author,date_time } = doc.data();
          boards.push({
          key: doc.id,
          doc, // DocumentSnapshot
          title,
          description,
          author,
          date_time
        })
      this.setState({
        boards
      })
    });
  }

  showColonia=(e=>{
    const boards=[];
    firebase.firestore().collection('boards').where('author','==','cormovo').orderBy("date_time").get().then((snapshot)=>{
      snapshot.forEach((doc=>{
        const { title, description, author,date_time } = doc.data();
          boards.push({
          key: doc.id,
          doc, // DocumentSnapshot
          title,
          description,
          author,
          date_time
        })
      this.setState({
        boards
      })
      }))
    });
  })

  showManada=(e=>{
    const boards=[];
    firebase.firestore().collection('boards').where('author','==','Carmavi').orderBy("date_time").get().then((snapshot)=>{
      snapshot.forEach((doc=>{
        const { title, description, author,date_time } = doc.data();
          boards.push({
          key: doc.id,
          doc, // DocumentSnapshot
          title,
          description,
          author,
          date_time
        })
      this.setState({
        boards
      })
      }))
    });
  })

  showAll=(e=>{
    const boards=[];
    firebase.firestore().collection('boards').orderBy("date_time").get().then((snapshot)=>{
      snapshot.forEach((doc=>{
        const { title, description, author,date_time } = doc.data();
          boards.push({
          key: doc.id,
          doc, // DocumentSnapshot
          title,
          description,
          author,
          date_time
        })
      this.setState({
        boards
      })
      }))
    });
  })

  componentDidMount() {
    this.unsubscribe = this.state.ref.onSnapshot(this.onCollectionUpdate);
  }

  render() {

    return (
      <div className="container">
        <p>Signed as {this.state.user.displayName}</p>
        <h4><Link to="/user">My Profile</Link></h4>
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">
              BOARD LIST
            </h3>
          </div>
          <div className="panel-body">
            <div id="filter">
              <p>Filter Sections</p>
            <button variant="contained" className="btn btn-success" onClick={this.showColonia.bind()}>
              Colonia
            </button>
            <button variant="contained" className="btn btn-success"onClick={this.showManada.bind()}>
              Manada
            </button>
            <button variant="contained" className="btn btn-success">
              Tropa
            </button>
            <button variant="contained" className="btn btn-success">
              Unidad
            </button>
            <button variant="contained" className="btn btn-success">
              Clan
            </button>
            <button variant="contained" className="btn btn-success" onClick={this.showAll.bind()}>
              All
            </button>
            </div>
            <h4><Link to="/create">Add Board</Link></h4>
            <table className="table table-stripe">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Author</th>
                  <th>Posted</th>
                </tr>
              </thead>
              <tbody>
                {this.state.boards.map(board =>
                  <tr>
                    <td><Link to={`/show/${board.key}`}>{board.title}</Link></td>
                    <td>{board.description}</td>
                    <td>{board.author}</td>
                    <td>{board.date_time}</td>
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