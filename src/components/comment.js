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
/**
 * Se ejecuta cuando se carga el componente y estrae los comentarios del post guardados en firebase para actualizar el estado
 */
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
/**
 * 
 * @param {*} e : La text area en la que se escriben nuevos comentarios
 * Cada vez que hay un cambio en el text area de un nuevo comentario guarda el texto en el estado de componente
 */
  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }
/**
 * 
 * @param {} e: El formulario que contiene le nuevo comentario 
 * Se ejecuta al enviar el comentario nuevo, añadiendolo a la subcoleción en firebase 
 */
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

  

  render() {
    const comments=this.state.comments;

    return (
        <div>
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