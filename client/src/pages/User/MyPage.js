import React, { useEffect, useState } from 'react';
import { Button, View, Text, TouchableOpacity, Dimensions, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Update from 'expo-updates';
import { reqSignOut, reSignIn } from '../../modules/user';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components/native';
import Nav from '../Home/Nav';
import { TextInput } from 'react-native-gesture-handler';
import axios from 'axios';
import { Center } from 'native-base';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function MyPage({ navigation }) {
  const [editInfoForm, setEditInfoForm] = useState({
    username: '',
    email: '',
    password: '',
    repassword: '',
  });
  const { username, email, password, repassword } = editInfoForm;
  // useSelector(state => state.user.accessToken);
  function changeDetector(e, name) {
    const value = e.nativeEvent.text;
    setEditInfoForm({
      ...editInfoForm,
      [name]: value,
    });
  }

  const submitForm = async e => {
    // async function submitForm(e) {
    // console.log('-----------------', editInfoForm);
    const token = await AsyncStorage.getItem('AccessToken');
    // console.log(111111, token);
    // e.preventDefault();
    // console.log('-----------------', 'username :', username, email, password);
    await axios
      .patch(
        'http://ec2-13-209-98-187.ap-northeast-2.compute.amazonaws.com:8080/mypage',
        {
          username,
          email,
          password,
        },
        {
          headers: {
            ContentType: 'application/json',
            authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      )
      .then(data => {
        console.log(111111111155555555, data.data);
      });
    // console.log(editInfoForm);
    };

    // const [ userInfomation, setUserInfomation ] = useState({ userName, Email });
    // const { userName, Email } = userInfomation;
    // const getUserInfo = async () => {
      
    //   const token = await AsyncStorage.getItem('AccessToken');
    //   await axios.get(
    //     'http://ec2-13-209-98-187.ap-northeast-2.compute.amazonaws.com:8080/mypage',
    //     {
    //       headers: {
    //         ContentType: 'application/json',
    //         authorization: `Bearer ${token}`,
    //       },
    //       withCredentials: true,
    //     }
    //   )
    //   .then(userInfo => {
    //     setUserInfomation({
    //       userName: userInfo.data.username,
    //       Email: userInfo.data.email
    //     })
    //   });
    // }
    // useEffect(() => {
    //   getUserInfo();
    // }, []);
  
    
  const dispatch = useDispatch();
  const logOutHandler = async () => {
    // console.log('ads')
    const token = await AsyncStorage.getItem('AccessToken');
    dispatch(reqSignOut(token));
    // AsyncStorage.clear()
    // const res = await AsyncStorage.getAllKeys()
    // location.reload()
    // Update.reloadAsync()
    // console.log(res)
  };

  //! Token owner Test
  // const logg = async() => {
  //   try {
  //     const token = await AsyncStorage.getItem('AccessToken')
  //     dispatch(reSignIn(token))
  //   } catch(err) {
  //   throw new Error(err)
  //   }
  // }

  return (
    <ImageBackground source={require('../../img/background.jpeg')} resizemode="cover">
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'space-between',
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT - 80,
        marginTop: '20px',
      }}
    >
      <Text style={{ flex: 1, fontSize: '30px' }}>MyPage</Text>
      {/* <User>
        <Text style={{ width: '90%', borderBottomColor: 'black', borderBottomWidth: '2px' }}>{userInfomation.userName}</Text>
        <Text style={{ width: '90%', borderBottomColor: 'black', borderBottomWidth: '2px' }}>{userInfomation.Email}</Text>
      </User> */}
      <TouchableOpacity 
      style={{ 
        justifyContent: 'space-around', 
        backgroundColor: 'white', 
        width: '70px', 
        height: '40px', 
        textAlign: 'center', 
        fontSize: '20px', 
        borderRadius: '10px'}} 
        onPress={logOutHandler()}>
        <Text>Log Out</Text>
      </TouchableOpacity>
      <UserInfomation style={{ flex: 8, flexDirection: 'column', justifyContent: 'space-around' }}>
        <Text>이름</Text>
        <TextInput style={{ width: '90%', borderBottomColor: 'black', borderBottomWidth: '2px' }} placeholder='Name' onChange={e => changeDetector(e, 'username')} />
        <Text>이메일</Text>
        <TextInput style={{ width: '90%', borderBottomColor: 'black', borderBottomWidth: '2px' }} placeholder='Email' onChange={e => changeDetector(e, 'email')} />
        <Text>비밀번호</Text>
        <TextInput style={{ width: '90%', borderBottomColor: 'black', borderBottomWidth: '2px' }} placeholder='Password' onChange={e => changeDetector(e, 'password')} />
        <Text>비밀번호 확인</Text>
        <TextInput style={{ width: '90%', borderBottomColor: 'black', borderBottomWidth: '2px' }} placeholder='Repassword' onChange={e => changeDetector(e, 'repassword')} />
        {password && repassword !== repassword ? <Text> '비밀번호가 일치하지 않습니다'</Text> : null}
        <TouchableOpacity 
      style={{ 
        justifyContent: 'space-around', 
        backgroundColor: 'white', 
        width: '200px', 
        height: '50px', 
        textAlign: 'center', 
        fontSize: '20px', 
        borderRadius: '10px'}} 
        onPress={e => submitForm(e)}>
          <Text>회원정보 수정</Text>
          </TouchableOpacity>
      </UserInfomation>
      <TouchableOpacity 
      style={{ 
        justifyContent: 'space-around', 
        flexDirection: 'column', 
        backgroundColor: 'white', 
        width: '70px', 
        height: '40px', 
        textAlign: 'center', 
        fontSize: '20px', 
        borderRadius: '10px', 
        marginBottom: '10px'}} 
        onPress={() => navigation.navigate('Resign')}>
          <Text>회원탈퇴</Text>
          </TouchableOpacity>
    </View>
    </ImageBackground>
  );
}

const UserInfomation = styled.View`
  flex: auto;
  flex-direction: column;
  justify-content: space-around;
  border-radius: 20px;
  align-items: center;
  height: 150px;
  width: 300px;
`;

const User = styled.View`
  flex: auto;
  flex-direction: column;
  justify-content: space-around;
  border-radius: 20px;
  align-items: center;
  height: 50px;
  width: 300px;
`
