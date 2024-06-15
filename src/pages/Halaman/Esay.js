import { Alert, StyleSheet, Text, View, Image, FlatList, ActivityIndicator, Dimensions, ImageBackground, TouchableWithoutFeedback, TouchableNativeFeedback, Linking, BackHandler, Animated, Easing } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { apiURL, getData, MYAPP, storeData } from '../../utils/localStorage';
import { DimensionThisPhone, colors, fonts, windowHeight, windowWidth } from '../../utils';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import axios from 'axios';
import 'intl';
import 'intl/locale-data/jsonp/en';
import moment from 'moment';
import 'moment/locale/id';
import { MyHeader } from '../../components';
import { useIsFocused } from '@react-navigation/native';
export default function Esay({ navigation, route }) {
    const TIPE = route.params.tipe;
    const USER = route.params.user;
    const RESPON = route.params.respon;

    const [buka, setBuka] = useState({
        esay: 0,
        quiz: 0,
    })

    const isFocus = useIsFocused();

    useEffect(() => {
        if (isFocus) {
            getData('menu').then(res => {
                console.log(res);
                setBuka(res);
            })
        }
    }, [isFocus])


    const MyList = ({ label = 'Profile Kantor', img = require('../../assets/A1.png'), onPress }) => {
        return (
            <TouchableWithoutFeedback onPress={onPress}>
                <View style={{
                    flex: 1,
                }}>
                    <View style={{
                        height: 150,
                        justifyContent: 'center',
                        marginHorizontal: 10,
                        borderRadius: 10,
                        backgroundColor: colors.primary,
                        overflow: 'hidden'
                    }}>
                        <View style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: 10,
                        }}>
                            <Image source={img} style={{
                                width: 100,
                                height: 100,
                                resizeMode: 'contain'
                            }} />
                        </View>

                    </View>

                    <Text style={{
                        marginTop: 10,
                        fontFamily: fonts.primary[600],
                        color: colors.black,
                        fontSize: 14,
                        textAlign: 'center',
                    }}>{label}</Text>
                </View>
            </TouchableWithoutFeedback>
        )
    }


    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.background,
        }}>
            <MyHeader judul={'Kuesioner Pre dan Post ' + TIPE} onPress={() => navigation.goBack()} />

            <View style={{
                flex: 1,
                padding: 20,
            }}>
                <View style={{
                    marginVertical: 20,
                    flexDirection: 'row'
                }}>
                    <MyList onPress={() => {
                        navigation.navigate('EsayDetail', {
                            tipe: TIPE,
                            user: USER,
                            respon: RESPON,
                            jenis: 'Pre Test'
                        })
                    }} label={'Pre Test'} img={require('../../assets/pre.png')} />
                    <MyList onPress={() => {


                        if (buka.esay > 0) {
                            navigation.navigate('EsayDetail', {
                                tipe: TIPE,
                                user: USER,
                                respon: RESPON,
                                jenis: 'Post Test'
                            });
                            storeData('menu', {
                                esay: 1,
                                quiz: 1,
                            })
                        } else {
                            Alert.alert(MYAPP, 'Kamu harus mengakses menu edukasi telebih dahulu !')
                        }


                    }} label={'Post Test'} img={require('../../assets/post.png')} />
                </View>

            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})