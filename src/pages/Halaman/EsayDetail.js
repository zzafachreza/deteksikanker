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
export default function EsayDetail({ navigation, route }) {
    const TIPE = route.params.tipe;
    const USER = route.params.user;
    const RESPON = route.params.respon;
    const JENIS = route.params.jenis;

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const simpan = () => {
        axios.post(apiURL + 'esay_add', {
            tipe: TIPE,
            nama_respon: RESPON.nama_respon,
            tanggal_lahir_respon: RESPON.tanggal_lahir_respon,
            jenis: JENIS,
            fid_user: USER.id,
            soal: data
        }).then(res => {
            console.log(res.data);
            if (res.data == 200) {
                showMessage({
                    type: 'success',
                    message: 'Data berhasil di simpan !'
                });
                navigation.goBack();
            }

        }).finally(() => {

        })
    }


    const isFocus = useIsFocused();

    useEffect(() => {
        if (isFocus) {
            __getData()
        }
    }, [isFocus])


    const __getData = () => {
        setLoading(true)
        axios.post(apiURL + 'esay', {
            tipe: TIPE,
            jenis: JENIS,
        }).then(res => {
            console.log(res.data);
            setData(res.data);
        }).finally(() => {
            setLoading(false)
        })
    }




    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.background,
        }}>
            <MyHeader judul={JENIS + ' ' + TIPE} onPress={() => navigation.goBack()} />

            {!loading &&
                <View style={{
                    flex: 1,
                    padding: 20,
                }}>
                    <FlatList data={data} renderItem={({ item, index }) => {
                        return (

                            <View style={{
                                marginBottom: 10,
                            }}>
                                <View style={{
                                    flexDirection: 'row'
                                }}>
                                    <Text style={{
                                        marginRight: 10,
                                        fontFamily: fonts.primary[600],
                                        fontSize: 14,
                                        color: colors.black,
                                    }}>{index + 1}</Text>
                                    <Text style={{
                                        flex: 1,
                                        fontFamily: fonts.primary[600],
                                        fontSize: 14,
                                        color: colors.black,
                                    }}>{item.soal}</Text>
                                </View>
                                <TextInput onChangeText={x => {
                                    let TMP = [...data];
                                    TMP[index].jawaban = x;
                                    setData(TMP);
                                }} style={{
                                    marginHorizontal: 10,
                                    fontFamily: fonts.primary[400],
                                    fontSize: 14,
                                    borderBottomWidth: 1,
                                }} />
                            </View>

                        )
                    }} />

                    <MyGap jarak={10} />
                    <MyButton onPress={simpan} Icons="checkmark-circle-outline" title="Simpan" />
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