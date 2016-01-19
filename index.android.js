/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
  AppRegistry,
  Component,
  ListView,
  StyleSheet,
  TouchableHighlight,
  Text,
  View
} from 'react-native';

var API_BASE_URL = 'https://ossnews.net/';
var API_HOTTEST_URL = API_BASE_URL + 'hottest';

var OSSnewsRN = React.createClass({
  getInitialState: function() {
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
    };
  },

  componentDidMount: function() {
    this.fetchData();
  },

  fetchData: function() {
    fetch(API_HOTTEST_URL)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData),
          loaded: true,
        });
      })
      .done();
  },

  render: function() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }
    return (
      <View style={styles.maincontainer}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderNews}
        />
      </View>
    );
  },

  renderLoadingView: function() {
    return (
      <View style={styles.container}>
        <Text>Loading news...</Text>
      </View>
    );
  },

  renderNews: function(news) {
    return (
      <TouchableHighlight>
        <View style={styles.container}>
          <View style={styles.row}>
            <Text style={styles.title}>{news.title}</Text>
          </View>
          <View style={styles.separator} />
        </View>
      </TouchableHighlight>
    );
  },
});

const styles = StyleSheet.create({
  maincontainer: {
      flex: 1,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  row: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10,
      backgroundColor: '#F6F6F6',
  },
  title: {
    flex: 1,
    fontSize: 15,
    marginLeft: 5,
    marginRight:5,
  },
  separator: {
      height: 1,
      backgroundColor: '#CCCCCC',
  },
});

AppRegistry.registerComponent('OSSnewsRN', () => OSSnewsRN);
