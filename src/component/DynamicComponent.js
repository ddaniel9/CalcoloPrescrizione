import React, { Component } from 'react';
import { View, TextInput, Text, Button, StyleSheet } from 'react-native';


class DynamicComponent extends Component {

  constructor(props){
    super(props);
    this.getValues = this.getValues.bind(this);
    this.state = {
      textInput : [],
      inputData : []
    }
  }

  //function to add TextInput dynamically
  addTextInput = (index) => {
    let textInput = this.state.textInput;

    textInput.push(   
      <View style={styles.fixToTextD}>
    <TextInput keyboardType='numeric' style={styles.textInputD}
      onChangeText={(text) => this.addValues(text, index)} />
      <Text style={{padding: 10,top: 5}}> Aggiungi giorni di sospensione </Text>
      </View>
      );
    textInput.push();

    this.setState({ textInput });
  }

  //function to remove TextInput dynamically
  removeTextInput = () => {
    let textInput = this.state.textInput;
    let inputData = this.state.inputData;
    textInput.pop();
    inputData.pop();
    this.setState({ textInput,inputData });
  }

  //function to add text from TextInputs into single array
  addValues = (text, index) => {
    let dataArray = this.state.inputData;
    let checkBool = false;
    if (dataArray.length !== 0){
      dataArray.forEach(element => {
        if (element.index === index ){
          element.text = text;
          checkBool = true;
        }
      });
    }
    if (checkBool){
    this.setState({
      inputData: dataArray
    });
  }
  else {
    dataArray.push({'text':text,'index':index});
    this.setState({
      inputData: dataArray
    });
  }
  }

  //function to console the output
  getValues = () => {
    console.log('Data',this.state.inputData);
  }


  render(){
    return(
      <View >
        {this.state.textInput.map((value) => {
          return value
        })}
        <View style= {styles.row}>
          <View style={{margin: 10}}>
        <Button title='+' onPress={() => this.addTextInput(this.state.textInput.length)} />
        </View>
        <View style={{margin: 10}}>
        <Button title='-' onPress={() => this.removeTextInput()} />
        </View>
        </View>
        
        <Button title='Get Values' onPress={() => this.getValues()} />
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  buttonView: {
  flexDirection: 'row'
  },
  textInputD: {
    flexDirection: 'row',
    borderWidth :1,
    height: 37,
    width: 50,
    // paddingLeft: 15,
    marginLeft: 50,
    borderStartWidth :2,
    top: 10
},
row:{
  flexDirection: 'row',
  justifyContent: 'center'
  },
fixToTextD: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
});

export default DynamicComponent;