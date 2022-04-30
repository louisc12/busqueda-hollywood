import React,{useState,useEffect} from 'react';
import {View,Text,StyleSheet,Button,Image,ScrollView,TouchableOpacity} from 'react-native';
import Card from '../components/card';

const Detalles = ({navigation,route}) => {
    const {nombre} = route.params;

    const [informacion,SetInformacion] = useState({});
    const [peliculas,setPeliculas] = useState(null);
   
    const irHome = () => {
        navigation.navigate('Home');
    }

    //funcion para obtener la informacion de la api
    const obtenerInformacion = async () => {
        const url = `https://api.themoviedb.org/3/search/person?api_key=30db1237b9167f8afaf9e065b90d16b8&query='+${nombre}`;
        const response = await fetch(url);
        const data = await response.json();
        SetInformacion(data.results[0]);
        setPeliculas(data.results[0].known_for);
        setIsLoading(false);
        setFotos(data.results[0].known_for.map(pelicula => pelicula.poster_path));
    }

    useEffect(()=>{
        try {
            obtenerInformacion();
        } catch (error) {
            console.log(error);
        }
    },[])

    return (
        <View style={styles.contenedor}>
            <View>
                {console.log(informacion)}
                <Image source={{uri:`https://image.tmdb.org/t/p/w500${informacion.profile_path}`}} style={styles.imagen}/>
                <Text style={styles.textoNombre}>{informacion.name}</Text>
                <TouchableOpacity style={styles.genero}>
                    <Text style={styles.etiqueta}>{informacion.gender === 1 ? 'Mujer' : 'Hombre'}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.botonRegresar} onPress={()=> irHome()}>
                    <Image style={styles.botonRegresar} source={require('../assets/regresar.png')}/>
                </TouchableOpacity>
                <Text style={styles.etiquelaPopularidad}>Popularidad:</Text>
                <Image style={styles.pop} source={require('../assets/png-transparent-star-computer-icons-star.png')}/>
                <Text style={styles.popularity}>{informacion.popularity}</Text>
               
             </View>
             <ScrollView>
             <View style={styles.contenedo2}>
                 <Text style={styles.etiquetaPeliculas}>Peliculas:</Text>
                 {peliculas ? peliculas.map((pelicula,index)=>{
                        return(
                            <Card promedio={pelicula.vote_average} resumen={pelicula.overview} foto={pelicula.poster_path} titulo={pelicula.title} nombre={pelicula.name} key={index}/>
                        )
                 }
                    ) : null}
             </View>
                </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    contenedor:{
        flex:1,
        backgroundColor:'#fff',
        
    },
    imagen:{
        width:400,
        height:300,
    },
    pop:{
        width:20,
        height:20,
        position:'absolute',
        top:263,
        left:357,
        borderRadius:10,
    },
    contenedo2:{
        flex:1,
        backgroundColor:'#fff',
       
    },
    textoNombre:{
        fontSize:30,
        color:'#fff',
        fontWeight:'bold',
        marginTop:20,
        position:'absolute',
        top:200,
        left:10,
    },
    popularity:{
        fontSize:20,
        color:'#fff',
        fontWeight:'bold',
        marginTop:20,
        position:'absolute',
        top:240,
        left:280,
        borderRadius:10,
    },
    genero:{
        backgroundColor:'#ffd000',
        borderWidth:2,
        borderStyle:'solid',
        borderRadius:30,
        width:100,
        height:30,
        position:'absolute',
        top:260,
        left:10,
    },
    etiqueta:{
        fontSize:15,
        fontWeight:'bold',
        marginTop:5,
        marginLeft:5,
        textAlign:'center',
    },
    etiquelaPopularidad:{
        fontSize:15,
        color:'#fff',
        fontWeight:'bold',
        position:'absolute',
        top:240,
        left:270,
    },
    etiquetaPeliculas:{
        fontSize:35,
        fontWeight:'700',
        justifyContent:'flex-start',
        alignItems:'flex-start',
        marginLeft:20,
        marginTop:30,
        marginBottom:10,
    },
    contenedorPeliculas:{
        flexDirection:'row',
        alignContent:'',
        marginTop:10,
        marginLeft:10,
        marginRight:10,
        marginBottom:10,
        backgroundColor:'#f0f5fa',
        borderRadius:10,
    },
    imagenPeliculas:{
        width:100,
        height:100,
    },
    textoPeliculas:{
        fontSize:20,
        fontWeight:'bold',
        textAlign:'left',
        
    },
    botonHome:{
        position:'absolute',
        top:10,
        left:10,
    },
    botonRegresar:{
        width:40,
        height:40,
        position:'absolute',
        top:5,
        left:5,
        borderRadius:20,
    },
});
export default Detalles;
