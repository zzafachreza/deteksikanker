import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Image,
    Linking,
    Alert,
    ActivityIndicator,
    ScrollView,
} from 'react-native';
import { windowWidth, fonts } from '../../utils/fonts';
import { apiURL, getData, MYAPP, storeData, urlAPI, urlApp, urlAvatar } from '../../utils/localStorage';
import { colors } from '../../utils/colors';
import { MyButton, MyCalendar, MyGap, MyHeader, MyInput, MyPicker } from '../../components';
import { Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

export default function AccountEdit({ navigation, route }) {


    const [kirim, setKirim] = useState(route.params);
    const [loading, setLoading] = useState(false);
    const sendServer = () => {
        setLoading(true);
        console.log(kirim);
        axios.post(apiURL + 'update_profile', kirim).then(res => {
            console.log(res.data)

            setLoading(false);

            if (res.data.status == 200) {
                Alert.alert(MYAPP, res.data.message);
                console.log(res.data.data);
                storeData('user', res.data.data);
                navigation.replace('MainApp');
            }
        })
    }

    const [satuan, setSatuan] = useState([]);

    useEffect(() => {
        axios.post(apiURL + 'satuan').then(res => {
            console.log(res.data);
            setSatuan(res.data);

            setKirim({
                ...kirim,
                newfoto_user: null,
            })
        })
    }, [])




    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.background,

        }}>
            <MyHeader judul="Edit Profil" onPress={() => navigation.goBack()} />
            <ScrollView showsVerticalScrollIndicator={false}>


                <View style={{
                    padding: 20,
                }}>

                    <MyInput
                        placeholder="Masukan nama lengkap"
                        label="Nama Lengkap"
                        iconname="person"
                        value={kirim.nama_lengkap}
                        onChangeText={value =>
                            setKirim({
                                ...kirim,
                                nama_lengkap: value,
                            })
                        }
                    />
                    <MyGap jarak={10} />
                    <MyInput
                        placeholder="Masukan username"
                        label="Username"
                        iconname="at"
                        value={kirim.username}
                        onChangeText={value =>
                            setKirim({
                                ...kirim,
                                username: value,
                            })
                        }
                    />




                    <MyGap jarak={10} />
                    <MyCalendar iconname='calendar-outline' label="Tanggal Lahir" value={kirim.tanggal_lahir} onDateChange={x => {
                        setKirim({
                            ...kirim,
                            tanggal_lahir: x
                        })
                    }} />

                    <MyGap jarak={10} />

                    <MyInput label="Password" iconname="lock-closed" secureTextEntry={true} onChangeText={x => setKirim({ ...kirim, newpassword: x })} placeholder="Kosongkan jika tidak diubah" />
                    <MyGap jarak={20} />
                    {loading && <ActivityIndicator color={colors.primary} size="large" />}

                    {!loading && <MyButton warna={colors.primary} onPress={sendServer} title="Simpan Perubahan" Icons="download-outline" />}

                </View>

            </ScrollView>
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({})