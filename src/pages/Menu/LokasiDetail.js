import { FlatList, Image, Linking, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { DimensionThisPhone, MyDimensi, colors, fonts, windowHeight, windowWidth } from '../../utils'
import { MyButton, MyGap, MyInput, MyPicker } from '../../components'
import axios from 'axios';
import { apiURL, webURL } from '../../utils/localStorage'
import { showMessage } from 'react-native-flash-message'
import RenderHtml from 'react-native-render-html';
import moment from 'moment'
import YoutubePlayer from "react-native-youtube-iframe";
import { WebView } from 'react-native-webview';
import { TouchableOpacity } from 'react-native'
export default function LokasiDetail({ navigation, route }) {

    const truncate = (n) => {
        return n > 0 ? Math.floor(n) : Math.ceil(n);
    }

    const getDMS = (dd, longOrLat) => {
        let hemisphere = /^[WE]|(?:lon)/i.test(longOrLat)
            ? dd < 0
                ? "W"
                : "E"
            : dd < 0
                ? "S"
                : "N";

        const absDD = Math.abs(dd);
        const degrees = truncate(absDD);
        const minutes = truncate((absDD - degrees) * 60);
        const seconds = ((absDD - degrees - minutes / 60) * Math.pow(60, 2)).toFixed(2);

        let dmsArray = [degrees, minutes, seconds, hemisphere];
        return `${dmsArray[0]}°${dmsArray[1]}'${dmsArray[2]}" ${dmsArray[3]}`;
    }



    const item = route.params;
    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white,
        }}>
            <WebView source={{ uri: `${webURL}home/map?lat=${item.latitude}&long=${item.longitude}` }} style={{ height: 300 }} />

            <View style={{
                marginHorizontal: 10,
                backgroundColor: colors.white,
                height: 200,
                borderRadius: 10,
                width: windowWidth - 30,
                alignSelf: 'center',
                position: 'absolute',
                bottom: 50,
                padding: 10,
            }}>
                <Text style={{
                    fontFamily: fonts.secondary[800],
                    color: colors.primary,
                    fontSize: DimensionThisPhone / 15
                }}>{item.nama_kantor}</Text>

                <Text style={{
                    fontFamily: fonts.secondary[400],
                    color: colors.primary,
                    fontSize: DimensionThisPhone / 20
                }}>{getDMS(item.latitude, 'lat') + ' ' + getDMS(item.longitude, 'long')}</Text>

                <TouchableOpacity onPress={() => {
                    Linking.openURL(`https://www.google.com/maps/place/${getDMS(item.latitude, 'lat')}+${getDMS(item.longitude, 'long')}/@${item.latitude},${item.longitude}`)
                }} style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    padding: 10,
                    borderWidth: 1,
                    marginTop: 10,
                    borderRadius: 10,
                    borderColor: colors.border,
                }}>
                    <Image source={require('../../assets/maps.png')} style={{
                        width: 80,
                        height: 80,
                    }} />
                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: 18,
                        left: 10,
                    }}>Lokasi via google maps</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})