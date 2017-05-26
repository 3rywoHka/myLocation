//import React from 'react';
//import { Font } from 'expo';
//import { Components } from 'expo';
//import {
//    Image,
//    Linking,
//    Platform,
//    ScrollView,
//    StyleSheet,
//    Text,
//    TouchableOpacity,
//    View,
//} from 'react-native';
//
//import { MonoText } from '../components/StyledText';
//
//export default class LinksScreen extends React.Component {
//  static route = {
//    navigationBar: {
//      title: 'Category'
//    },
//  };
//  state={
//    fontLoaded: false,
//  }
//
//  async componentDidMount() {
//    await Font.loadAsync({
//      'roboto-black': require('../assets/fonts/Roboto-Black.ttf'),
//    });
//
//    this.setState({ fontLoaded: true });
//  }
//
//  render() {
//    return (
//    <Components.MapView
//        style={styles.map}
//        zoomEnabled={true}
//        initialRegion={{ latitude: 37.78825, longitude: -122.4324 }}
//        onPress={e => console.log(e.nativeEvent)}
//    >
//    </Components.MapView>
//    );
//  }
//}
//
//const styles = StyleSheet.create({
//    container: {
//        ...StyleSheet.absoluteFillObject,
//        flex: 1,
//        justifyContent: 'center',
//        alignItems: 'stretch',
//        backgroundColor: 'gray',
//    },
//    map: {
//        ...StyleSheet.absoluteFillObject
//    },
//});
//
////const styles = StyleSheet.create({
////  container: {
////    flex: 1,
////    backgroundColor: '#fff',
////  },
////  developmentModeText: {
////    marginBottom: 20,
////    color: 'rgba(0,0,0,0.4)',
////    fontSize: 15,
////    textAlign: 'center',
////  },
////  contentContainer: {
////    paddingTop: 80,
////  },
////  welcomeContainer: {
////    alignItems: 'center',
////    marginTop: 10,
////    marginBottom: 20,
////  },
////  welcomeImage: {
////    width: 140,
////    height: 38,
////    resizeMode: 'contain',
////    marginTop: 3,
////    marginLeft: -10,
////  },
////  getStartedContainer: {
////    alignItems: 'center',
////    marginHorizontal: 50,
////  },
////  homeScreenFilename: {
////    marginVertical: 7,
////  },
////  codeHighlightText: {
////    color: 'rgba(96,100,109, 0.8)',
////  },
////  codeHighlightContainer: {
////    backgroundColor: 'rgba(0,0,0,0.05)',
////    borderRadius: 3,
////    paddingHorizontal: 4,
////  },
////  getStartedText: {
////    fontSize: 17,
////    color: 'rgba(96,100,109, 1)',
////    lineHeight: 23,
////    textAlign: 'center',
////  },
////  tabBarInfoContainer: {
////    position: 'absolute',
////    bottom: 0,
////    left: 0,
////    right: 0,
////    ...Platform.select({
////      ios: {
////        shadowColor: 'black',
////        shadowOffset: { height: -3 },
////        shadowOpacity: 0.1,
////        shadowRadius: 3,
////      },
////      android: {
////        elevation: 20,
////      },
////    }),
////    alignItems: 'center',
////    backgroundColor: '#fbfbfb',
////    paddingVertical: 20,
////  },
////  tabBarInfoText: {
////    fontSize: 17,
////    color: 'rgba(96,100,109, 1)',
////    textAlign: 'center',
////  },
////  navigationFilename: {
////    marginTop: 5,
////  },
////  helpContainer: {
////    marginTop: 15,
////    alignItems: 'center',
////  },
////  helpLink: {
////    paddingVertical: 15,
////  },
////  helpLinkText: {
////    fontSize: 14,
////    color: '#2e78b7',
////  },
////});
import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    TouchableOpacity,
    Modal,
    KeyboardAvoidingView,
    TextInput,
    Button,
} from 'react-native';

import MapView from 'react-native-maps';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
let id = 0;
var ls = require('react-native-local-storage');

export default class LinksScreen extends React.Component {
    static route = {
        navigationBar: {
            visible: false,
        },
    };
    constructor(props) {
        super(props);

        this.state = {
            region: {
                latitude: LATITUDE,
                longitude: LONGITUDE,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
            },
            markers: [],
            modalVisible: false,
            category: null,
            name: null,
            coordinate: null,
            mark: [{category: null, name: null, coordinate: null, key: null }],
        };

        this.onMapPress = this.onMapPress.bind(this);
    }

    onMapPress(e) {
        this.setState({
            markers: [
                ...this.state.markers,
                {
                    coordinate: e.nativeEvent.coordinate,
                    key: `foo${id++}`,
                },
            ],
            coordinate: e.nativeEvent.coordinate,
            key: `foo${id++}`,
            modalVisible: true
        });
    }

    setModalVisible = (visible) => {
        this.setState({ modalVisible: visible, });
    };

    componentWillMount = ()  => {
        ls.get('mark').then((data) => { this.setState({ mark: data }); console.log(data) })
    };

    onAddCategory = () => {
        var dataBase = this.state.mark;
        dataBase.push({category: this.state.category, name: this.state.name, coordinate: this.state.coordinate, key: this.state.key});
        this.setState({mark: dataBase});
        ls.save('mark', this.state.mark);
    };

    focusNextField(nextField) {
        this.refs[nextField].focus();
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
                                placeholder="Enter category"
                                style={styles.textInput}
                                onChangeText={(category) => this.setState({category})}
                                onSubmitEditing={() => this.focusNextField('2')}
                            />
                            <TextInput
                                ref='2'
                                returnKeyType = {"done"}
                                placeholder="Enter name places"
                                style={styles.textInput}
                                onChangeText={(name) => this.setState({name})}
                                onSubmitEditing={this.onAddCategory.bind(this)}
                            />
                        </KeyboardAvoidingView>
                        <Button title="Close" onPress={() => {this.setModalVisible(!this.state.modalVisible)}}/>
                    </View>
                </View>
            </Modal>
        );
    };

    render() {
        return (
            <View style={styles.container}>
                {this.renderModal()}
                <MapView
                    provider={this.props.provider}
                    style={styles.map}
                    initialRegion={this.state.region}
                    onPress={this.onMapPress}
                >
                    {this.state.markers.map(marker => (
                        <MapView.Marker
                            title=''
                            key={marker.key}
                            coordinate={marker.coordinate}
                        />
                    ))}
                </MapView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    bubble: {
        backgroundColor: 'rgba(255,255,255,0.7)',
        paddingHorizontal: 18,
        paddingVertical: 12,
        borderRadius: 20,
    },
    latlng: {
        width: 200,
        alignItems: 'stretch',
    },
    button: {
        width: 80,
        paddingHorizontal: 12,
        alignItems: 'center',
        marginHorizontal: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        marginVertical: 20,
        backgroundColor: 'transparent',
    },
    textInput: {
        borderRadius: 5,
        borderWidth: 1,
        height: 44,
        paddingHorizontal: 10,
    },
});