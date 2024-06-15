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
export default function Quiz1Hasil({ navigation, route }) {
    const TIPE = route.params.tipe;
    const USER = route.params.user;
    const RESPON = route.params.respon;
    const JENIS = route.params.jenis;
    const NILAI = route.params.nilai;

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const simpan = () => {

        // console.log(data);
        let JAWAB = [];
        data.map(i => {
            JAWAB.push(i.nilai);
        });
        console.log(JAWAB);
        const SUM = JAWAB.reduce((partialSum, a) => partialSum + a, 0);
        const NILAI = (SUM / JAWAB.length) * 100;
        console.log(NILAI)
        axios.post(apiURL + 'quiz_add', {
            tipe: TIPE,
            nama_respon: RESPON.nama_respon,
            tanggal_lahir_respon: RESPON.tanggal_lahir_respon,
            jenis: 'Quiz 1',
            fid_user: USER.id,
            nilai: NILAI,
        }).then(res => {
            console.log(res.data);
            if (res.data == 200) {
                showMessage({
                    type: 'success',
                    message: 'Data berhasil di simpan !'
                });
                navigation.navigate('Quiz1Hasil', {
                    tipe: TIPE,
                    jenis: JENIS,
                    user: USER,
                    respon: RESPON,
                    nilai: NILAI,
                });
            }

        }).finally(() => {

        })
    }


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
            <MyHeader judul={'Quiz ' + TIPE} onPress={() => navigation.goBack()} />

            {!loading &&
                <View style={{
                    flex: 1,
                    padding: 20,
                    justifyContent: 'center',
                }}>
                    <Text style={{
                        fontFamily: fonts.primary[600],
                        fontSize: 14,
                        textAlign: 'center'
                    }}>Terimakasih telah menjawab quiz pertama</Text>
                    <Text style={{
                        fontFamily: fonts.primary[600],
                        fontSize: 30,
                        textAlign: 'center'
                    }}>Skor Kamu :</Text>
                    <Text style={{
                        fontFamily: fonts.primary[800],
                        fontSize: 80,
                        textAlign: 'center'
                    }}>{NILAI}</Text>

                    <MyButton title="Quiz Selanjutnya" onPress={() => {
                        navigation.replace('Quiz2', {
                            tipe: TIPE,
                            user: USER,
                            respon: RESPON
                        })
                    }} />
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