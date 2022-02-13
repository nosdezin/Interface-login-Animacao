import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Image,
  TextInput,
  TouchableOpacity,
  Animated,
  Keyboard,
} from "react-native";

export default function App() {
  const [offset] = useState(new Animated.ValueXY({ x: 0, y: 90 }));
  const [opacity] = useState(new Animated.Value(0));
  const [logo] = useState(new Animated.ValueXY({ x: 130, y: 155 }));

  useEffect(() => {
    KeyboardShowListener = Keyboard.addListener(
      "keyboardDidShow",
      keyboardDidShow
    );
    KeyboardHideListener = Keyboard.addListener(
      "keyboardDidHide",
      keyboardDidHide
    );

    Animated.parallel([
      Animated.spring(offset.y, {
        toValue: 0,
        speed: 4,
        bounciness: 20,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 200,
      }),
    ]).start();
  }, []);

  function keyboardDidShow() {
    // alert("teclado aberto");
    Animated.parallel([
      Animated.timing(logo.x, {
        toValue: 55,
        duration: 100,
      }),
      Animated.timing(logo.y, {
        toValue: 65,
        duration: 100,
      }),
    ]).start();
  }

  function keyboardDidHide() {
    // alert("teclado fechado");
    Animated.parallel([
      Animated.timing(logo.x, {
        toValue: 130,
        duration: 100,
      }),
      Animated.timing(logo.y, {
        toValue: 155,
        duration: 100,
      }),
    ]).start();
  }

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.viewLogo}>
        <Animated.Image
          source={require("./src/assets/logo.png")}
          style={{ width: logo.x, height: logo.y }}
        />
      </View>

      <Animated.View
        style={[
          styles.form,
          {
            opacity: opacity,
            transform: [{ translateY: offset.y }],
          },
        ]}
      >
        <TextInput
          placeholder="Email"
          autoCorrect={false}
          style={styles.input}
          onChangeText={() => {}}
        />
        <TextInput
          placeholder="Senha"
          autoCorrect={false}
          style={styles.input}
          onChangeText={() => {}}
        />

        <TouchableOpacity style={styles.btnSubmit}>
          <Text style={styles.SubmitText}>Acessar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnRegister}>
          <Text style={styles.RegisterText}>Criar conta gratuita</Text>
        </TouchableOpacity>
      </Animated.View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#191919",
    alignItems: "center",
    justifyContent: "center",
  },
  viewLogo: {
    flex: 1,
    justifyContent: "center",
  },
  form: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    paddingBottom: 50,
  },
  input: {
    backgroundColor: "#FFF",
    width: "90%",
    marginBottom: 15,
    color: "#222",
    fontSize: 17,
    borderRadius: 7,
    padding: 10,
  },
  btnSubmit: {
    backgroundColor: "#35AAFF",
    width: "90%",
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 7,
  },
  SubmitText: {
    color: "#FFF",
    fontSize: 18,
  },
  btnRegister: {
    marginTop: 10,
  },
  RegisterText: {
    color: "#FFF",
  },
});
