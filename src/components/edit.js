import React, { Component } from 'react';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';

class Edit extends Component {

  constructor(props) {
    super(props);
    this.state = {
      key: '',
      title: '',
      description: '',
      author: '',
      img:''
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
    this.setState({board:state});

    var user = firebase.auth().currentUser;

if (user != null) {
  user.providerData.forEach(function (profile) {
    console.log("Sign-in provider: " + profile.providerId);
    console.log("  Provider-specific UID: " + profile.uid);
    console.log("  Name: " + profile.displayName);
    console.log("  Email: " + profile.email);
    console.log("  Photo URL: " + profile.photoURL);
  });
}else{
  console.log("Va mal")
}
  }

  onImgChange= (e)=>{
    var reader = new FileReader();
    
   reader.onloadend = function (e) {
      const imageToBase64 = require('image-to-base64');
      imageToBase64(reader.result) // you can also to use url
    .then(
        this.setState({ img:[reader.result]})
        
    )
    .catch(
        (error) => {
            console.log(error); //Exepection error....
        }
    )
    }.bind(this);
  }

  imgDelete= (e)=>{
    this.setState({ img:''})
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { title, description, author, img } = this.state;

    const updateRef = firebase.firestore().collection('boards').doc(this.state.key);
    updateRef.set({
      title,
      description,
      author,
      img
    }).then((docRef) => {
      this.setState({
        key: '',
        title: '',
        description: '',
        author: '',
        img:''
      });
      this.props.history.push("/show/"+this.props.match.params.id)
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
  }

  

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              EDIT BOARD
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to={`/show/${this.state.key}`} class="btn btn-primary">Board List</Link></h4>
            <form onSubmit={this.onSubmit}>
              <div class="form-group">
                <label for="title">Title:</label>
                <input type="text" class="form-control" name="title" value={this.state.title} onChange={this.onChange} placeholder="Title" />
              </div>
              <div class="form-group">
                <label for="description">Description:</label>
                <input type="text" class="form-control" name="description" value={this.state.description} onChange={this.onChange} placeholder="Description" />
              </div>
              <div class="form-group">
                <label for="author">Author:</label>
                <input type="text" class="form-control" name="author" value={this.state.author} onChange={this.onChange} placeholder="Author" />
              </div>
              <div>
                <label for="image">Imagen:</label>
                <input 
                    ref="file" 
                    class="form-control"
                    type="file" 
                    name="user[image]" 
                    multiple="true"
                    onChange={this.onImgChange}/>
              </div>
              <img src={this.state.img} />
              <button class="btn btn-danger" onClick={this.imgDelete}>Delete Image</button>
              <br/>
              <br/>
              
              <button type="submit" class="btn btn-success" >Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Edit;