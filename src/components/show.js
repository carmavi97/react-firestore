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
      admin:false,
      seleted:false
    };
  }
/**
 * Este metodo se ejecuta al cargarse con exito el componente y descarga la informacion del post en cuestion que se desea leer gracias a su id
 * y la almacena en el estado del componente
 */
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
    
  }
/**
 * 
 * @param {*} id La ID del post que se esta leyendo
 * Este metodo borra el post de la coleccion y vuelve a la ventana principal de la aplicación
 */
  delete(id){
    firebase.firestore().collection('boards').doc(id).delete().then(() => {
      console.log("Document successfully deleted!");
      this.props.history.push("/")
    }).catch((error) => {
      console.error("Error removing document: ", error);
    });
  }

/**
 * 
 * @returns El Html que se carga en pantalla
 * Este metodo carga el html, ademas de comprobar si el usuario actual es administrador para permitirle actualizar o borrar el post
 */
  render() {
    let bEdit=<br/>;
    let bDelete=<br/>;
    let map=<br/>
    if(this.state.admin){
      bEdit=<Link to={`/edit/${this.state.key}`} class="btn btn-success">Edit</Link>
      bDelete=<button onClick={this.delete.bind(this, this.state.key)} class="btn btn-danger">Delete</button>
    }

    if(this.state.board.selected){
      map=<Maps dataFromParent = {this.props.match.params.id}/>
    }
    return (
      <div class="container">
        <div class="header">
          <h1><a href="https://www.facebook.com/gsmafeking500/">Asociacion scout de Córdoba </a></h1>
          <nav class="navbar navbar-expand-sm">
          <ul class="navbar-nav">
            <li class="nav-item active">
              <h3><Link to="/">Board List</Link></h3>
            </li>
          </ul>
        </nav>
        </div>
        <div class="panel panel-default">
          <div class="panel-heading">
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
              {map}
            </div>
            <br/>
            {bEdit}
            <br/>
            <br/>
            {bDelete}
            <br/>
            <br/>
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