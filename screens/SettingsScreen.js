import React from 'react';
import { ScrollView, StyleSheet, Text, Button, Modal, View, TouchableHighlight, KeyboardAvoidingView, SegmentedControlIOS, TextInput, FlatList, ListView, AsyncStorage, ListItem } from 'react-native';

var ls = require('react-native-local-storage');

export default class SettingsScreen extends React.Component {
  static route = {
    navigationBar: {
      title: 'Settings',
    },
  };

  state = {
    modalVisible: false,
    text: null,
    mark: [{category: null, name: null}],
  };


  componentWillMount = ()  => {
    //ls.get('mark').then((data) => { this.setState({ mark: data }) })
  };

  onAddCategory = () => {
    //var dataBase = this.state.mark;
    //console.log('lastDataBase', dataBase);
    //dataBase.push({category: this.state.text, name: this.state.text});
    //console.log('newDataBase', dataBase);
    //this.setState({mark: dataBase})
    //ls.save('mark', this.state.mark)
  };

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible, });
  };

  renderModal = () => {
    return (
        <Modal
            animationType={"slide"}
            transparent={false}
            visible={this.state.modalVisible}
            onRequestClose={() => {alert("Modal has been closed.")}}
        >
          <View style={{marginTop: 45}}>
            <View>
                <KeyboardAvoidingView>
                  <TextInput
                      returnKeyType = {"next"}
                      autoFocus = {true}
                      placeholder="Enter new category"
                      style={styles.textInput}
                      onChangeText={(text) => this.setState({text})}
                      onSubmitEditing={this.onAddCategory.bind(this)}
                  />
                </KeyboardAvoidingView>
              <Button title="Close" onPress={() => {this.setModalVisible(!this.state.modalVisible)}}/>
            </View>
          </View>
        </Modal>
    );
  };

  WholeMark = () => {
    return this.state.mark.map(function(marks, i){
      return(
          <View key={i}>
            <Text>{marks.category}</Text>
          </View>
      );
    });
  }

  render() {
    return (
      <View style={{marginTop: 22}} >
        {/*{this.renderModal()}
        <Button title="Add category" onPress={() => {this.setModalVisible(true)}}/>*/}
        <View>
          {this.WholeMark()}
        </View>
      </View>
    );
  }
}
var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  innerContainer: {
    borderRadius: 10,
    alignItems: 'center',
  },
  row: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    marginBottom: 20,
  },
  rowTitle: {
    flex: 1,
    fontWeight: 'bold',
  },
  button: {
    borderRadius: 5,
    flexGrow: 1,
    height: 44,
    alignSelf: 'stretch',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  buttonText: {
    fontSize: 18,
    margin: 5,
    textAlign: 'center',
  },
  modalButton: {
    marginTop: 10,
  },
  pickerItem: {
    fontSize: 16,
  },
  textInput: {
    borderRadius: 5,
    borderWidth: 1,
    height: 44,
    paddingHorizontal: 10,
  },
  segment: {
    marginBottom: 10,
  },
});
