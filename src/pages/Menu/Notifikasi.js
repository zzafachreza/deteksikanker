import { ActivityIndicator, FlatList, Image, ImageBackground, Linking, SafeAreaView, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { DimensionThisPhone, colors, fonts, windowHeight, windowWidth } from '../../utils'
import { Icon } from 'react-native-elements';
import axios from 'axios';
import { apiURL } from '../../utils/localStorage';
import moment from 'moment';
import { MyHeader, MyInput } from '../../components';
export default function ({ navigation, route }) {
    const item = route.params;
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false);

    const getDataTransaksi = () => {
        setLoading(true);
        axios.post(apiURL + 'satuan').then(res => {
            console.log(res.data);
            setData(res.data);
            setTMP(res.data)
        }).finally(() => {
            setLoading(false)
        })
    }

    useEffect(() => {
        getDataTransaksi();
    }, []);

    const __renderItem = ({ item }) => {
        return (



            <TouchableWithoutFeedback onPress={() => {
                navigation.navigate('Pushdata', item)
            }}>
                <View style={{
                    flex: 1,
                    margin: 10,
                    height: windowHeight / 3,
                    backgroundColor: colors.white,
                    opacity: 0.9,
                    padding: 10,
                    marginBottom: 20,
                    width: '100%',
                    alignItems: 'center',
                    borderRadius: 10,
                    justifyContent: 'center',
                }}>

                    <Image source={require('../../assets/A2.png')} style={{
                        width: 100,
                        height: 100,
                        renderItem: 'center',
                        margin: 5,
                    }} />
                    <Text style={{
                        marginTop: 10,
                        fontFamily: fonts.secondary[600],
                        color: colors.primary,
                        fontSize: DimensionThisPhone / 20
                    }}>{item.nama_kantor}</Text>



                </View>
            </TouchableWithoutFeedback>



        )
    }

    const [key, setKey] = useState('');
    const [TMP, setTMP] = useState({});
    return (
        <ImageBackground source={require('../../assets/back.jpg')} style={{
            flex: 1,
            backgroundColor: colors.border
        }}>

            <MyHeader judul="Profil Satuan" onPress={() => navigation.goBack()} />



            {!loading &&
                <View style={{
                    flex: 1,
                    paddingHorizontal: 20,
                    paddingVertical: 20,
                    justifyContent: 'center'
                }}>

                    <FlatList data={data} numColumns={2} showsVerticalScrollIndicator={false} renderItem={__renderItem} />

                </View>
            }
            {loading &&
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <ActivityIndicator size="large" color={colors.primary} />

                </View>
            }



        </ImageBackground>
    )
}

const styles = StyleSheet.create({})