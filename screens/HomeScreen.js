import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { Components } from 'expo';
var ls = require('react-native-local-storage');
import MapView from 'react-native-maps';

export default class HomeScreen extends React.Component {
  static route = {
    navigationBar: {
      visible: false,
    },
  };
  componentWillMount = ()  => {
    ls.get('mark').then((data) => { this.setState({ mark: data }) })
  };
  constructor(props) {
    super(props);

    this.state = {
      latitude: null,
      longitude: null,
      error: null,
      mark: null,
    };
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
        (position) => {
          this.setState({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            error: null,
          });
        },
        (error) => this.setState({ error: error.message }),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }

  render() {
    if(this.state.latitude !== null && this.state.longitude !== null && this.state.mark !== null){
      return (
          <MapView
              style={styles.map}
              zoomEnabled={true}
              initialRegion={{
                latitude: this.state.latitude,
                longitude: this.state.longitude,
              }}
              showsUserLocation={true}
              showsMyLocationButton={true}
              followsUserLocation={true}
              loadingEnabled={true}
              toolbarEnabled={true}
              zoomEnabled={true}
              rotateEnabled={true}
          >
            {this.state.mark.map(marks => (
                <MapView.Marker
                    title={marks.name}
                    key={marks.key}
                    coordinate={marks.coordinate}
                />
            ))}
          </MapView>
      );
    } else return (<View><Text>not location</Text></View>)
  }
}
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: 'gray',
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
});

