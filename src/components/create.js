import React, { useContext, Component } from 'react';
import ReactDOM from 'react-dom';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';
import { AuthProvider } from './Auth';
import { app } from 'firebase';


class Create extends Component {

  constructor() {
    super();
    this.ref = firebase.firestore().collection('boards');
    this.allImputs={imgUrl: ''}
    var user=firebase.auth().currentUser;
    if(user.displayName){
      this.state = {
        title: '',
        description: '',
        author: user.displayName,
        img:'',
        comments:{}
      };
    }else{
      this.state = {
        title: '',
        description: '',
        author: user.email,
        img:'',
        comments:{}
      };
    }
  }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);

    
  }

  onImgChange= (e)=>{
    var file = this.refs.file.files[0];
    var reader = new FileReader();
    var url = reader.readAsDataURL(file);

   reader.onloadend = function (e) {
      
      console.log(reader.result)
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

  onSubmit = (e) => {
    e.preventDefault();

    const { title, description, author,img ,comments} = this.state;

    this.ref.add({
      title,
      description,
      author,
      img,
      comments
    }).then((docRef) => {
      this.setState({
        title: '',
        description: '',
        author: '',
        img:'',
        comments:{}
      });
      this.props.history.push("/")
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
  }

  render() {
    const { title, description, author, imgurl, comments } = this.state;
    var user=firebase.auth().currentUser;
    const preAuthor=user.displayName;

    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              ADD BOARD
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to="/" class="btn btn-primary">Post List</Link></h4>
            <form onSubmit={this.onSubmit}>
              <div class="form-group">
                <label for="title">Title:</label>
                <input type="text" class="form-control" name="title" value={title} onChange={this.onChange} placeholder="Title" />
              </div>
              <div class="form-group">
                <label for="description">Description:</label>
                <textArea class="form-control" name="description" onChange={this.onChange} placeholder="Description" cols="80" rows="3">{description}</textArea>
              </div>
              <div class="form-group">
                <label for="author">Author:</label>
                <input type="text" class="form-control" name="author" value={preAuthor} onChange={this.onChange} placeholder={preAuthor} readonly/>
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
              <br/>
              <button type="submit" class="btn btn-success">Submit</button>
            </form>
            
          </div>
        </div>
      </div>
    );
  }
}

export default Create;