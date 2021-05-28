import React, { Component, useReducer}  from 'react';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';
import Header from './Header';

class User extends Component {
    constructor(props) {
        super(props);
        this.unsubscribe = null;
        const user=firebase.auth().currentUser;
        this.state = {
            user: user,
            userName: user.displayName,
            email: user.email,
            userID:'',
            Colonia:false,
            Manada:false,
            Tropa:false,
            Unidad:false,
            Clan:false
        };
       this.newNameRef= React.createRef();
        this.handleClick = this.handleClick.bind(this);
    }
/**
 * Este metodo se ejecuta al cargarse le componente y descarla la informacion del usuario de firebase
 */
    componentDidMount(){
        const username=this.state.userName;
        firebase.firestore().collection('users').where('userName','==',username).get().then((snapshot)=>{
            snapshot.forEach((doc)=>{
                const {Colonia,Manada,Tropa,Unidad,Clan} = doc.data();
                this.setState({Colonia,Manada,Tropa,Unidad,Clan});
            })
        })
    }

/**
 * Este metodo cambia el nombre de usuario del usurario actual
 */
    changeName = (async event => {
        event.preventDefault();
        const { newUserName} = event.target.elements;
        try {
          
          firebase.auth().currentUser.updateProfile({
            displayName: newUserName.value
          }).then(
              this.setState({
                name: newUserName
                })
            ).then(
                alert('Nombre cambiado a, '+newUserName.value),
                this.props.history.push("/")
            )
          
        } catch (error) {
          alert(error);
        }
      })

     /**
      * 
      * @param {string} seccion Es un string con el nombre de la seccion que se desea seguir
      * Este metodo se ejecuta al pulsar uno de los botones para subscribirse a una sección y cambia el booleano que indica la subscripión de
      * un usuario a la información de una seccion concreta a true 
      */
      follow(seccion){
        const username=this.state.userName;
        firebase.firestore().collection('users').where('userName','==',username).get().then((snapshot)=>{
            snapshot.forEach((doc)=>{
                this.setState({
                    userID:doc.id
                })
                switch(seccion){
                    case 'Colonia':
                        firebase.firestore().collection('users').doc(this.state.userID).update({Colonia:true});
                        this.setState({Colonia:true});
                        break
                    case 'Manada':
                        firebase.firestore().collection('users').doc(this.state.userID).update({Manada:true});
                        this.setState({Manada:true});
                        break
                    case 'Tropa':
                        firebase.firestore().collection('users').doc(this.state.userID).update({Tropa:true});
                        this.setState({Tropa:true});
                        break
                    case 'Unidad':
                        firebase.firestore().collection('users').doc(this.state.userID).update({Unidad:true});
                        this.setState({Unidad:true});
                        break
                    case 'Clan':
                        firebase.firestore().collection('users').doc(this.state.userID).update({Clan:true});
                        this.setState({Clan:true});
                        break
                }
            })
        })
      }
    /**
      * 
      * @param {string} seccion Es un string con el nombre de la seccion que se desea dejar de seguir
      * Este metodo se ejecuta al pulsar uno de los botones para desubscribirse a una sección y cambia el booleano que indica la subscripión de
      * un usuario a la información de una seccion concreta a false 
      */
      unFollow(seccion){
        const username=this.state.userName;
        firebase.firestore().collection('users').where('userName','==',username).get().then((snapshot)=>{
            snapshot.forEach((doc)=>{
                this.setState({
                    userID:doc.id
                })
                switch(seccion){
                    case 'Colonia':
                        firebase.firestore().collection('users').doc(this.state.userID).update({Colonia:false});
                        this.setState({Colonia:false});
                        break
                    case 'Manada':
                        firebase.firestore().collection('users').doc(this.state.userID).update({Manada:false});
                        this.setState({Manada:false});
                        break
                    case 'Tropa':
                        firebase.firestore().collection('users').doc(this.state.userID).update({Tropa:false});
                        this.setState({Tropa:false});
                        break
                    case 'Unidad':
                        firebase.firestore().collection('users').doc(this.state.userID).update({Unidad:false});
                        this.setState({Unidad:false});
                        break
                    case 'Clan':
                        firebase.firestore().collection('users').doc(this.state.userID).update({Clan:false});
                        this.setState({Clan:false});
                        break
                }
            })
        })
      }
/**
 * 
 * @returns El html que se desea cargar
 * Este medodo ademas de cargar el html usa tambien una imagen en base64 para cargar en caso de que le usuario no tenga ademas de 
 * crear variables para cada sección y darles un valor dependiendo de si el usuario esta subscrito a ellas o no para que el html tenga un boton
 * o otro segun subscrito o no
 */
    render(){
        const {userName,email,Colonia,Manada,Tropa,Unidad,Clan}=this.state;
        let bColonia;
        let bManada;
        let bTropa;
        let bUnidad;
        let bClan;
        if(Colonia){
            bColonia=<button onClick={()=>this.unFollow('Colonia')} className="btn btn-danger">Dejar de recibir correos electronicos con las actividades de Colonia</button>
        }else{
            bColonia=<button onClick={()=>this.follow('Colonia')} className="btn btn-success">Recibir correos electronicos con las actividades de Colonia</button>
        }
        if(Manada){
            bManada=<button onClick={()=>this.unFollow('Manada')} className="btn btn-danger">Dejar de recibir correos electronicos con las actividades de Manada</button>
        }else{
            bManada=<button onClick={()=>this.follow('Manada')} className="btn btn-success">Recibir correos electronicos con las actividades de Manada</button>
        }
        if(Tropa){
            bTropa=<button onClick={()=>this.unFollow('Tropa')} className="btn btn-danger">Dejar de recibir correos electronicos con las actividades de Tropa</button>
        }else{
            bTropa=<button onClick={()=>this.follow('Tropa')} className="btn btn-success">Recibir correos electronicos con las actividades de Tropa</button>
        }
        if(Unidad){
            bUnidad=<button onClick={()=>this.unFollow('Unidad')} className="btn btn-danger">Dejar de recibir correos electronicos con las actividades de Unidad</button>
        }else{
            bUnidad=<button onClick={()=>this.follow('Unidad')} className="btn btn-success">Recibir correos electronicos con las actividades de Unidad</button>
        }
        if(Clan){
            bClan=<button onClick={()=>this.unFollow('Clan')} className="btn btn-danger">Dejar de recibir correos electronicos con las actividades de Clan</button>
        }else{
            bClan=<button onClick={()=>this.follow('Clan')} className="btn btn-success">Recibir correos electronicos con las actividades de Clan</button>
        }
        return (
            <div class="container">
                <Header/>
                <div class="panel panel-default">
                    <button onClick={() => firebase.auth().signOut().then(this.props.history.push("/"))}>Sign out</button>
                    <div class="panel-heading">
                    
                    </div>
                    <div class="panel-body" onClick={this.handleClick.bind(this)}>
                    </div>
                    <div>
                        User Name: {this.state.userName}
                        <br/>
                        <div>
                            <form onSubmit={this.changeName}>
                                <input type="text" name="newUserName"></input>
                                <button type="submit">Change User Name</button>
                            </form>
                        </div>
                        <table className="table">
                            <th>Subscripciones</th>
                            <tbody>
                                <td>{bColonia}</td>
                                <td>{bManada}</td>
                                <td>{bTropa}</td>
                                <td>{bUnidad}</td>
                                <td>{bClan}</td>
                            </tbody>
                        </table>   
                    </div>
                </div>
            </div>
        );
    }
}

export default User;