import React, { useContext, Component } from 'react';
import {MapContainer, TileLayer, Marker, Popup, useMapEvents, useMapEvent} from 'react-leaflet';
import firebase from '../Firebase';
import emailjs from 'emailjs-com';
import Header from './Header';

class Create extends Component {

  constructor() {
    super();
    this.ref = firebase.firestore().collection('boards');
    this.allImputs={imgUrl: ''};
    this.handleSubmit = this.handleSubmit.bind(this);
    var user=firebase.auth().currentUser;
    
    if(user.displayName){
      this.state = {
        title: '',
        description: '',
        author: user.displayName,
        loaded:false,
        images:[],
        map:false
      };
    }else{
      this.state = {
        title: '',
        description: '',
        author: user.email,
        loaded:false,
        images:[],
        map:false,
        latlng:{
          lat:null,
          lng:null
        },
        selected:false
      };
    }
  }

  componentDidMount(){
    this.showMap=this.showMap.bind(this)
  }
/**
 * 
 * @param {*} e :El text area que ha sido actualizado
 * Actualiza el estado del componente con el contenido del text area
 */
  onChange = (e) => {
    if(e!=null){
      const state = this.state
      state[e.target.name] = e.target.value;
      this.setState(state);
    }
  }

  /**
   * 
   * @param {*} e : El input de la imagen seleccionada
   * Se crea un File reader para leer los dados de la imagen seleccionada en el input, una vez se ha optenido la imagen se para a base64 
   * y es añadida en el array del estatus del componente
   */
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
      
    ).then((done)=>{
      this.setState({
        images:imgs,
      })
    })
    .catch(
        (error) => {
            console.log(error); //Exepection error....
        }
    )
    }.bind(this);
    this.setState({
      loaded:true
    })
  }
/**
 * 
 * @param {*} e : Es el formulario del nuevo post que se desea crear
 * Se almacena la informacion de el estado en constantes y se crea un post nuevo en firebase, tras esto extrae dicho post aciendo un select del
 * post con la fecha y hora mas reciente para conseguir su ID y asi poder hace el insert de las imagenes que se desean para ese post
 */
   onSubmit = (e) => {
    e.preventDefault();
    this.handleSubmit();
    const { title, description, author,selected,latlng} = this.state;
    const images=this.state.images;
    if(selected){
      this.ref.add({
        title,
        description,
        author,
        date_time: new Date().toLocaleString(),
        selected,
        latlng
        
      }).then((docRef) => {
        const ref_2 = firebase.firestore().collection('boards').orderBy('date_time').limitToLast(1).get().then(function (snapshot){
          
          if (snapshot.docs[0].exists) {
              const boardId = snapshot.docs[0].id;
              images.forEach((image)=>{
                firebase.firestore().collection('boards').doc(boardId).collection('images').add({image});
              })
            
          }else{
            console.log("No such document!");
          }
        }).then((done) =>{
          this.setState({
            title: '',
            description: '',
            author: '',
          });
          this.props.history.push("/")
        });
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
    }else{
      this.ref.add({
        title,
        description,
        author,
        date_time: new Date().toLocaleString()
        
      }).then((docRef) => {
        const ref_2 = firebase.firestore().collection('boards').orderBy('date_time').limitToLast(1).get().then(function (snapshot){
          
          if (snapshot.docs[0].exists) {
              const boardId = snapshot.docs[0].id;
              images.forEach((image)=>{
                firebase.firestore().collection('boards').doc(boardId).collection('images').add({image});
              })
            
          }else{
            console.log("No such document!");
          }
        }).then((done) =>{
          this.setState({
            title: '',
            description: '',
            author: '',
          });
          this.props.history.push("/")
        });
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
    }
    
  }
/**
 * Este metodo se ejecuta al crea un post nuevo, buscara en cada usuario regristrado si esta subscrito, lo que se refleja
 * con un booleano en los datos del usuario, a la sección que ha creado dicho post para enviarle un correro con la informacion del post
 * usando el metodo sendFeedback
 */
  handleSubmit() {
    const templateId = 'template_jdhc679';
    const firebaseUser = firebase.auth().currentUser
    var user=firebase.auth().currentUser;
    firebase.firestore().collection('users').get().then((snapshot)=>{
      snapshot.forEach((doc)=>{
        const user=doc.data();
        
        if(user.userName!='Colonia'&&user.userName!='Manada'&&user.userName!='Tropa'&&user.userName!='Unidad'&&user.userName!='Clan'){
          if(user.Colonia==true&&firebaseUser.displayName=='Colonia'){
            this.sendFeedback(templateId, {message: this.state.description,nombre_actividad: this.state.title, nombre_seccion: this.state.author, reply_to: this.state.author+'@MFK500.es', to_name: user.userName,user_email: user.email})
          }
          if(user.Manada==true&&firebaseUser.displayName=='Manada'){
            this.sendFeedback(templateId, {message: this.state.description,nombre_actividad: this.state.title, nombre_seccion: this.state.author, reply_to: this.state.author+'@MFK500.es', to_name: user.userName,user_email: user.email})
          }
          if(user.Tropa==true&&firebaseUser.displayName=='Tropa'){
            this.sendFeedback(templateId, {message: this.state.description,nombre_actividad: this.state.title, nombre_seccion: this.state.author, reply_to: this.state.author+'@MFK500.es', to_name: user.userName,user_email: user.email})
          }
          if(user.Unidad==true&&firebaseUser.displayName=='Unidad'){
            this.sendFeedback(templateId, {message: this.state.description,nombre_actividad: this.state.title, nombre_seccion: this.state.author, reply_to: this.state.author+'@MFK500.es', to_name: user.userName,user_email: user.email})
          }
          if(user.Clan==true&&firebaseUser.displayName=='Clan'){
            this.sendFeedback(templateId, {message: this.state.description,nombre_actividad: this.state.title, nombre_seccion: this.state.author, reply_to: this.state.author+'@MFK500.es', to_name: user.userName,user_email: user.email})
          }
        }
      })
    })
	  
  }
/**
 * 
 * @param {string} templateId Es la id de la plantilla que se desea utilizar con el servicio de EmailJS
 * @param {JSON} variables Es un JSON que contiene el nombre de cada variable a sustuir en la plantilla y el valor de la misma
 * Este metodo utiliza el servicio de EmailJS para enviar un correo con la informacion del post a cada usuario registrado
 */
  sendFeedback (templateId, variables) {
    emailjs.send(
      'service_ptmyofq', templateId,
      variables,'user_cCSJHAl6ZPAeJZ6RU89X3'
      ).then(res => {
        console.log('Email successfully sent!')
      })
      // Handle errors here however you like, or use a React error boundary
      .catch(err => console.error('Oh well, you failed. Here some thoughts on the error that occured:', err))
    }

    LocationMarker() {
      //useMapEvents = useMapEvents.bind(this);
        const map = useMapEvents({
            click: (location) => {
              this.setState({latlng:{lat:location.latlng.lat,lng:location.latlng.lng},selected:true});
              map.flyTo(location.latlng, map.getZoom())
              }
        })
        return(null)
    
    }

    showMap(){
      this.setState({map:true});
    }

  render() {
    const { title, description, author, images} = this.state;
    var user=firebase.auth().currentUser;
    const preAuthor=user.displayName;
    this.LocationMarker=this.LocationMarker.bind(this)
    this.showMap=this.showMap.bind(this)
    let position=<Marker position={{lat:'1',lng:'1'}}></Marker>;

    if(this.state.selected){
      let lat=this.state.latlng.lat;
      let lng=this.state.latlng.lng
      position=<Marker position={{lat,lng}}>
      <Popup>
        Posicion guardada
      </Popup>
    </Marker>;
    }

    let coordinades=<br/>;
    if(this.state.map){
      coordinades=<MapContainer center={{lat:'37.8937611',lng:'-4.7844279'}} zoom='20' >
      <TileLayer
          url='https://{s}.tile.osm.org/{z}/{x}/{y}.png'
      />
      <this.LocationMarker />
      {position}
    </MapContainer>
    }
    
    return (
      <div class="container">
        <Header/>
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              ADD BOARD
            </h3>
          </div>
          <div class="panel-body">
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
              
              <table class="table">
              <thead>
                <tr>
                  <th>Images</th>
                </tr>
              </thead>
              <tbody>
                {images.map(img =>
                  <tr>
                    <td><img src={img}></img></td>
                  </tr>
                )}
              </tbody>
            </table> 
              <br/>
              {coordinades}
              <br/>
              <button type="submit" class="btn btn-success">Submit</button>
            </form>
            <br/>
            <div>
                <button variant="contained" className="btn btn-primary" onClick={this.showMap.bind()}>
                    Add location
                </button>
              </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Create;