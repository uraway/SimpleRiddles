/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

const React = require('react-native');
const diff = require('deep-diff');
const riddleText = require('./riddleText.js');
const riddleAns = require('./riddleAns.js');

var {
  AppRegistry,
  StyleSheet,
  TouchableHighlight,
  Text,
  TextInput,
  View,
} = React;

class SimpleRiddles extends React.Component{
  constructor() {
    super();
    this.state = ({
      userAns: [],
      progress: 0,
      inputText: '',
      msg: '',
      showContinue: false,
    });
  }

  checkAns(index) {
    var difference = diff(this.state.userAns[index], riddleAns[index]);
  }

  onPressedSubmit(event) {
    this.setState({
      inputText: event.nativeEvent.inputText,
      userAns: this.state.inputText
    });
    let check = this.checkAns(this.state.progress); //正解ならundefined
    if(check == undefined){
      this.setState({
        msg: "正解！！",
      });
    }else{
      this.setState({
        msg: "不正解...",
        inputText: '',
      });
    }
  }

  onPressedContinue() {
    this.setState({
      progress: progress + 1,
      inputText: '',
    });
  }

  render() {
    let progress = this.state.progress;
    let showContinue = this.state.showContinue ? "Continue" : "" ;
    return(
      <View style={styles.container}>
        <Text>{this.state.msg}</Text>
        <Text style={styles.riddleText}>{riddleText[0]}</Text>
        <TextInput style={styles.userAns} value={this.state.inputText} />
        <TouchableHighlight style={styles.button} onPress={this.onPressedSubmit.bind(this)}>
          <Text style={styles.buttonText}>submit your answer</Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.button} onPress={this.onPressedContinue.bind(this)}>
          <Text style={styles.buttonText}>{showContinue}</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  riddleText: {
    textAlign: 'center',
    marginBottom: 5,
  },
  userAns: {
    height: 36,
    padding: 4,
    marginRight: 5,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#48BBEC',
    borderRadius: 8,
  },
});

AppRegistry.registerComponent('SimpleRiddles', () => SimpleRiddles);
