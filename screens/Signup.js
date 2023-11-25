import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, SafeAreaView , StatusBar} from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, database } from "../config/firebase";

const Signup = ({ navigation }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [imageURL, setImageURL] = useState(""); 
    const onHandleSignup = async () => {
        try {
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
          const user = userCredential.user;
          const userRef = doc(database, "users", user.uid);
          await setDoc(userRef, {
            displayName: name,
            email: email,
            uid: user.uid,
            photoURL: imageURL || profile,
            phoneNumber: "",
          });
        } catch (error) {
          Alert.alert(error.message);
        }
      };

      return (
        <View style={styles.container}>
          {/* Background Image */}
          {/* <Image source={backImage} style={styles.backImage} /> */}
      
          {/* White Overlay */}
          {/* <View style={styles.whiteSheet} /> */}
      
          {/* Title */}
          <Text style={styles.title}>Sign Up</Text>
      
          <SafeAreaView style={styles.form}>
            {/* Input Fields */}
            <TextInput
              style={styles.input}
              placeholder="Enter name"
              autoCapitalize="none"
              autoCorrect={false}
              textContentType="name"
              value={name}
              onChangeText={(text) => setName(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter email"
              autoCapitalize="none"
              keyboardType="email-address"
              textContentType="emailAddress"
              autoFocus={true}
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter password"
              autoCapitalize="none"
              autoCorrect={false}
              showSoftInputOnFocus={false}
              secureTextEntry={true}
              textContentType="password"
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter image URL"
              value={imageURL}
              onChangeText={(text) => setImageURL(text)}
            />
      
            {/* Signup Button */}
            <TouchableOpacity style={styles.button} onPress={onHandleSignup}>
              <Text style={{ fontWeight: "bold", color: "#fff", fontSize: 18 }}>Sign Up</Text>
            </TouchableOpacity>
      
            {/* Navigation to Login Screen */}
            <View
              style={{
                marginTop: 20,
                flexDirection: "row",
                alignItems: "center",
                alignSelf: "center",
              }}
            >
              <Text style={{ color: "gray", fontWeight: "600", fontSize: 14 }}>
                Don't have an account?{" "}
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text style={{ color: "#f57c00", fontWeight: "600", fontSize: 14 }}>Log In</Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
          {/* StatusBar */}
          <StatusBar barStyle="light-content" />
        </View>
      );
    }

    export default Signup;

    const styles = StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: '#fff', // Set your desired background color
          justifyContent: 'center',
          alignItems: 'center',
        },
        backImage: {
          // Define styles for the background image if needed
        },
        whiteSheet: {
          ...StyleSheet.absoluteFillObject,
          backgroundColor: 'rgba(255, 255, 255, 0.8)', // White overlay with transparency
        },
        title: {
          fontSize: 24,
          fontWeight: 'bold',
          marginTop: 20,
        },
        form: {
          width: '80%',
          marginTop: 20,
        },
        input: {
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          marginBottom: 10,
          paddingLeft: 10,
        },
        button: {
          backgroundColor: '#f57c00',
          padding: 10,
          borderRadius: 5,
          alignItems: 'center',
          marginTop: 20,
        },
      });
      