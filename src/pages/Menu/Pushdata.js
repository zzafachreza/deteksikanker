import { FlatList, Image, ImageBackground, Linking, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { DimensionThisPhone, MyDimensi, colors, fonts, windowHeight, windowWidth } from '../../utils'
import { MyButton, MyGap, MyHeader, MyInput, MyPicker } from '../../components'
import axios from 'axios';
import { apiURL, webURL } from '../../utils/localStorage'
import { showMessage } from 'react-native-flash-message'
import RenderHtml from 'react-native-render-html';
import moment from 'moment'
import YoutubePlayer from "react-native-youtube-iframe";
export default function Pushdata({ navigation, route }) {

    const item = route.params;

    console.log(item.id);

    const [kirim, setKirim] = useState({
        fid_satuan: route.params.id,
        judul: '',
        pesan: '',
    })
    return (
        <ImageBackground source={require('../../assets/back.jpg')} style={{
            flex: 1,
            backgroundColor: colors.border
        }}>
            <MyHeader judul="Alarm" onPress={() => navigation.goBack()} />
            <ScrollView showsVerticalScrollIndicator={false} style={{
                padding: 20,
            }}>

                <View style={{
                    backgroundColor: colors.white,
                    padding: 10,
                    borderRadius: 10,
                }}>
                    <Text style={{
                        fontFamily: fonts.secondary[800],
                        textAlign: 'center',
                        marginVertical: 20,
                        fontSize: 20,
                    }}>{item.nama_kantor}</Text>
                    <MyInput label="Judul" placeholder="masukan judul" onChangeText={x => {
                        setKirim({ ...kirim, judul: x })
                    }} />
                    <MyGap jarak={10} />
                    <MyInput label="Pesan" placeholder="masukan pesan" multiline onChangeText={x => {
                        setKirim({ ...kirim, pesan: x })
                    }} />
                    <MyGap jarak={20} />
                    <MyButton title="ALARM" onPress={() => {
                        axios.post(apiURL + 'alarm', kirim).then(res => {
                            console.log(res.data);
                            showMessage({
                                message: 'Alarm Berhasil untuk ' + item.nama_kantor
                            });
                            navigation.goBack();
                        })
                    }} />
                </View>

            </ScrollView>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({})