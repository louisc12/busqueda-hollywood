import React,{useState,useEffect} from 'react';
import {Text,StyleSheet,View,Image,TouchableOpacity,Modal,Button,TouchableHighlight} from 'react-native';
import * as ImagePicker from 'react-native-image-picker';

const Home = ({navigation}) => {
    const[visible,setVisible] = useState(false);
    const[image,setImage] = useState(null);
    const [buscando,SetBuscando] = useState(false);
    const [resultado,SetResultado] = useState(null);
    const [nombre,SetNombre] = useState(null);
    const [noEncontrado,setNoEncontrado] = useState(false);
    useEffect(()=>{
        if(image){
            
            const data = new FormData();
            data.append("file",{
                uri:image,
                name: "resultado.jpg",
                type: "resultado/jpg"
            });
            SetBuscando(true);
            fetch('https://whois.nomada.cloud/upload',{
                method:'POST',
                headers:{
                    "Nomada": "Nzg4MmIxYjAtMGVkNC00NzZkLTlkMmUtYjA3OGI4ZDQ0OWFj",
                },
                body:data
                
            })
            .then(res=>res.json())
            .then(res=>{
                SetNombre(res.actorName);
                SetBuscando(false);
                SetResultado(res);
            }
            )
            .catch(err=>{
                console.log(err);
                setNoEncontrado(true);
            }
            )
        }
        
    } ,[image])


    
    const Galeria = () => {
        ImagePicker.launchImageLibrary({includeBase64:true},(response) => {
            SetResultado(response.assets);
            const {uri} = response.assets[0];
            setImage(uri);
        });
    }

    const Camara = () => {
        ImagePicker.launchCamera({},(response) => {
            console.log(response);
            }
        );
    }

    const resetear = () => {
        setImage(null);
        setNoEncontrado(false);
        SetNombre(null);
        SetResultado(null);
    }

    const irDetalles = () => {
        setVisible(false);
        navigation.navigate('detalles',{
            nombre:nombre,
            resultado:resultado,
            image:image
        });
    }
    return (
        <View style={styles.contenedor}>
            <Text style={styles.texto1}>Hey,Dev <Image style={styles.imagen} source={require('../assets/emoji.png')}/> </Text>
            <Text style={styles.texto2}>Keep up the good work!</Text>
            <Text style={styles.texto3}>¿Quién es famoso?</Text>
            

            <TouchableOpacity onPress={() => setVisible(true)}>
                <View style={styles.contenedorBoton}>
                    <Image style={styles.imagen2} source={require('../assets/guardarImagen.png')}/>
                    <Text style={styles.textoBoton}>Presiona para elegir una fotos</Text>
                </View>
            </TouchableOpacity>
            
            {image ? <Modal transparent={true} animationType='slide' visible={visible} onRequestClose={()=> setVisible(false)}>
                <View style={styles.contenedorModal2} >
                    {nombre ? <Text style={styles.textoModal2}>Listo</Text> :<Text style={styles.textoModal2}>Subiendo ...</Text>}
                    {image && <Image style={styles.imagenModal} source={{uri:image}}/>}
                    {nombre ? <TouchableHighlight style={styles.botonEncontrado} onPress={() => irDetalles()}>
                        <Text style={styles.textoSubir}>{nombre}</Text> 
                    </TouchableHighlight> : <TouchableHighlight style={styles.botonSubir} onPress={() => setVisible(false)}>
                        <Text style={styles.textoSubir}>Subiendo ...</Text>
                    </TouchableHighlight>}
                    {!nombre && !image &&  <TouchableHighlight style={styles.botonError} onPress={() => setVisible(false)}>
                        <Text style={styles.textoSubir}>Error de red o servidor</Text>
                    </TouchableHighlight>}
                    {noEncontrado &&  <TouchableHighlight style={styles.botonNoEncontrado} onPress={() => setVisible(false)}>
                        <Text style={styles.textoSubir}>No encontrado</Text>
                    </TouchableHighlight>}
                    <Button title='Buscar Nuevo Actror/Actriz' onPress={() => resetear()}/>
                </View>
            </Modal>  : <Modal transparent={true} animationType='slide' visible={visible} onRequestClose={()=> setVisible(false)}>
                <View style={styles.contenedorModal} >
                    
                    <Text style={styles.textoModal}>Selecciona una foto</Text>
                    <TouchableOpacity onPress={Galeria}>
                        <View style={styles.contenedorOpcion}>
                            <Image style={styles.imagen} source={require('../assets/imagenes.jpeg')}/>
                            <Text style={styles.texto}>Galeria de fotos</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={Camara}>
                        <View style={styles.contenedorOpcion}>
                            <Image style={styles.imagen} source={require('../assets/camara.jpg')}/>
                            <Text style={styles.texto}>Camara</Text>
                        </View>
                    </TouchableOpacity>
                    <Button title='Cerrar' onPress={() => setVisible(!visible)}/>
                </View>
            </Modal>}
        </View>
    );
};

const styles = StyleSheet.create({
    contenedor:{
        flex:1,
        backgroundColor:'#fff'
    },
    contenedorModal:{
        height:'30%',
        marginTop:'auto',
        borderWidth:2,
        borderStyle:'solid',
        borderRadius:30,
        
    },
    contenedorModal2:{
        height:'45%',
        marginTop:'auto',
        borderWidth:2,
        borderStyle:'solid',
        borderRadius:30,
        justifyContent:'center',
        alignItems:'center'
        
    },
    texto:{
        fontSize: 20,
        color: '#000',
        fontWeight: '400',
    },
    texto1: {
        fontSize: 30,
        color: '#000',
        fontWeight: 'bold',
    },
    texto2: {
        fontSize: 20,
        color: '#334155',
        fontWeight: '500',
        marginBottom:30
    },
    imagen:{
        width:30,
        height:30
    },
    imagen2:{
        width:60,
        height:60,
    },
    imagen3:{
        width:'auto',
        height:'auto',
    },
    texto3:{
        fontSize:25,
        fontWeight:'bold',
    },
    textoSubir:{
        color:'#fff',
        textAlign   : 'center',
        fontSize:20,
        fontWeight:'bold',
    },
    textoBoton:{
        color:'#786FF6',
        fontSize:20,
        fontWeight:'bold',
        textAlign:'center',
    },
    contenedorBoton:{
        backgroundColor:'#f0f5fa',
        width:'90%',
        height:'42%',
        justifyContent:'center',
        alignItems:'center',
        marginVertical:20,
        marginHorizontal:20,
        borderWidth:3,
        borderRadius:1,
        borderColor:'#786FF6',
        borderStyle:'dashed',
    },
    contenedorOpcion:{
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center',
        marginVertical:10,
        marginHorizontal:30,
    },
    textoModal:{
        fontSize:20,
        fontWeight:'bold',
        marginBottom:30,
        marginTop:20,
        color:'#64748B',
        textAlign:'center',
    },
    textoModal2:{
        fontSize:18,
        fontWeight:'bold',
        marginBottom:10,
        marginTop:1,
        color:'#64748B',
        textAlign:'center',
    },
    imagenModal:{
        width:190,
        height:190,
        marginTop:1,
        borderRadius:10,
    },
    botonSubir:{
        backgroundColor:'#4321d8',
        marginTop:10,
        marginBottom:2,
        marginHorizontal:10,
        borderRadius:20,
        width:150,
        height:40,
        justifyContent:'center',
        alignItems:'center',
    },
    botonError:{
        backgroundColor:'#F75555',
        marginTop:10,
        marginBottom:2,
        marginHorizontal:10,
        borderRadius:20,
        width:150,
        height:40,
        justifyContent:'center',
        alignItems:'center',
    },
    botonNoEncontrado:{
        backgroundColor:'#FACC15',
        marginTop:10,
        marginBottom:2,
        marginHorizontal:10,
        borderRadius:20,
        width:150,
        height:40,
        justifyContent:'center',
        alignItems:'center',
    },
    botonEncontrado:{
        backgroundColor:'#4ADE80',
        marginTop:10,
        marginBottom:2,
        marginHorizontal:10,
        borderRadius:20,
        width:190,
        height:40,
        justifyContent:'center',
        alignItems:'center',
    },
});

export default Home;