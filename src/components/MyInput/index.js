import React, { useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native';
import { Icon } from 'react-native-elements';
import { colors } from '../../utils/colors';
import { fonts } from '../../utils/fonts';

export default function MyInput({
  onFocus,
  label,
  nolabel = false,
  borderColor = colors.black,
  backgroundColor = colors.background_input,
  editable,
  icon = true,
  maxLength,
  iconname,
  onChangeText,
  value,
  borderWidth = 0,
  textColor = colors.black,
  keyboardType,
  secureTextEntry,
  styleInput,
  onSubmitEditing,
  placeholder,
  autoFocus,
  multiline,
  label2,
  styleLabel,
  colorIcon = colors.primary,
  ref
}) {


  const [tutup, setTutup] = useState(true);

  const inputRef = useRef();
  return (
    <View style={{

    }}>

      <View
        style={{

          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: !nolabel ? 5 : 0,
        }}>
        {icon && !nolabel && <Icon type="ionicon" name={iconname} color={colorIcon} size={16} />}


        {!nolabel && <Text
          style={{
            fontFamily: fonts.primary[600],
            color: textColor,
            left: icon ? 10 : 5,
            fontSize: 12,
            ...styleLabel,
          }}>
          {label}
        </Text>}
      </View>
      <View style={{
        position: 'relative'
      }}>
        <TextInput
          onSubmitEditing={onSubmitEditing}
          editable={editable}
          placeholderTextColor={colors.black}
          maxLength={maxLength}
          multiline={multiline}
          autoFocus={autoFocus}
          onFocus={onFocus}
          placeholder={placeholder}
          secureTextEntry={secureTextEntry ? tutup : false}
          keyboardType={keyboardType}

          value={value}
          onChangeText={onChangeText}
          autoCapitalize="none"
          style={{
            backgroundColor: backgroundColor,
            borderColor: borderColor,
            borderRadius: 10,
            borderWidth: borderWidth,
            paddingLeft: 10,
            color: colors.black,
            fontSize: 12,
            fontFamily: fonts.primary[400],
            ...styleInput,
          }}
        />
        {secureTextEntry &&
          <TouchableOpacity onPress={() => {
            if (tutup) {
              setTutup(false);
            } else {
              setTutup(true);
            }
          }} style={{
            position: 'absolute',
            right: 0,
            bottom: 0,
            paddingHorizontal: 20,
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%'
          }}>
            <Icon type="ionicon" name={!tutup ? 'eye-off' : 'eye'} color={colors.primary} size={18} />
          </TouchableOpacity>}
      </View>

    </View>
  );
}

const styles = StyleSheet.create({});
