// @flow strict
import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
} from 'react-native';
import {bindActionCreators} from 'redux';
import moment from 'moment';
import LinearGradient from 'react-native-linear-gradient';
import {connect} from 'react-redux';
import {Colors} from '../config/colors';
import {addItem} from '../redux/actions/state';
import {TextInput} from 'react-native-gesture-handler';
import DateTimePicker from '@react-native-community/datetimepicker';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
class AddItem extends React.PureComponent<Props> {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      show: false,
      description: '',
      date: new Date(1598051730000),
      id: Date.now(),
      done: false,
    };
  }

  componentDidMount() {
    this.startRecordListener = this.props.navigation.addListener(
      'focus',
      () => {},
    );
  }

  componentWillUnmount() {}

  save = async () => {
    const {title, description, date, id, done} = this.state;
    const data = {
      title,
      description,
      date,
      id,
      done,
    };
    if (title === '' || description === '') {
      alert('Empty input');
    } else {
      await this.props.addItem(data);
      this.props.navigation.navigate('Home');
    }
  };
  onChange = (event, selectedDate) => {
    const currentDate = selectedDate || this.state.date;
    this.setState({date: currentDate, show: false});
  };

  render() {
    return (
      <LinearGradient
        colors={[Colors.gray, Colors.middlegray]}
        style={styles.container}>
        <View style={styles.insideContent}>
          <Text style={styles.title}>ADD NEW.</Text>
          <View style={styles.listItem}>
            <View style={styles.textinputContainer}>
              <Text style={styles.titlesmall}>Title:</Text>
              <TextInput
                style={styles.textinput}
                onChangeText={(text) => this.setState({title: text})}
                value={this.state.title}
              />
            </View>
            <View style={styles.textinputContainer}>
              <Text style={styles.titlesmall}>Description:</Text>
              <TextInput
                style={styles.textinput}
                onChangeText={(text) => this.setState({description: text})}
                value={this.state.description}
              />
            </View>
            <View style={styles.textinputContainer}>
              <Text style={styles.titlesmall}>{'Date: '}</Text>
              <TouchableOpacity
                onPress={() => this.setState({show: !this.state.show})}>
                <Text style={[styles.titlesmall, {fontSize: 12}]}>
                  {moment(this.state.date).format('MMMM Do YYYY, h:mm:ss a')}
                </Text>
              </TouchableOpacity>
              {this.state.show && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={this.state.date}
                  mode={'date'}
                  is24Hour={true}
                  display="default"
                  onChange={this.onChange}
                />
              )}
            </View>
          </View>
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[styles.button]}
              onPress={() => {
                this.props.navigation.navigate('Home');
              }}>
              <Text style={[styles.titlesmall, {color: 'black'}]}>CANCEL</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.button,
                {backgroundColor: Colors.blue, elevation: 3},
              ]}
              onPress={this.save}>
              <Text style={[styles.titlesmall, {color: 'black'}]}>SAVE</Text>
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
  blackText: {color: 'black', marginTop: 20},
  list: {
    margin: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textinput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 5,
    fontFamily: 'MontserratAlternates-Regular',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 14,
  },
  textinputContainer: {
    marginTop: 20,
  },
  listItem: {
    width: '95%',
    height: screenHeight * 0.6,
    alignSelf: 'center',
    marginTop: 40,
    borderRadius: 5,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    borderColor: 'black',
    backgroundColor: Colors.brown,
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
    zIndex: 400,
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
    alignItems: 'center',
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
    {
      addItem,
    },
    dispatch,
  );

export default connect(stateToProps, dispatchToProps)(AddItem);
