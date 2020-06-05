// @flow strict
import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  Text,
} from 'react-native';
import {bindActionCreators} from 'redux';
import moment from 'moment';
import LinearGradient from 'react-native-linear-gradient';
import {connect} from 'react-redux';
import {Colors} from '../config/colors';
import {ScrollView} from 'react-native-gesture-handler';
import {
  getListFromAsyncStorage,
  removeItem,
  finishedItem,
} from '../redux/actions/state';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
class Home extends React.PureComponent<Props> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.getListFromAsyncStorage();
  }

  componentWillUnmount() {}

  render() {
    return (
      <LinearGradient
        colors={[Colors.gray, Colors.middlegray]}
        style={styles.container}>
        <View style={styles.insideContent}>
          <Text style={styles.title}>TODO LIST.</Text>
          <ScrollView>
            <View style={styles.list}>
              <Text style={styles.titlesmall}>{'Recent List'}</Text>
              {this.props.list.map((e, i) => {
                if (e.done) return;
                return (
                  <TouchableOpacity
                    key={i}
                    onPress={() =>
                      this.setState({
                        selected: this.state.selected === i ? -1 : i,
                      })
                    }
                    style={styles.listItem}>
                    <View style={styles.insideContainer}>
                      <View>
                        <Text style={styles.titlesmall}>{e.title}</Text>
                        <Text style={[styles.desc, {fontSize: 12}]}>
                          {moment(e.date).format('MMMM Do YYYY, h:mm:ss a')}
                        </Text>
                      </View>
                      <TouchableOpacity
                        onPress={() => this.props.finishedItem(e.id)}>
                        <Image
                          source={require('../assets/images/done.png')}
                          style={{width: 30, height: 30}}
                        />
                      </TouchableOpacity>
                    </View>
                    {this.state.selected === i && (
                      <View>
                        <Text style={[styles.desc, styles.blackText]}>
                          {'Description:'}
                        </Text>
                        <Text style={styles.desc}>{e.description}</Text>
                        <TouchableOpacity
                          onPress={() => this.props.removeItem(e.id)}>
                          <Text style={[styles.desc, styles.remove]}>
                            {'REMOVE'}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
            <View style={styles.list}>
              <Text style={styles.titlesmall}>{'Finished List'}</Text>
              {this.props.list.map((e, i) => {
                if (!e.done) return;
                return (
                  <TouchableOpacity
                    key={i}
                    onPress={() =>
                      this.setState({
                        selected: this.state.selected === i ? -1 : i,
                      })
                    }
                    style={styles.listItem}>
                    <Text style={styles.titlesmall}>{e.title}</Text>
                    <Text style={[styles.desc, {fontSize: 12}]}>
                      {moment(e.date).format('MMMM Do YYYY, h:mm:ss a')}
                    </Text>
                    {this.state.selected === i && (
                      <View>
                        <Text style={[styles.desc, styles.blackText]}>
                          {'Description:'}
                        </Text>
                        <Text style={styles.desc}>{e.description}</Text>
                        <TouchableOpacity
                          onPress={() => this.props.removeItem(e.id)}>
                          <Text style={[styles.desc, styles.remove]}>
                            {'REMOVE'}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[
                styles.button,
                {backgroundColor: Colors.blue, elevation: 3},
              ]}
              onPress={() => {
                this.props.navigation.navigate('AddItem');
              }}>
              <Text style={[styles.titlesmall, {color: 'black'}]}>
                ADD ITEM
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  insideContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  blackText: {color: 'black', marginTop: 20},
  list: {
    margin: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listItem: {
    width: '100%',
    margin: 5,
    borderRadius: 5,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    borderColor: 'black',
    backgroundColor: Colors.brown,
  },
  desc: {
    fontFamily: 'MontserratAlternates-Regular',
    fontStyle: 'normal',
    fontWeight: 'normal',
    color: 'gray',
    fontSize: 14,
  },
  button: {
    width: screenWidth / 2 - 30,
    height: 40,
    marginHorizontal: 10,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowRadius: 5,
    shadowColor: 'rgba(0, 0, 0, 0.15)',
    shadowOpacity: 1,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
  },
  title: {
    fontFamily: 'Montserrat-Black',
    fontStyle: 'normal',
    textAlign: 'center',
    marginTop: 40,
    fontWeight: '900',
    letterSpacing: 2,
    fontSize: 32,
    alignItems: 'center',
  },
  titlesmall: {
    fontFamily: 'Montserrat-Black',
    fontStyle: 'normal',
    fontWeight: '900',
    fontSize: 16,
  },
  remove: {
    color: Colors.red,
    marginTop: 10,
    fontSize: 8,
    fontFamily: 'Montserrat-Black',
  },
  buttonRow: {
    flexDirection: 'row',
    paddingBottom: 40,
    alignSelf: 'center',
  },
  insideContent: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
});

const stateToProps = (state) => ({
  list: state.state.list,
});

const dispatchToProps = (dispatch) =>
  bindActionCreators(
    {getListFromAsyncStorage, removeItem, finishedItem},
    dispatch,
  );

export default connect(stateToProps, dispatchToProps)(Home);
