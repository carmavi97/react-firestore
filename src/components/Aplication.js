import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firebase from '../Firebase';
import { app, firestore } from 'firebase';

class App extends Component {
  constructor(props) {
    super(props);
    this.unsubscribe = null;
    this.state = {
      ref:firebase.firestore().collection('boards').orderBy("date_time","desc"),
      boards: [],
      filter: '*',
      user:firebase.auth().currentUser,
      admin:false
    };
    this.ref = firebase.firestore().collection('boards').orderBy("date_time","desc");
  }
  //se encarga de mantener la coleccion de la aplicacion en linea con la de firebase si hay actualizaciones
  onCollectionUpdate = (querySnapshot) => {
    const boards = [];
    const uName=this.state.user.displayName
      firebase.firestore().collection('users').where('userName','==',uName).get().then((snapshot)=>{
        snapshot.forEach((user)=>{
          const {admin}=user.data()
          this.setState({admin:admin});
        })
      })
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
    })
      
  }

  showColonia=(e=>{
    const boards=[];
    firebase.firestore().collection('boards').where('author','==','Colonia').orderBy("date_time","desc").get().then((snapshot)=>{
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
    firebase.firestore().collection('boards').where('author','==','Manada').orderBy("date_time","desc").get().then((snapshot)=>{
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

  showTropa=(e=>{
    const boards=[];
    firebase.firestore().collection('boards').where('author','==','Tropa').orderBy("date_time","desc").get().then((snapshot)=>{
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

  showUnidad=(e=>{
    const boards=[];
    firebase.firestore().collection('boards').where('author','==','Unidad').orderBy("date_time","desc").get().then((snapshot)=>{
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

  showClan=(e=>{
    const boards=[];
    firebase.firestore().collection('boards').where('author','==','Clan').orderBy("date_time","desc").get().then((snapshot)=>{
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
    firebase.firestore().collection('boards').orderBy("date_time","desc").get().then((snapshot)=>{
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
    this.unsubscribe = this.state.ref.onSnapshot(this.onCollectionUpdate)
  }

  render() {
    let add=<br/>;
    if(this.state.admin){
      add=<Link to="/create">Add Board</Link>
      console.log(this.state.admin)
    }
    

    return (
      <div className="container">
        <p>Signed as {this.state.user.displayName}</p>
        <Link to='/map'>mapa</Link>
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
            <button variant="contained" className="btn btn-success" onClick={this.showManada.bind()}>
              Manada
            </button>
            <button variant="contained" className="btn btn-success" onClick={this.showTropa.bind()}>
              Tropa
            </button>
            <button variant="contained" className="btn btn-success" onClick={this.showUnidad.bind()}>
              Unidad
            </button>
            <button variant="contained" className="btn btn-success" onClick={this.showClan.bind()}>
              Clan
            </button>
            <button variant="contained" className="btn btn-success" onClick={this.showAll.bind()}>
              All
            </button>
            </div>
            <h4>{add}</h4>
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