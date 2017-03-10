import React , { Component } from 'react';
import { Text, View, TouchableHighlight} from 'react-native';
import SortableListView from 'react-native-sortable-listview';
import { connect } from 'react-redux';
import ListViewItem from './list-view-item';


class ListView extends Component{
  constructor(props){
    super(props);
    this.getorders = this.getorders.bind(this);
  }
  getorders(){
    return Object.keys(this.props.formFields);
  }
  render(){
    let listView = (<View></View>);
    if (this.props.formFields.length) {
      listView = (
        <SortableListView
          style={{flex: 1}}
          data={this.props.formFields}
          order={this.getorders()}
          renderRow={(dataItem, section, index) => <ListViewItem data={dataItem} dataIndex={index} />}
        />
      );
    }
    return (
        <View style={{flex: 1, marginLeft: 10, marginRight: 10, marginTop: 20}}>
          {listView}
        </View>
    )
  }
}

function mapStateToProps(state) {
	return {
		formFields: state.form.formFields,
	};
};

export default connect(mapStateToProps, null)(ListView);
