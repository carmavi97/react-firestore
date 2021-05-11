import React, { Component } from 'react';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';

class Galery extends Component{

    constructor(props) {
        super(props);
        this.unsubscribe = null;
        this.state = {
            images: []
        };

    }
/**
 * Se ejecuta cuando se ha cargado el componente, carga las imagenes del post en concreto que se esta viendo en el estatus para que se muestren
 */
    componentDidMount() {
        const imgs=[];
        const ref_img = firebase.firestore().collection('boards').doc(this.props.dataFromParent).collection('images').get().then(function (snapshot){
            snapshot.forEach((image)=>{
                const img=image.data();
                imgs.push(img.image);
            })
        }).then((done)=>{
            this.setState({
                isLoading: false,
                images: imgs
            })
        });
      }

    render() {
        const imagenes=this.state.images;
    
        return (
            <table class="table table-stripe">
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
        );
    }
}

export default Galery;