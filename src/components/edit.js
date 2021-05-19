import React, { Component } from 'react';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';
import Header from './Header';

class Edit extends Component {

  constructor(props) {
    super(props);
    this.state = {
      key: '',
      title: '',
      description: '',
      author: '',
      img:'',
      images:[]
    };
    

  }
/**
 * Este metodo se ejecuta una vez se ha cargado el componente y guarda los datos del post a editar en el estatus para que sean mostrados
 */
  componentDidMount() {
    const ref = firebase.firestore().collection('boards').doc(this.props.match.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        const board = doc.data();
        const imgs=[];
        const ref_img = firebase.firestore().collection('boards').doc(this.props.match.params.id).collection('images').get().then(function (snapshot){
          snapshot.forEach((image)=>{
              const img=image.data();
              imgs.push(img.image);
              
          })
      }).then((done)=>{
          this.setState({
              isLoading: false,
              images: imgs,
              key: doc.id,
              title: board.title,
              description: board.description,
              author: board.author
          })
      });
        this.setState({
          
        });
      } else {
        console.log("No such document!");
      }
    });
  }
/**
 * 
 * @param {*} e :El text area que ha sido actualizado
 * Actualiza el estado del componente con el contenido del text area
 */
  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState({board:state});

  }

  onImgChange= (e)=>{
    var file = this.refs.file.files[0];
    var reader = new FileReader();
    var url = reader.readAsDataURL(file);
    const imgs =this.state.images;
    reader.onloadend = function (e) {
      
      const imageToBase64 = require('image-to-base64');
      imageToBase64(reader.result) // you can also to use url
    .then(
      imgs.push(reader.result)
      //this.setState({ img:[reader.result]}) 
    ).then((done)=>{
      this.setState({
        images:imgs
      })
    })
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
/**
 * 
 * @param {*} e Es el formulario con la informacion del post actualizada que se desea guardar
 * Este metodo actualiza el post guardado en firebase con los datos nuevos 
 */
  onSubmit = (e) => {
    e.preventDefault();

    const { title, description, author, img } = this.state;
    const images=this.state.images;
    const updateRef = firebase.firestore().collection('boards').doc(this.state.key);
    
    updateRef.set({
      title,
      description,
      author,
      date_time: new Date().toLocaleString()
    }).then((done) =>{
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
    const imagenes=this.state.images;
    return (
      <div class="container">
        <Header/>
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
                <input type="text" class="form-control" name="author" value={this.state.author} onChange={this.onChange} placeholder="Author" readonly/>
              </div>
              <table class="table ">
              <thead>
                <tr>
                  <th>Images</th>
                </tr>
              </thead>
              <tbody>
                {imagenes.map(img =>
                  <tr>
                    <td><img src={img}></img></td>
                  </tr>
                )}
              </tbody>
            </table> 
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