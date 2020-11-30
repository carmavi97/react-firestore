import React, { Component, useReducer}  from 'react';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';


class User extends Component {
    constructor(props) {
        super(props);
        this.unsubscribe = null;
        const user=firebase.auth().currentUser;
        this.state = {
            user: user,
            userName: user.displayName,
            email: user.email,
            picture: user.photoURL,
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

    componentDidMount(){
        const username=this.state.userName;
        firebase.firestore().collection('users').where('userName','==',username).get().then((snapshot)=>{
            snapshot.forEach((doc)=>{
                const {Colonia,Manada,Tropa,Unidad,Clan} = doc.data();
                this.setState({Colonia,Manada,Tropa,Unidad,Clan});
            })
        })
    }

    onImgChange= (e)=>{
        var file = this.refs.fileUploader.files[0];
        var reader = new FileReader();
        var url = reader.readAsDataURL(file);
    
       reader.onloadend = function (e) {
          
          console.log(reader.result)
          const imageToBase64 = require('image-to-base64');
          imageToBase64(reader.result) // you can also to use url
        .then(
            firebase.auth().currentUser.updateProfile({
                photoURL: [reader.result]
            })
        ).then(
            this.setState({ picture:[reader.result]})
        ).then(
            console.log(this.state.user.photoURL)
        )
        .catch(
            (error) => {
                console.log(error); //Exepection error....
            }
        )
        }.bind(this);
      }
 
    handleClick(e) {
        this.refs.fileUploader.click();
    }


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

    render(){
        const {userName,email,picture,Colonia,Manada,Tropa,Unidad,Clan}=this.state;
        const imgDef="data:image/jpeg;base64,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";
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
                <button onClick={() => firebase.auth().signOut().then(this.props.history.push("/"))}>Sign out</button>
                <div class="panel panel-default">
                    <div class="panel-heading">
                    <h4><Link to="/">Board List</Link></h4>
                    </div>
                    <div class="panel-body" onClick={this.handleClick.bind(this)}>
                        {this.state.picture!=null&&<img src={this.state.picture} />}
                        {this.state.picture==null&&<img src={imgDef}/>}
                        <input 
                            class="form-control"
                            type="file" 
                            name="user[image]" 
                            multiple="true"
                            onChange={this.onImgChange}
                            style={{display: "none"}}
                            ref="fileUploader"/>
                        <br/>
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
                        <div>
                        <table className="table table-stripe">
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
                        <h4><Link to="/create">Add Board</Link></h4>
                    </div>
                </div>
            </div>
        );
    }
}

export default User;