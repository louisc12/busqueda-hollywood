//componente de tarjeta 
import React from 'react';
import {StyleSheet,Text,View,Image} from 'react-native';

const Card = ({promedio,resumen,foto,titulo,nombre}) => {
    return (
        <View style={styles.card}>
           
            <View style={styles.cardBody}>
                <Image source={{uri:`https://image.tmdb.org/t/p/w500${foto}`}} style={styles.cardImage}/>
                <Text style={styles.cardHeaderText}>{nombre}</Text>
                <Text style={styles.cardHeaderText}>{titulo}</Text>
                <Text style={styles.promedio}>{promedio}</Text>
                <Image style={styles.imagen} source={require('../assets/estrella.jpg')}/>
            </View>
            <View style={styles.texto}>
                    <Text style={styles.resumen}>{resumen}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card:{
        flex:1,
        margin:20,
        paddingHorizontal:1,
        width:350,
        height:350,
        backgroundColor:'#f0f5fa',
        borderRadius:10,
        marginTop:10,
    },
    cardHeaderText:{
        fontSize:27,
        fontWeight:'bold',
        color:'#000',
        paddingTop:0,
        paddingLeft:20,

    },
    cardImage:{
        height:180,
        width:100,
        borderRadius:10,
        marginLeft:10,
        marginTop:10,
        position:'absolute',
        top:68,
        left:200,
    },
    resumen:{
        marginTop:3,
        fontSize:13,
        color:'#000',
        textAlign:'justify',
    },
    promedio:{
        fontSize:15,
        color:'#000',
        fontWeight:'600',
        textAlign:'auto',
        position:'absolute',
        top:262,
        left:242,
    },
    imagen:{
        width:15,
        height:15,
        position:'absolute',
        top:263,
        left:266,
    },
    texto:{
        width:180,
        height:300,
        marginTop:0,
        marginLeft:10,
        marginRight:40,
        textAlign:'justify',
        paddingLeft:5,
    }
})

export default Card;