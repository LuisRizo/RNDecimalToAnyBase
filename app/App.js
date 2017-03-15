import React, { Component } from 'react';
import {View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, StyleSheet, Alert} from 'react-native';
import { Button } from 'react-native-material-design'
import { THEME_NAME } from 'react-native-material-design';
import { PRIMARY_COLORS, COLOR } from 'react-native-material-design';
import TextField from 'react-native-md-textinput'
const dismissKeyboard = require('dismissKeyboard')

export default class App extends Component{

  focusNextField = (nextField) => {
    this.refs[nextField].focus();
  };

  render(){
    return(
      <TouchableWithoutFeedback onPress={()=>dismissKeyboard()}>
        <View style={styles.container}>
          <View style={styles.SecondaryContainer}>
            <Text style={styles.welcome}>
              From decimal to any base!
            </Text>
            <View style={styles.TextField}>
              <TextField style={styles.TextInput}
                returnKeyType={"next"}
                clearButtonMode={"while-editing"}
                enablesReturnKeyAutomatically={true}
                blurOnSubmit={false}
                onSubmitEditing={()=>this.focusNextField('base')}
                label={"Decimal Number"}
                ref="number"
                highlightColor={'#00BCD4'}
                autoCapitalize={"none"}
                autoCorrect={false}
                keyboardType={'numeric'}
                returnKeyType="next"/>
            </View>
            <View style={styles.TextField}>
              <TextField style={styles.TextInput}
                returnKeyType={"next"}
                clearButtonMode={"while-editing"}
                enablesReturnKeyAutomatically={true}
                blurOnSubmit={false}
                onSubmitEditing={()=>this.convert()}
                label={"Base"}
                ref="base"
                highlightColor={'#00BCD4'}
                autoCapitalize={"none"}
                autoCorrect={false}
                keyboardType={'numeric'}
                returnKeyType="done"/>
                <View style={{margin:20}} />
                <Button
                style={{borderRadius:30}}
                text={"Convert"}
                raised={true}
                onPress={()=>this.convert()}
                />
            </View>
          </View>
          <View style={styles.credits}>
            <Text style={styles.instructions}>Made by Luis Rizo</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    )
  }
  convert = () =>{
    number = this.refs.number.state.text; //Decimal number
    radix = parseInt(this.refs.base.state.text); //Base to convert to
    var remainder = [];
    var result = [];
    var finalResult = "Error";
    var i = 0;
    if (number && radix) {
      if (isNaN(number) || isNaN(radix)) {
        Alert.alert("Error", "Please enter a valid number and base");
      }else if ((radix>1 && radix<=16) && (number>0)){
        do{
          if(i>0){
            result[i] = (parseInt(result[i-1]/radix)); //parsing to Int to get rid of the decimals in the divisions.
            remainder[i] = parseInt(result[i-1] % radix);
            console.log("result[i], remainder[i]",result[i], remainder[i]);
          }else{
            result[i] = (parseInt(number/radix, 10));
            remainder[i] = parseInt(number % radix, 10);
          }
          i= i + 1;
        }while(remainder[i-1]>0 || result[i-1]>0);
        console.log("Remainder before hexaDecimalConversion", remainder);

        //This will loop through the array to check for remainders>10
        //And do the Hexadecimal conversion
        remainder.map((number,index)=>{
          remainder[index] = this.hexaDecimalConversion(number);
        });

        //This gets rid of the 0 in the beginning of the array
        //For example (0540 = 540 after this condition);
        if (remainder[remainder.length-1]==0) {
          remainder.pop();
        }

        //Read the results from bottom to top
        remainder.reverse();

        //This will make sure that there is a result, else finalResult = "Error";
        if (remainder.length>0) {
          finalResult = "";
        }

        //Append each element of the remainder to the finalResult
        for(i = 0; i < remainder.length ;i++){
          finalResult = finalResult + remainder[i];
        }
        Alert.alert("Converted number (base " + radix + "): ", finalResult);
      }else {
        Alert.alert("Error", "Please enter a valid radix");
      }
    }else {
      Alert.alert("Error" ,"Please enter a number and a base");
    }
  }

  hexaDecimalConversion = (number) =>{
    console.log("number: ",number);
    convertedNum = number;
    switch (number.toString()){
      case "10":
        convertedNum='A'
        break;
      case '11':
        convertedNum='B'
        break;
      case '12':
        convertedNum='C'
        break;
      case "13":
        convertedNum='D'
        break;
      case "14":
        convertedNum='E'
        break;
      case '15':
        convertedNum='F'
        break;
      default:
    }
    console.log("convertedNum: ",convertedNum);
    return convertedNum;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  TextField:{
    marginHorizontal:50,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  TextInput:{
    minWidth:280,
    minHeight:30,
    borderRadius:4,
    backgroundColor:'#EEEEEE',
    paddingTop:5,
    paddingBottom:5,
  },
  credits:{
    position:'absolute',
    bottom:10,
  }
});
