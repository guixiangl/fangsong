/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */


import * as React from 'react';

import { View, Text, Button,FlatList ,TouchableOpacity,TextInput,Alert,RefreshControl, NativeSyntheticEvent,NativeTouchEvent} from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState, useEffect,TouchEvent , } from 'react';
import axios from 'axios';
import {LogBox} from 'react-native';

export type RootStackParamList = {
  Home: undefined;
  Settings: undefined;
  Profile: undefined;
};
export interface ISubmitResult {
  success: boolean;
  message: string;
}

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, "Home">;

export interface Student {
  key: string;
  name: string;
  class: number;
}

interface Props { students: ReadonlyArray<Student>; }



function _renderItem({ item }: { item: Student }) {
    return (
        <TouchableOpacity >
            <Text >{item.name}</Text>
            <Text >{item.class}</Text>
        </TouchableOpacity>
    );
}
const getMoviesFromApiAsync = async () => {
  try {
    const response = await fetch(
      'https://10.0.0.234:3000',
    );
    
    const json = await response.json();
    return json.movies;
  } catch (error) {

    console.error(error);
  }
};

const HomeScreen: React.FC<HomeScreenProps> = (props) => {
  const [data, setData] = useState<Student[]>( [] );
  const [refreshing, setRefreshing] = useState(true);
  const DATA: Student[] = [
    {
      key: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      name: 'First Item',
      class:1
    },
    {
      key: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      name: 'Second Item',
      class:2
    }
  ];
  const getMovies = async () => {
    try {
      const response = await fetch('http://10.0.0.234:3000');
      const json = await response.json();
      setRefreshing(false);
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
  
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  //start 
  const [touchStart, setTouchStart] = useState<any | null>(null)
  const [touchEnd, setTouchEnd] = useState<any | null>(null)

  // the required distance between touchStart and touchEnd to be detected as a swipe
  const minSwipeDistance = 50 

  const onTouchStart = (e:NativeSyntheticEvent<NativeTouchEvent>) => {
    setTouchEnd(null) // otherwise the swipe is fired even with usual touch events
    setTouchStart(e.nativeEvent.pageX)
  }

  const onTouchMove = (e:NativeSyntheticEvent<NativeTouchEvent>) => setTouchEnd(e.nativeEvent.pageX)

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance
    if (isLeftSwipe || isRightSwipe) console.log('swipe', isLeftSwipe ? 'left' : 'right')
    // add your conditional logic here   
    getMovies(); 
  }
    //end

  return (
     
    
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}  onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
      <Button title='Go to Profile' onPress={() => props.navigation.push("Profile")} />
      <Button title='Go to Settings' onPress={() => props.navigation.push("Settings")} />
      <FlatList data={data} renderItem={_renderItem}  
       refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={getMovies} />
      }/>
    </View>
  );
};

type SettingsScreenProps = NativeStackScreenProps<RootStackParamList, "Settings">;

const SettingsScreen: React.FC<SettingsScreenProps> = (props) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Settings Screen</Text>
      <Button title='Go to Profile' onPress={() => props.navigation.push("Profile")} />
    </View>
  );
};

type ProfileScreenProps = NativeStackScreenProps<RootStackParamList, "Profile">;

const ProfileScreen: React.FC<ProfileScreenProps> = (props) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Profile Screen</Text>
      <Button title='Go to Settings' onPress={() => props.navigation.push("Settings")} />
      <PizzaTranslator></PizzaTranslator>
    </View>
  );
};

const PizzaTranslator = () => {
  const [text, setText] = useState('');
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [message, setMessage] = useState("");

  let handleSubmit = async ()  => {
    Alert.alert('It is a Simple Alert');
    try {
      let res = await fetch("http://10.0.0.234:3000/create", {
        method: "POST",
        body: JSON.stringify({
          name: name,
          email: email,
          mobileNumber: mobileNumber,
        }),
        headers: {
          'Accept':       'application/json',
          'Content-Type': 'application/json'
        }
      });
      let resJson = await res.json();
      Alert.alert('response');
      if (res.status === 200) {
        setName("");
        setEmail("");
        setMessage("User created successfully");
      } else {
        setMessage("Some error occured");
      }
    } catch (err) {
      var mesage = (err as Error).message            
      Alert.alert(mesage);                   
      console.log(err);
    }
  };

  return (
    <View >
      <TextInput      
        value={name}
        placeholder="Name"
        onChangeText={setName}
      />
      <TextInput
        value={email}
        placeholder="Email"
        onChangeText={setEmail}
      />
      <TextInput    
        value={mobileNumber}
        placeholder="Mobile Number"
        onChangeText={setMobileNumber}
      />

      <Button  title="Press me" onPress={handleSubmit}/>

    
  </View>
  );
};



const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
 
  return (
    <NavigationContainer>
      <Stack.Navigator>
       <Stack.Screen name='Home' component={HomeScreen} />              
       <Stack.Screen name='Settings' component={SettingsScreen} />
       <Stack.Screen name='Profile' component={ProfileScreen} />
      
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
