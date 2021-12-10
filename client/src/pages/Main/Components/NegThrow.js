import React, { useState, useEffect } from 'react';
import { Dimensions, TouchableOpacity, Text, TextInput, StyleSheet, Image, View, ImageBackground } from 'react-native';
import styled from 'styled-components/native';
import ShowContentModal from '../ShowContentModal';

export default function NegThrow({navigation}) {
  const { width: SCREEN_WIDTH } = Dimensions.get('window');
  const [isPressed, setIsPressed] = useState(false);

  const data = {
    contents: 'ttt',
    createdAt: '2021-12-08T02:06:29.000Z',
    emotion_level: 8,
    emotions: '설렘',
    gourdKinds: true,
    id: 67,
    updatedAt: '2021-12-08T02:06:29.000Z',
    users_id: 26,
  };

  const showModal = () => {
    setIsPressed(true);
    // console.log(isPressed);
    // console.log(111111);
  };
  return (
    <>
      <Container style={{ width: SCREEN_WIDTH }}>
        <ImageBackgrounds source={require('../../../img/background.jpeg')} resizemode="cover">
          <ImageBackgrounds source={require('../../../img/negativeThrow.gif')} resizemode="contain">
            <TouchableOpacity
              style={{ position: 'absolute', height: 100, top: 580, left: 120 }}
              hitSlop={{ top: 32, bottom: 32, left: 32, right: 32 }}
              onPress={showModal}
            >
              <View>
                <Text style={{ padding: 20, fontSize: 17 }}>여기를 터치해주세요</Text>
              </View>
            </TouchableOpacity>
          </ImageBackgrounds>
        </ImageBackgrounds>

        {isPressed ? <ShowContentModal data={data} navigation={navigation}/> : null}
      </Container>
    </>
  );
}
const Container = styled.View`
  position: relative;
  flex: 1;
  height: 100%;
  width: 100%;
`;

const ImageBackgrounds = styled.ImageBackground`
  height: 100%;
  width: 100%;
`;

// const Texts = styled.View`
//   top: 0;
//   bottom: 0;
//   justify-content: 'center';
//   align-items: 'center';
// `;

// const ImageBackgrounds = styled.ImageBackground`
//   /* flex: 1; */
//   height: 100%;
//   width: 100%;
// `;
