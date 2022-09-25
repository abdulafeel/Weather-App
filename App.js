import React, {useState, useCallback} from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  KeyboardAvoidingView,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';

const App = () => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [display, setDisplay] = useState(false);

  const api = {
    baseUrl: '//api.openweathermap.org/data/2.5/',
    key: 'c4bce77e4fa711168cfec2e9fea09ca2',
  };

  const fetchDataHandler = useCallback(() => {
    setLoading(true);
    setInput('');
    setDisplay(true);
    axios({
      method: 'GET',
      url: `https://api.openweathermap.org/data/2.5/weather?q=${input}&units=metric&appid=${api.key}`,
    })
      .then(res => {
        console.log(res.data);
        setData(res.data);
      })
      .catch(e => console.dir(e))
      .finally(() => setLoading(false));
  }, [api.key, input]);

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior="position" />
      <StatusBar translucent backgroundColor="transparent" />
      <ImageBackground
        source={require('./assets/images/weatherbg.jpg')}
        resizeMode="cover"
        style={styles.image}>
        <View>
          <TextInput
            placeholder="Enter city name and press return..."
            onChangeText={text => setInput(text)}
            value={input}
            placeholderTextColor="#D3D3D3"
            style={styles.textinput}
            onSubmitEditing={fetchDataHandler}
          />
        </View>
        {loading && (
          <View>
            <ActivityIndicator size={'large'} color="#000" />
          </View>
        )}
        {display ? (
          <View style={styles.infoview}>
            <Text
              style={
                styles.citycountryText
              }>{`${data?.name}, ${data?.sys?.country}`}</Text>
            <Text style={styles.dateText}>{new Date().toLocaleString()}</Text>
            <Text style={styles.temptext}>{`${Math.round(
              data?.main?.temp,
            )} °C`}</Text>

            <Text style={styles.minmaxtext}>{`Min ${Math.round(
              data?.main?.temp_min,
            )} °C / Max ${Math.round(data?.main?.temp_max)} °C`}</Text>
            <Text style={styles.desctext}>
              {data?.weather?.description?.main}
            </Text>
          </View>
        ) : null}
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    flexDirection: 'column',
  },
  textinput: {
    borderBottomWidth: 3,
    padding: 5,
    paddingVertical: 20,
    marginVertical: 100,
    marginHorizontal: 10,
    backgroundColor: '#fff',
    fontSize: 19,
    borderRadius: 16,
    borderBottomColor: '#df8e00',
    color: 'black',
  },
  infoview: {
    alignItems: 'center',
  },
  citycountryText: {
    color: '#fff',
    fontSize: 40,
    fontWeight: 'bold',
  },
  dateText: {
    color: '#fff',
    fontSize: 22,
    marginVertical: 10,
  },
  temptext: {
    fontSize: 45,
    color: '#fff',
    marginVertical: 10,
  },
  minmaxtext: {
    fontSize: 22,
    color: '#fff',
    marginVertical: 10,
    fontWeight: '500',
  },
});

export default App;
