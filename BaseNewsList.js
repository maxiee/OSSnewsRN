'use strict'
import React, {
  StyleSheet,
  Text,
  View,
  ListView,
  TouchableHighlight
} from 'react-native';

var moment = require('moment')

class BaseNewsList extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
    };
    this.fetchData()
  }

  fetchData() {
    fetch(this.props.url)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData),
          loaded: true,
        })
      })
      .done();
  }

  render () {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }
    return (
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderNews}
        />
    );
  }

  renderLoadingView() {
    return (
      <View style={styles.container}>
        <Text>Loading news...</Text>
      </View>
    );
  }

  renderNews(news) {
    var timeAgo = moment(news.created_at).fromNow();
    return (
      <TouchableHighlight>
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
});

module.exports = BaseNewsList;
