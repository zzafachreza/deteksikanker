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
export default function InformasiDetail({ navigation, route }) {


    const systemFonts = [fonts.primary[400], fonts.primary[600]];
    const item = route.params;
    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.background,
            // padding: 10,
        }}>
            <MyHeader judul={item.judul} onPress={() => navigation.goBack()} />
            <ScrollView showsVerticalScrollIndicator={false} style={{
            }}>

                <View style={{
                    padding: 20
                }}>

                    <YoutubePlayer
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
                    />
                    <Text style={{
                        marginTop: 20,
                        fontFamily: fonts.primary[800],
                        fontSize: DimensionThisPhone / 15,
                        color: colors.black,
                        textAlign: 'center'
                    }}>{item.judul}</Text>

                    <RenderHtml
                        tagsStyles={{
                            p: {
                                fontFamily: 'Poppins-Regular',
                                textAlign: 'justify',
                                lineHeight: 20,
                            },
                        }}
                        systemFonts={systemFonts}
                        contentWidth={windowWidth}
                        source={{
                            html: item.keterangan
                        }}
                    />


                </View>

            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})