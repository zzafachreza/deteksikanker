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
export default function Quiz1({ navigation, route }) {
    const TIPE = route.params.tipe;
    const USER = route.params.user;
    const RESPON = route.params.respon;
    const JENIS = route.params.jenis;

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
                navigation.replace('Quiz1Hasil', {
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
            __getData()
        }
    }, [isFocus])


    const __getData = () => {
        setLoading(true)
        axios.post(apiURL + 'soal', {
            jenis: 'Quiz 1',
            tipe: TIPE,
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
            <MyHeader judul={'Quiz 1 ' + TIPE} onPress={() => navigation.goBack()} />

            {!loading &&
                <View style={{
                    flex: 1,
                    paddingHorizontal: 20,
                }}>
                    <ScrollView showsVerticalScrollIndicator={false}>
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
                                    <View style={{
                                        paddingLeft: 10,
                                    }}>
                                        <TouchableOpacity onPress={() => {
                                            let TMP = [...data];
                                            TMP[index].cek = 'A';
                                            TMP[index].nilai = TMP[index].jawaban == 'A' ? 1 : 0;
                                            setData(TMP);
                                        }} style={{
                                            padding: 5,
                                            marginVertical: 2,
                                        }}>
                                            <View style={{
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                            }}>

                                                <Icon type='ionicon' name={item.cek == 'A' ? 'checkmark-circle-outline' : 'ellipse-outline'} size={20} />

                                                <View style={{
                                                    left: 10,
                                                    flex: 1,
                                                    flexDirection: 'row'
                                                }}>
                                                    <Text style={{
                                                        fontFamily: fonts.primary[400],
                                                        fontSize: 14,
                                                    }}>a. </Text>
                                                    <Text style={{
                                                        fontFamily: fonts.primary[400],
                                                        fontSize: 14,
                                                    }}>{item.a}</Text>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => {
                                            let TMP = [...data];
                                            TMP[index].cek = 'B';
                                            TMP[index].nilai = TMP[index].jawaban == 'B' ? 1 : 0;
                                            setData(TMP);
                                        }} style={{
                                            padding: 5,
                                            marginVertical: 2,
                                        }}>
                                            <View style={{
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                            }}>

                                                <Icon type='ionicon' name={item.cek == 'B' ? 'checkmark-circle-outline' : 'ellipse-outline'} size={20} />

                                                <View style={{
                                                    left: 10,
                                                    flex: 1,
                                                    flexDirection: 'row'
                                                }}>
                                                    <Text style={{
                                                        fontFamily: fonts.primary[400],
                                                        fontSize: 14,
                                                    }}>b. </Text>
                                                    <Text style={{
                                                        fontFamily: fonts.primary[400],
                                                        fontSize: 14,
                                                    }}>{item.b}</Text>
                                                </View>
                                            </View>
                                        </TouchableOpacity>

                                        <TouchableOpacity onPress={() => {
                                            let TMP = [...data];
                                            TMP[index].cek = 'C';
                                            TMP[index].nilai = TMP[index].jawaban == 'C' ? 1 : 0;
                                            setData(TMP);
                                        }} style={{
                                            padding: 5,
                                            marginVertical: 2,
                                        }}>
                                            <View style={{
                                                flexDirection: 'row',
                                                // alignItems: 'center',
                                            }}>

                                                <Icon type='ionicon' name={item.cek == 'C' ? 'checkmark-circle-outline' : 'ellipse-outline'} size={20} />

                                                <View style={{
                                                    left: 10,
                                                    flex: 1,
                                                    flexDirection: 'row'
                                                }}>
                                                    <Text style={{
                                                        fontFamily: fonts.primary[400],
                                                        fontSize: 14,
                                                    }}>c. </Text>
                                                    <Text style={{
                                                        fontFamily: fonts.primary[400],
                                                        fontSize: 14,
                                                    }}>{item.c}</Text>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => {
                                            let TMP = [...data];
                                            TMP[index].cek = 'D';
                                            TMP[index].nilai = TMP[index].jawaban == 'D' ? 1 : 0;
                                            setData(TMP);
                                        }} style={{
                                            padding: 5,
                                            marginVertical: 2,
                                        }}>
                                            <View style={{
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                            }}>

                                                <Icon type='ionicon' name={item.cek == 'D' ? 'checkmark-circle-outline' : 'ellipse-outline'} size={20} />

                                                <View style={{
                                                    left: 10,
                                                    flex: 1,
                                                    flexDirection: 'row'
                                                }}>
                                                    <Text style={{
                                                        fontFamily: fonts.primary[400],
                                                        fontSize: 14,
                                                    }}>d. </Text>
                                                    <Text style={{
                                                        fontFamily: fonts.primary[400],
                                                        fontSize: 14,
                                                    }}>{item.d}</Text>
                                                </View>
                                            </View>
                                        </TouchableOpacity>

                                    </View>
                                </View>

                            )
                        }} />

                        <MyGap jarak={10} />
                        <MyButton onPress={simpan} Icons="checkmark-circle-outline" title="Simpan" />
                        <MyGap jarak={20} />
                    </ScrollView>
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