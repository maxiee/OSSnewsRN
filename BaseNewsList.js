'use strict'
import React, {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableHighlight,
  IntentAndroid
} from 'react-native';

var moment = require('moment');
var GiftedListView = require('react-native-gifted-listview');

class BaseNewsList extends React.Component {

  constructor (props) {
    super(props);
    console.log(props);
    //binding functions
    this.fetchData = this.fetchData.bind(this);
    this.renderNews = this.renderNews.bind(this);
  }

  fetchData(page = 1, callback, options) {
    fetch(this.props.url + '?page=' + page)
      .then((response) => response.json())
      .then((responseData) => {
        callback(responseData)
      })
      .done();
  }

  render () {
    return (
        <GiftedListView
          rowView={this.renderNews}
          onFetch={this.fetchData}
          firstLoader={true}
          pagination={true}
          refreshable={true}
          customStyles={{
            refreshableView: {
              backgroundColor: '#eee',
            },
          }}
          PullToRefreshViewAndroidProps={{
            colors: ['#ff0000', '#00ff00', '#0000ff'],
            progressBackgroundColor: '#c8c7cc',
          }}
        />
    );
  }

  renderNews(news) {
    var timeAgo = moment(news.created_at).fromNow();

    function handleNewsClick () {
      IntentAndroid.openURL(news.short_id_url);
    }

    return (
      <TouchableHighlight
        onPress={handleNewsClick}>
        <View style={styles.container}>
          <View style={styles.row}>
            <View style={styles.upcontainer}>
              <Text>▲</Text>
              <Text>{news.upvotes}</Text>
            </View>
            <View style={styles.infocontainer}>
              <Text style={styles.title}>{news.title}</Text>
              <View style={styles.metacontainer}>
                <Text style={styles.name}>{news.submitter_user.username}</Text>
                <Text style={styles.createdat}>{timeAgo}</Text>
                <View style={styles.tags}><Text>{news.tags}</Text></View>
              </View>
            </View>
          </View>
          <View style={styles.separator} />
        </View>
      </TouchableHighlight>
    );
  }
}

BaseNewsList.PropTypes = {url: React.PropTypes.string};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  upcontainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginRight:5,
  },
  infocontainer: {
    flex: 1,
    flexDirection: 'column',
  },
  metacontainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  row: {
    paddingTop: 18,
    paddingBottom: 18,
    paddingLeft: 5,
    paddingRight: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F6F6F6',
  },
  title: {
    flex: 1,
    fontSize: 18,
    fontWeight: '800',
  },
  name: {
    marginRight: 5,
  },
  createdat: {
    marginRight: 5,
  },
  tags: {
    borderRadius: 5,
    borderStyle: 'solid',
    backgroundColor: '#DDF0ED',
    padding: 2
  },
  separator: {
    height: 1,
    backgroundColor: '#CCCCCC',
  },
  scrollview: {
    flex: 1,
  },
});

module.exports = BaseNewsList;
