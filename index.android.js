/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  TouchableHighlight,
  Text,
  View
} from 'react-native';

var ScrollableTabView = require('react-native-scrollable-tab-view');
var TabPageHottest = require('./BaseNewsList');
var TabPageRecent = require('./BaseNewsList');

var API_BASE_URL = 'https://ossnews.net/';
var API_HOTTEST_URL = API_BASE_URL + 'hottest.json';
var API_NEWEST_URL = API_BASE_URL + 'newest.json';

var OSSnewsRN = React.createClass({

  render: function() {
    return (
      <View style={styles.maincontainer}>
        <ScrollableTabView>
          <TabPageHottest tabLabel="Hottest" url={API_HOTTEST_URL} />
          <TabPageRecent tabLabel="Newest" url={API_NEWEST_URL} />
        </ScrollableTabView>
      </View>
    );
  },
});

const styles = StyleSheet.create({
  maincontainer: {
      flex: 1,
  },
});

AppRegistry.registerComponent('OSSnewsRN', () => OSSnewsRN);
