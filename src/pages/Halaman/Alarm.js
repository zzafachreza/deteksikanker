import { Alert, StyleSheet, Text, View, Image, FlatList, ActivityIndicator, Dimensions, ImageBackground, TouchableWithoutFeedback, TouchableNativeFeedback, Linking, BackHandler, Animated, Easing } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { apiURL, getData, MYAPP, storeData } from '../../utils/localStorage';
import { DimensionThisPhone, colors, fonts, windowHeight, windowWidth } from '../../utils';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import PushNotification from "react-native-push-notification";
import axios from 'axios';
import 'intl';
import 'intl/locale-data/jsonp/en';
import moment from 'moment';
import 'moment/locale/id';
import { MyButton, MyCalendar, MyGap, MyHeader, MyInput } from '../../components';
import { showMessage } from 'react-native-flash-message';
export default function Alarm({ navigation, route }) {
    const TIPE = route.params.tipe;
    const USER = route.params.user;
    const [RESPON, setRESPON] = useState({
        nama_respon: route.params.respon.nama_respon,
        tanggal_lahir_respon: route.params.respon.tanggal_lahir_respon,
        tanggal_haid: moment().format('YYYY-MM-DD'),
    });

    const simpan = () => {

        console.log({
            fid_user: USER.id,
            nama_respon: RESPON.nama_respon,
            tanggal_lahir_respon: RESPON.tanggal_lahir_respon,
            tanggal_haid: RESPON.tanggal_haid,
            tanggal_alarm: moment(RESPON.tanggal_haid).add('2', 'week').format('DD MMMM YYYY')
        })

        axios.post(apiURL + 'alarm_add', {
            fid_user: USER.id,
            nama_respon: RESPON.nama_respon,
            tanggal_lahir_respon: RESPON.tanggal_lahir_respon,
            tanggal_haid: RESPON.tanggal_haid,
            tanggal_alarm: moment(RESPON.tanggal_haid).add('2', 'week').format('YYYY-MM-DD')
        }).then(res => {
            showMessage({
                type: 'success',
                message: 'Alarm Berhasil di simpan !'
            })
            console.log(res.data);
            navigation.replace('AlarmDetail', {
                tipe: TIPE,
                user: USER,
                respon: RESPON,
                tanggal_haid: RESPON.tanggal_haid,
                tanggal_alarm: moment(RESPON.tanggal_haid).add('2', 'week').format('DD MMMM YYYY')
            });

            PushNotification.localNotificationSchedule({
                //... You can use all the options from localNotifications
                channelId: 'deteksiKanker',
                message: "Hari ini adalah masa subur kamu", // (required)
                date: new Date(Date.now() + 5 * 1000), // in 60 secs
                soundName: 'intro'
            });

            PushNotification.localNotificationSchedule({
                //... You can use all the options from localNotifications
                channelId: 'deteksiKanker',
                message: "Hari ini adalah masa subur kamu", // (required)
                date: new Date(Date.now() + (604800 * 2) * 1000), // in 60 secs
                soundName: 'intro'
            });

        })








        // console.log(new Date(moment(RESPON.tanggal_haid).add('2', 'week').toISOString()))
        // console.log(new Date(Date.now()))



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
            <MyHeader judul={'Alarm'} onPress={() => navigation.goBack()} />

            <View style={{
                flex: 1,
                padding: 20,
            }}>


                <ScrollView>

                    <MyGap jarak={20} />
                    <MyCalendar iconname='calendar-outline' label='Masukan Tanggal Haid' value={RESPON.tanggal_haid} onDateChange={x => {
                        setRESPON({
                            ...RESPON,
                            tanggal_haid: x
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