import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { View, Text, Button, TextInput, AsyncStorage, StyleSheet, ScrollView, TouchableHighlight } from 'react-native';
import { Actions } from 'react-native-router-flux';

import { Styles } from '../../app/common/styles';
import { templateSelector } from '../../app/common/templates';
import {move} from '../../app/common/helper';
import { AddField } from './form-action';

const template = templateSelector('default');

import ListView from './list-view';

 class FormConfig extends Component {
   constructor(props){
     super(props);
     this.state ={
       text: null
     }
     this.onKeyPress = this.onKeyPress.bind(this);
   }
   onKeyPress(event){
        if (event.nativeEvent.key == 'Enter' && this.state.text) {
          this.props.AddField(this.state.text);
          this.setState({text: ''});
          // var newDataItem = new TodoModel(this.state.newValue);
          //
          // var dataList = this.props.data;
          // var dataItem = Utils.findTodo(newDataItem, dataList);
          // if(dataItem) {
          //   Utils.move(dataList, (dataList.indexOf(dataItem)), 0);
          //
          //   this.setState({
          //     newValue: ''
          //   });
          //   this.props.updateDataList(dataList);
          //   return;
          // }
          //
          // dataList.unshift(newDataItem);
          //
          // this.setState({
          //   newValue: ''
          // });
          // this.props.updateDataList(dataList);
        }
      }

    render(){
      return(
        <View style={template.container}>
        <TextInput style={template.addFormFieldInput}
            placeholder='Add Form Field'
            blurOnSubmit={false}
            value={this.state.text}
            onChangeText={(text) => this.setState({text})}
            onKeyPress={this.onKeyPress}
            />
          <ListView/>
        </View>
      )
    }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    AddField: AddField
	}, dispatch);
};

function mapStateToProps(state) {
	return {
		form: state.form.formFields
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(FormConfig);
