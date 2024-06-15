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
import { MyButton, MyCalendar, MyGap, MyHeader, MyInput } from '../../components';
import { showMessage } from 'react-native-flash-message';
export default function Menu({ navigation, route }) {
    const TIPE = route.params.tipe;
    const USER = route.params.user;
    const [RESPON, setRESPON] = useState({
        nama_respon: '',
        tanggal_lahir_respon: moment().format('YYYY-MM-DD'),
    });

    const simpan = () => {
        if (RESPON.nama_respon.length == 0) {
            showMessage({ message: 'Maaf nama respon harus di isi !' })
        } else {
            navigation.replace('Submenu', {
                tipe: TIPE,
                user: USER,
                respon: RESPON
            });
            storeData('menu', {
                esay: 0,
                quiz: 0,
            })
        }
    }

    const MyList = ({ label = 'Profile Kantor', img = require('../../assets/A1.png'), onPress }) => {
        return (
            <TouchableWithoutFeedback onPress={onPress}>
                <View style={{
                    // flex: 1,
                }}>
                    <View style={{
                        height: 150,
                        width: 150,
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
                {TIPE == 'Kanker Payudara' &&
                    <View style={{
                        marginVertical: 20,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <MyList label='Remaja (14-18th)' img={require('../../assets/remaja.png')} />
                    </View>
                }

                <ScrollView>
                    <MyInput iconname='person-outline' label="Nama Respon" value={RESPON.nama_respon} onChangeText={x => {
                        setRESPON({
                            ...RESPON,
                            nama_respon: x
                        })
                    }} />
                    <MyGap jarak={20} />
                    <MyCalendar iconname='calendar-outline' label='Tanggal Lahir' value={RESPON.tanggal_lahir_respon} onDateChange={x => {
                        setRESPON({
                            ...RESPON,
                            tanggal_lahir_respon: x
                        })
                    }} />
                    <MyGap jarak={40} />
                    <MyButton onPress={simpan} title='Simpan' Icons='checkmark-circle-outline' />

                </ScrollView>

            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})