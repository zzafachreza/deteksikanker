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
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);


    const isFocus = useIsFocused();

    useEffect(() => {
        if (isFocus) {
            __getData()
        }
    }, [isFocus])


    const __getData = () => {
        setLoading(true)
        axios.post(apiURL + 'artikel', {
            tipe: TIPE
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
            <MyHeader judul={'Edukasi Deteksi Dini ' + TIPE} onPress={() => navigation.goBack()} />

            {!loading &&
                <View style={{
                    flex: 1,
                    padding: 20,
                }}>
                    <FlatList data={data} renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity onPress={() => navigation.navigate('ArtikelDetail', item)} style={{
                                backgroundColor: colors.primary,
                                padding: 20,
                                borderRadius: 10,
                                marginVertical: 10,
                            }}>
                                <Text style={{
                                    fontFamily: fonts.primary[600],
                                    fontSize: 20,
                                    color: colors.white,
                                    textAlign: 'center'
                                }}>{item.judul}</Text>
                            </TouchableOpacity>
                        )
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