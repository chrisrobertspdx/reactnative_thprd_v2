import React, { Component } from "react";
import { View, Image, Button, StyleSheet,Alert } from "react-native";
import ImagePicker from 'react-native-image-picker';

import imagePlaceholder from "../../assets/beautiful-place.jpg";

class PickImage extends Component {
  state = {
    pickedImage: null
  }
  
  pickImageHandler = () => {
    ImagePicker.showImagePicker
      (
        {title: "Pick an Image"},
        res => {
          if (res.didCancel) {
            Alert.alert("User cancelled");
          }
          else if (res.error) {
            Alert.alert("Error");
          }
          else {
            this.setState({
              pickedImage: {uri: res.uri}
            });
            this.props.onImagePicked({uri: res.uri, base64: res.data});
          }
        }
      );
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.placeholder}>
          <Image source={this.state.pickedImage} style={styles.previewImage} />
        </View>
        <View style={styles.button}>
          <Button title="Pick Image" onPress={this.pickImageHandler} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        alignItems: "center"
    },
    placeholder: {
      borderWidth: 1,
      borderColor: "black",
      backgroundColor: "#eee",
      width: "80%",
      height: 150
    },
    button: {
      margin: 8
    },
    previewImage: {
        width: "100%",
        height: "100%"
    }
  });

export default PickImage;
