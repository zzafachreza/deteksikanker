import { Alert, StyleSheet, Text, View, Image, FlatList, ActivityIndicator, Dimensions, ImageBackground, TouchableWithoutFeedback, TouchableNativeFeedback, Linking, BackHandler, Animated, Easing, TextInput } from 'react-native'
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
import { MyButton, MyGap, MyHeader } from '../../components';
import { useIsFocused } from '@react-navigation/native';
import { showMessage } from 'react-native-flash-message';
import { Icon } from 'react-native-elements';
export default function AlarmDetail({ navigation, route }) {
    const TIPE = route.params.tipe;
    const USER = route.params.user;
    const TANGGAL_HAID = route.params.tanggal_haid;
    const TANGGAL_ALARM = route.params.tanggal_alarm;


    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);


    const isFocus = useIsFocused();

    useEffect(() => {
        if (isFocus) {

        }
    }, [isFocus])






    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.background,
        }}>
            <MyHeader judul={'Alarm'} onPress={() => navigation.goBack()} />

            {!loading &&
                <View style={{
                    flex: 1,
                    padding: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Text style={{
                        fontFamily: fonts.primary[600],
                        fontSize: 20,
                        textAlign: 'center'
                    }}>Alarm Akan Berbunyi Setalah Memasuki Masa Subur 1 Minggu Setelah Haid</Text>
                    <Image source={require('../../assets/alarm.png')} style={{
                        width: 200,
                        height: 200,
                        marginVertical: 10,
                    }} />
                    <View>
                        <Text style={{
                            marginTop: 10,
                            fontFamily: fonts.primary[600],
                            fontSize: 16,
                            textAlign: 'center'
                        }}>Tanggal Haid : {moment(TANGGAL_HAID).format('dddd, DD MMMM YYYY')}</Text>
                        <Text style={{
                            marginTop: 10,
                            fontFamily: fonts.primary[600],
                            fontSize: 16,
                            textAlign: 'center'
                        }}>Tanggal Alarm : {moment(TANGGAL_ALARM).format('dddd, DD MMMM YYYY')}</Text>
                    </View>

                </View>
            }
            {loading &&

                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <ActivityIndicator color={colors.primary} size="large" />
                </View>
            }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})