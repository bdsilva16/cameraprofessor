import { View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Camera, CameraType } from "expo-camera"
import { Button } from 'react-native';
import { StyleSheet } from 'react-native';
import * as MediaLibrary from 'expo-media-library';



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
        style={styles.container}
        type={CameraType.back}
        ratio={"1:1"}
      />
      <Button title='Tirar foto' onPress={() => { takePicture() }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  styleCamera: {
    aspectRatio: 1,
    flex: 1
  }

})