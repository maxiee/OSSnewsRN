'use strict'
import React, {
  StyleSheet,
  Text,
  View,
  ListView,
  TouchableHighlight
} from 'react-native';

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
  }
}

BaseNewsList.PropTypes = {url: React.PropTypes.string};

const styles = StyleSheet.create({
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

module.exports = BaseNewsList;
