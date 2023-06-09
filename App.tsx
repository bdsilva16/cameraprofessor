import { TouchableHighlight, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Camera, CameraType } from "expo-camera"
import { Button, Text } from 'react-native';
import { StyleSheet } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import { Image } from 'expo-image';
import { Entypo } from '@expo/vector-icons';


export default function App() {

  const [image, setImage] = useState(null);
  const [camera, setCamera] = useState(null);
  const [permission, setPermission] = useState(null);

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setPermission(cameraStatus.status === "granted");
      await MediaLibrary.requestPermissionsAsync()
    })();
  }, []);

  async function takePicture() {
    if (camera) {
      const { uri } = await camera.takePictureAsync();
      console.log(uri);
      setImage(uri);
      await MediaLibrary.saveToLibraryAsync(uri);
    }
  }

  return (
    <View style={styles.container}>
      <Camera
        ref={(ref) => setCamera(ref)}
        style={styles.styleCamera}
        type={CameraType.back}
        ratio={"1:1"}
      />

      <Image
        style={styles.image}
        source={image}
        contentFit="cover"
        transition={1000}

      />
      <TouchableHighlight
        style={styles.button}
        onPress={() => { takePicture() }}>

        <Entypo name="camera" size={40} color="black" />

      </TouchableHighlight>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  styleCamera: {
    aspectRatio: 1,
    flex: 1
  },

  button: {
    justifyContent: "center",
    alignItems: "center",
    elevation: 6,
    backgroundColor: "#fff",
    width: 100,
    height: 100,
    borderRadius: 100,
    position: "absolute",
    bottom: 50,
    borderColor:"red",
    borderWidth:2
  },

  image: {

    flex: 1,
    width: '100%',
    height: '100%'
  }


});


