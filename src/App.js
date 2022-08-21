/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React,{Component,useState} from 'react';
import {DatePicker} from "react-native-common-date-picker";
import RNPickerSelect from 'react-native-picker-select';
import moment from "moment";
import DynamicComponent from '../src/component/DynamicComponent'

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
        dataDiPartenza: moment(new Date()).format("YYYY-MM-DD"),
        // dataDiPartenza:null,
        dropdownValueME: -1,
        // dropdownValueNum: 'Nessuna',
        dropdownValueCirc: 0.33,
        dropdownValueInterr: -1,
        myNumber:'6',
        editableNumber: true
        //Aggiungere 6 anni alla data e fare la differenza in giorni
        // https://betterprogramming.pub/using-moment-js-in-react-native-d1b6ebe226d4
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
    
    if(name=='dropdownValueME'){
      let editableNumberT= false;
      if(value==-1){
        editableNumberT=true;
      }
      this.setState({ editableNumber: editableNumberT });
    }
    this.setState({ [name]: value });
    
    // if(name=='dropdownValueME' && value==-1){
    //   // console.warn(name,value);
    //   editableNumberT=true;
    //    }
    // console.log(value);
 }


TrasformazionePeriodoInGiorni(anni,mesi,giorni){
    let giorniTot=(anni*365)+(mesi*30)+(giorni*1);
    return giorniTot;
}

TrasformazioneGiorniInAnni(giorniPer){
//   years = totalDays//365
// months = (totalDays%365)//30
// days = (totalDays%365)%30

  // console.warn('giorniPer',giorniPer);
  // let anniTot=parseInt(giorniPer/365);
  // let mesiTot=giorniPer%365; 
  // let giorniTot=0;
  // if(mesiTot<=30){
  //   giorniTot=parseInt(mesiTot);
  //   mesiTot=0;
  // }else{
  //   giorniTot=parseInt(mesiTot%30);
  //   mesiTot=parseInt(mesiTot/30); 
  // }
  let anniTot=parseInt(giorniPer/365);
  let mesiTot=parseInt((giorniPer%365)/30.417);
  let giorniTot=parseInt((giorniPer%365)%30.417); 

  // let arrays= Array(anniTot,mesiTot,giorniTot);
  let arrays = [anniTot, mesiTot, giorniTot];
  
  // console.warn('arrays',arrays);
  return arrays;
}

PeriodoConIncrementoFrazionarioInGiorni(incremFraz,anniCondanna,mesiCondanna,giorniCondanna){
  let periodoEdittaleInGiorni=this.TrasformazionePeriodoInGiorni(anniCondanna,mesiCondanna,giorniCondanna);
  // console.warn('periodoEdittaleInGiorni',periodoEdittaleInGiorni);
  let edittaleIngiorni= this.IncrementoFrazionario(periodoEdittaleInGiorni,incremFraz);
  // console.warn('edittaleIngiorni',edittaleIngiorni);
  return edittaleIngiorni;
}

IncrementoFrazionario(periodoEdittaleInGiorni,incremFraz){
 return (periodoEdittaleInGiorni*incremFraz) + periodoEdittaleInGiorni;
}

getGiorniSospensione(){
  let tot=0;
  let dataArray = this._b.getValues();
  if (dataArray.length !== 0){
    dataArray.forEach(element => {
      console.log("element: ", element);
      if(typeof parseInt(element.text) === 'number'){
      tot+= parseInt(element.text) 
    }
    });
  }
  console.log("tot: ", tot);
  return tot;
}

Calcola(){
  const { dropdownValueME, 
    myNumber,dropdownValueCirc,dataDiPartenza,
    editableNumber,dropdownValueInterr,dropdownValueNum } = this.state;
    let periodoTotale=myNumber;
    if(dropdownValueME!=-1){
      periodoTotale=dropdownValueME;
    }
    let giorniTot=this.PeriodoConIncrementoFrazionarioInGiorni(0,periodoTotale,0,0);
    //CIRCOSTANZA
    if(dropdownValueCirc!=-1){
      giorniTot=this.PeriodoConIncrementoFrazionarioInGiorni(dropdownValueCirc,periodoTotale,0,0);
      periodoTotale=(giorniTot/365);
    }
    // console.warn('dropdownValueInterr',dropdownValueInterr);
    // console.warn('giorniTot',giorniTot);
    if((periodoTotale<dropdownValueME & dropdownValueME!=-1)){
      periodoTotale=dropdownValueME; 
      giorniTot=(periodoTotale*365);
      // console.warn('giorniTot',giorniTot);
    }
    
    if((dropdownValueME==-1 && periodoTotale<6)){
      periodoTotale=6;
      giorniTot=(periodoTotale*365);
      // console.warn('giorniTot',giorniTot);
    }
    
    // console.warn('dropdownValueInterr',dropdownValueInterr);
    //INTERRUZIONE
    if(dropdownValueInterr!=-1){
      giorniTot=this.IncrementoFrazionario(giorniTot,dropdownValueInterr);
      // console.warn('giorniTot',giorniTot);
    }
    console.log("giorniTot: ", giorniTot);
    //SOSPENSIONE
    giorniTot+=this.getGiorniSospensione();
    console.log("giorniTot con sosp: ", giorniTot);
    let arrayperiod=this.TrasformazioneGiorniInAnni(giorniTot);
    //Data Di partenza:
    const dataDipartenza1= moment(dataDiPartenza, "YYYY-MM-DD");
    // console.warn('dataDipartenza',dataDipartenza1);
    //DATA PIU GLI ANNI DI REATO:
   let dataSommandoReatoYear=moment(dataDiPartenza, "YYYY-MM-DD");
   dataSommandoReatoYear.add(arrayperiod[0], 'years').calendar();
  //  console.warn('dataSommandoReatoYear',dataSommandoReatoYear);
   dataSommandoReatoYear.add(arrayperiod[1], 'months').calendar();
  //  console.warn('dataSommandoReatoYear',dataSommandoReatoYear);
   dataSommandoReatoYear.add(arrayperiod[2], 'days').calendar();
   dataSommandoReatoYear=moment(dataSommandoReatoYear, "YYYY-MM-DD");
  //  console.warn('dataSommandoReatoYear',dataSommandoReatoYear);

 
    Alert.alert("La prescrizione risulta di anni e in data: ",
    arrayperiod[0].toString() + " anni " 
   + arrayperiod[1].toString() + " mesi " 
   + arrayperiod[2].toString() + " giorni " 
    + " "+ dataSommandoReatoYear.format("DD-MM-YYYY") );

}


// componentDidUpdate(prevProps) {
//   if (this.props.id !== prevProps.id) {
//     let data = await axios
//     .get("https://jsonplaceholder.typicode.com/todos/" + this.props.id)
//     .then(function(response) {
//       return response;
//     })
//     .catch(function(error) {
//       console.log(error);
//     });
//     this.setState({ todo: data.data });
//   }
// }

Clear(){
  // const { dropdownValueCirc} = this.state;
  // this.state = {
  //   dataDiPartenza: moment(new Date()).format("YYYY-MM-DD"),
  //   // dataDiPartenza:null,
  //   dropdownValueME: -1,
  //   dropdownValueCirc: 0.33,
  //   dropdownValueInterr: -1,
  //   myNumber:'6',
  //   editableNumber: true
  // }
  // dropdownValueCirc=0.33;

  // console.log(this._c.date);
  // this._c.date=moment().format("YYYY-MM-DD");
  // this._c.Date=moment().format("YYYY-MM-DD");
  // this._c.defaultDates=['2015-10-10', '2020-01-01'];
  // console.log(this._c.date);
  this.setState({ dropdownValueCirc: 0.50, dropdownValueInterr: -1,myNumber:'6',editableNumber:true });
  this.setState({ dropdownValueME: -1,dataDiPartenza: "" });
  this._b.removeAllTextInput();
  // console.warn('clear',this.state.dataDiPartenza= moment());
  // this.render();
}

dateChanged = (provider, d) => {
  // console.warn(d);
  this.setState({ [provider]: d });
}


// Calcola3(){
//   const { dropdownValueME, 
//     myNumber,dropdownValueCirc,dataDiPartenza,
//     editableNumber,dropdownValueInterr,dropdownValueNum } = this.state;
//     if(dropdownValueME!=-1){
//       myNumber=dropdownValueME;
//     }
// //DATA DI PARTENZA:
//    const dataDipartenza= moment(dataDiPartenza, "YYYY-MM-DD");
//    console.warn('dataDipartenza',dataDipartenza);
// //DATA PIU GLI ANNI DI REATO:
//    let dataSommandoReatoYear=moment(dataDiPartenza, "YYYY-MM-DD");
//    dataSommandoReatoYear.add(myNumber, 'years').calendar();
//    dataSommandoReatoYear=moment(dataSommandoReatoYear, "YYYY-MM-DD");
//    console.warn('dataSommandoReatoYear',dataSommandoReatoYear);
// //GIORNI TRA DATA DI PARTENZA E DATA DI REATO(GIORNI DI REATO):
//    let dateDiff = dataSommandoReatoYear.diff(dataDipartenza, 'days');
//    console.warn('dateDiff',dateDiff);
// //VERIFICA SE è PRESENTE LA CIRCOSTANZA:
// let giorniPiuCircostanze;
// if(dropdownValueCirc!=-1){
//   //GIORNI TRA DATA DI PARTENZA E DATA DI REATO PIU' LE CIRCOSTANZE:
//   giorniPiuCircostanze=((dateDiff)*(dropdownValueCirc))+dateDiff;
//   console.warn('dropdownValueCirc',dropdownValueCirc);
// }else{
//   giorniPiuCircostanze=dateDiff;
// }
// console.warn('giorniPiuCircostanze',giorniPiuCircostanze);
// //DATA TRA DATA DI PARTENZA E DATA DI REATO PIU' LE CIRCOSTANZE:
//   let dataSommandoCircostanze=moment(dataDiPartenza, "YYYY-MM-DD");
//   dataSommandoCircostanze.add(giorniPiuCircostanze, 'days').calendar();
//   console.warn('dataSommandoCircostanze',dataSommandoCircostanze);
// //ANNI di Differenza TRA reato con circostanza e Data Di Partenza
//   let anniDiffCirc = dataSommandoCircostanze.diff(dataDipartenza, 'years');
// // CONTROLLO differenza ANNI:
//     if(anniDiffCirc<6){
//       anniDiffCirc=6;
//     }


//     //TRAFORMAZIONE:
//     let dataDipartenza1= dataDipartenza;
//     //dataSommandoCircostanze=a
//     let years = dataSommandoCircostanze.diff(dataDipartenza, 'year');
//     dataDipartenza.add(years, 'years');

//     let months = dataSommandoCircostanze.diff(dataDipartenza, 'months');
//     dataDipartenza.add(months, 'months');

//     let days = dataSommandoCircostanze.diff(dataDipartenza, 'days');
//     console.warn('anniDiffCirc',anniDiffCirc);
//     Alert.alert("La prescrizione risulta di anni e in data: ",
//     years.toString() + " anni " 
//    + months.toString() + " mesi " 
//    + days.toString() + " giorni " 
//     + " "+ dataSommandoCircostanze.format("DD-MM-YYYY") );
//   //  let daysLeft = dateDiff !== null && !isNaN(dateDiff) ? (
//   //   <Text>{dateDiff} Days until your </Text>) : null;
//     // Alert.alert(dateDiff);
//     // console.warn('dateDiff ',dateDiff);
    
//     // console.warn('+ 1/4:  ',giorniPiuCircostanze);
    
//     // console.warn('dataSommandoCircostanze:  ',dataSommandoCircostanze.format('YYYY-MM-DD'));
//     // console.warn('dataSommandoReatoYear ',dataSommandoReatoYear.format('YYYY-MM-DD'));
//     // console.warn('dataDipartenza',dataDipartenza.format('YYYY-MM-DD'));
// }


  render() { 
    const { dropdownValueME,
      myNumber,dropdownValueCirc,dataDiPartenza,
      editableNumber,dropdownValueInterr,dropdownValueNum } = this.state;
      // const [date, setDate] = useState(new Date());
  return (
    <SafeAreaView style={styles.container} >
      <StatusBar />
      {/* <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        > */}
        <View >
            <DatePicker ref={ref => (this._c = ref)}
            // selectedDateMarkType='dot'
             onValueChange={selectedDate  => console.warn(selectedDate)}
            //  onDateChange={this.dateChanged.bind(this, "dataDiPartenza")}
               confirm={date => {this.dateChanged.bind(this, "dataDiPartenza");this.setState({dataDiPartenza:date})}}/>
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
                { label: '1/2', value: 0.5 },
                { label: '2/3', value: 0.66 },
                { label: 'Nessuna', value: -1 },
            ]}
            onValueChange={this.handleDropdownChange('dropdownValueCirc')}
        />
        <Text>Interruzione</Text>
        <RNPickerSelect
            value={dropdownValueInterr}
            placeholder={{label: "Nessuna", value: -1}}
            items={[
                { label: '1/4', value: 0.25 },
            ]}
            onValueChange={this.handleDropdownChange('dropdownValueInterr')}
        />
        <Separator />
        <Text>Sospensioni</Text>
        <DynamicComponent  ref={ref => (this._b = ref)} />
        <Separator />
        <View style={styles.fixToText}>
        <Button
        title="Calcola"
        onPress={() => this.Calcola()}
        />
        <Button
        title="Clear"
        color="#f194ff"
        onPress={() => this.Clear()}
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

