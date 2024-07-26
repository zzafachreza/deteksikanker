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
export default function Submenu({ navigation, route }) {
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
                    flex: 0.5,
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
            <MyHeader judul={'Edukasi Deteksi Dini ' + TIPE} onPress={() => navigation.goBack()} />

            <View style={{
                flex: 1,
                padding: 20,
            }}>
                <View style={{
                    marginVertical: 20,
                    flexDirection: 'row'
                }}>
                    <MyList onPress={() => {

                        navigation.navigate('Esay', {
                            tipe: TIPE,
                            user: USER,
                            respon: RESPON
                        });





                    }} label={'Kuesioner Pre ' + '\n' + 'dan Post'} img={require('../../assets/p1.png')} />
                    <MyList onPress={() => {
                        navigation.navigate('Artikel', {
                            tipe: TIPE,
                            user: USER,
                            respon: RESPON
                        });

                        storeData('menu', {
                            esay: 1,
                            quiz: 0,
                        })
                    }} label={'Edukasi Deteksi Dini' + '\n' + ' ' + TIPE} img={require('../../assets/p2.png')} />
                </View>

                <View style={{
                    marginVertical: 20,
                    flexDirection: 'row'
                }}>
                    {TIPE == 'Kanker Payudara' &&
                        <MyList label='Alarm' onPress={() => {
                            navigation.navigate('Alarm', {
                                tipe: TIPE,
                                user: USER,
                                respon: RESPON
                            })
                        }} img={require('../../assets/p3.png')} />
                    }
                    <MyList label='Quiz' onPress={() => {
                        if (buka.quiz > 0) {
                            navigation.navigate('Quiz1', {
                                tipe: TIPE,
                                user: USER,
                                respon: RESPON
                            })
                        } else {
                            Alert.alert(MYAPP, 'Kamu harus mengakses menu kuesioner telebih dahulu !')
                        }
                    }} img={require('../../assets/p4.png')} />
                </View>

            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})