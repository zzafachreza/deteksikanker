import { FlatList, Image, Linking, SafeAreaView, StyleSheet, Text, View } from 'react-native'
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
import { WebView } from 'react-native-webview';
export default function InformasiDetail({ navigation, route }) {


    const systemFonts = [fonts.primary[400], fonts.primary[600]];
    const item = route.params;
    // console.log(webURL + 'artikel/detail/' + item.id)
    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.background,
            // padding: 10,
        }}>
            <MyHeader judul={item.judul} onPress={() => navigation.goBack()} />


            <View style={{
                // padding: 20,
                flex: 1,
            }}>
                {/* <Text style={{
                    marginTop: 20,
                    fontFamily: fonts.primary[800],
                    fontSize: DimensionThisPhone / 15,
                    color: colors.black,
                    textAlign: 'center'
                }}>{item.judul}</Text> */}
                <WebView source={{ uri: webURL + 'artikel/detail/' + item.id }} style={{ flex: 1, backgroundColor: colors.background }} />

                {/* <YoutubePlayer
                        width={'100%'}
                        height={210}
                        videoId={item.link_youtube}
                        webViewProps={{
                            injectedJavaScript: `
                            var element = document.getElementsByClassName('container')[0];
                            element.style.position = 'unset';
                            element.style.paddingBottom = 'unset';
                            true;
                            `,
                        }}
                    /> */}




                {/* <RenderHtml
                        tagsStyles={{
                            p: {
                                fontFamily: 'Poppins-Regular',
                                textAlign: 'justify',
                                fontSize: 14,
                                // lineHeight: 12,
                            },
                            div: {
                                fontFamily: 'Poppins-Regular',
                                textAlign: 'justify',
                                fontSize: 14,
                                // lineHeight: 12,
                            },
                            li: {
                                fontFamily: 'Poppins-Regular',
                                textAlign: 'justify',
                                fontSize: 14,
                                // lineHeight: 12,
                            },
                        }}
                        systemFonts={systemFonts}
                        contentWidth={windowWidth}
                        source={{
                            html: item.keterangan
                        }}
                    /> */}


            </View>


        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})