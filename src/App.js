/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React,{Component} from 'react';
import {DatePicker} from "react-native-common-date-picker";
import RNPickerSelect from 'react-native-picker-select';
// import SelectDropdown from 'react-native-select-dropdown'
// import type {Node} from 'react'; 
import { 
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
  Alert ,
  TextInput
} from 'react-native';



const sports = [
  {
    label: 'Football',
    value: 'football',
  },
  {
    label: 'Baseball',
    value: 'baseball',
  },
  {
    label: 'Hockey',
    value: 'hockey',
  },
];


const Separator = () => (
  <View style={styles.separator} />
);
// const isDarkMode = useColorScheme() === 'dark';
 
// const backgroundStyle = {
//   backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
// };
export default class App extends Component {
  constructor() {
    super();
    this.state = {
        dropdownValueME: -1,
        dropdownValueNum: 'Nessuna',
        dropdownValueCirc: 'Nessuna',
        dropdownValueInterr: 'Nessuna',
        myNumber:'6',
        editableNumber: true
    }
  }

  onChanged(text){
    let newText = '';
    let numbers = '0123456789';
    for (var i=0; i < text.length; i++) {
        if(numbers.indexOf(text[i]) > -1 ) {
            newText = newText + text[i];
        }
        else {
            // your call back function
            alert("please enter numbers only");
        }
    }
    if(parseInt(newText)<=30 || newText=='' ){this.setState({ myNumber: newText });}
    else{alert("please enter numbers minore di 31");}
    
}


  handleDropdownChange = (name) => (value) => {
    let editableNumberT= false;
    if(name=='dropdownValueME' && value==-1){
      console.warn(name,value);
      editableNumberT=true;
       }

    this.setState({ [name]: value,
      editableNumber: editableNumberT });
    console.log(value);
 }
  render() { 
    const { dropdownValueME,
      myNumber,dropdownValueCirc,
      editableNumber,dropdownValueInterr,dropdownValueNum } = this.state
  return (
    <SafeAreaView style={styles.container} >
      <StatusBar />
      {/* <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        > */}
        <View >
            <DatePicker confirm={date => {console.warn(date)}}/>
        <Text>Massimo Edittale</Text>
       
              <RNPickerSelect style={styles.selectBoxMax}
              // useNativeAndroidPickerStyle={false}
                    items={[
                        { label: 'Scelgo io', value: -1 },
                        { label: 'Delitto', value: 6 },
                        { label: 'Contravvenzione', value: 4 },
                    ]}
                    value={dropdownValueME}
                    placeholder={{}}
                    onValueChange={this.handleDropdownChange('dropdownValueME')}
                />
                 <View   style = {{flexDirection: 'row'}}>
<TextInput 
   style={styles.numberInput}
   keyboardType='numeric'
   onChangeText={(text)=> this.onChanged(text)}
   value={myNumber}
   maxLength={2}  //setting limit of input
   editable={editableNumber} selectTextOnFocus={editableNumber} 
/>
<Text style={{padding: 10}}> Anni di reato </Text>
              {/* <RNPickerSelect style={styles.minSelectBox}
                  value={dropdownValueNum}
                  placeholder={{ label: "Select you favourite language", value: null }}
                  items={[
                      { label: 'Scelgo io', value: -1 },
                      { label: 'Delitto', value: 6 },
                      { label: 'Contravvenzione', value: 4 },
                  ]}
                  onValueChange={this.handleDropdownChange('dropdownValueNum')}
              /> */}
        </View>
        <Separator />
         <Text>Circostanze</Text>
        <RNPickerSelect
            value={dropdownValueCirc}
            placeholder={{}}
            items={[
                { label: '1/3', value: 0.33 },
                { label: '1/2', value: 0.5 },
                { label: '2/3', value: 0.66 },
                { label: 'Nessuna', value: null },
            ]}
            onValueChange={this.handleDropdownChange('dropdownValueCirc')}
        />
         <Text>Interruzione</Text>
        <RNPickerSelect
            value={dropdownValueInterr}
            placeholder={{label: "Nessuna", value: null}}
            items={[
                { label: '1/4', value: 0.25 },
            ]}
            onValueChange={this.handleDropdownChange('dropdownValueInterr')}
        />
        <Separator />
        <View style={styles.fixToText}>
        <Button
        title="Calcola"
        disabled
        />
        <Button
        title="Clear"
        color="#f194ff"
        onPress={() => Alert.alert('Button with adjusted color pressed')}
        />
        </View>
          {/* <LearnMoreLinks /> */}
        </View>
      {/* </ScrollView> */}
    </SafeAreaView>
  );
  }
};

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  selectBoxMax:{
  },
  minSelectBox:{
    marginLeft: 80, marginRight: 10
  },
  numberInput:{
    // backgroundColor: '#C0C0C0',
    // borderLeftWidth: 1,
    // borderRightWidth: 1,
    borderWidth :1,
    height: 37,
    width: 50,
    // paddingLeft: 15,
    marginLeft: 100,
    borderStartWidth :2
  },
  separator: {
    marginVertical: 8,
    paddingHorizontal: 2,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 16,
  },
  title: {
    textAlign: 'center',
    marginVertical: 8,
  },
});

