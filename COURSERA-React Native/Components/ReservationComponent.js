import React, { Component } from 'react'
import { Text, View, ScrollView, StyleSheet, Picker, Switch, Button, Alert, Animated } from 'react-native'
import DatePicker from 'react-native-datepicker'
import * as Animatable from 'react-native-animatable'
import { Notifications } from "expo";
import * as Permissions from "expo-permissions";


class Reservation extends Component {

    constructor(props) {
        super(props)
        this.bounceValue = new Animated.Value(0);
        this.state = {
            guests: 1,
            smoking: false,
            date: '',
            showModal: false,
        }
    }

    handleReservation() {
        // this.toggleModal()
        Alert.alert(
            'Your Reservation OK?',
            'Number of Guests: ' + this.state.guests + '\n' +
            'Smoking? ' + (this.state.smoking ? 'Yes' : 'NO') + '\n' +
            'Date and Time: ' + this.state.date,
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                    onPress: () => this.resetForm()
                },
                {
                    text: 'OK',
                    style: 'default',
                    onPress: () => {
                        this.resetForm()
                        this.presentLocalNotification(this.state.date)
                    }
                }
            ],
            { cancelable: false }
        )
    }

    toggleModal() {
        this.setState({ showModal: !this.state.showModal })
    }

    resetForm() {
        this.setState({
            guests: 1,
            smoking: false,
            date: ''
        })
    }
    componentDidMount() {
        Animated.timing(this.bounceValue, {
          toValue: 1,
          duration: 1000,
        }).start();
        this.presentLocalNotification(this.state.date);
      }

    async obtainNotificationPermission() {
        let permission = await Permissions.getAsync(Permissions.USER_FACING_NOTIFICATIONS);
        if (permission.status !== 'granted') {
            permission = await Permissions.askAsync(Permissions.USER_FACING_NOTIFICATIONS);
            if (permission.status !== 'granted') {
                Alert.alert('Permission not granted to show notifications');
            }
        }
        return permission;
    }

    async presentLocalNotification(date) {
        await this.obtainNotificationPermission();
        Notifications.presentLocalNotificationAsync({
            title: 'Your Reservation',
            body: 'Reservation for '+ date + ' requested',
            ios: {
                sound: true
            },
            android: {
                sound: true,
                vibrate: true,
                color: '#512DA8'
            }
        });
    }

    render() {
        return (
            <Animatable.View animation="zoomIn" duration={1000} delay={1000}>
                <ScrollView>
                    <View style={styles.formRow}>
                        <Text style={styles.formLabel}>
                            Number of Guests
                    </Text>
                        <Picker
                            style={styles.formItem}
                            selectedValue={this.state.guests}
                            onValueChange={(itemValue, itemIndex) => this.setState({ guests: itemValue })}
                        >
                            <Picker.Item label='1' value='1' />
                            <Picker.Item label='2' value='2' />
                            <Picker.Item label='3' value='3' />
                            <Picker.Item label='4' value='4' />
                            <Picker.Item label='5' value='5' />
                            <Picker.Item label='6' value='6' />
                        </Picker>
                    </View>
                    <View style={styles.formRow}>
                        <Text style={styles.formLabel}>
                            Smoking/Non-Smoking?
                    </Text>
                        <Switch
                            style={styles.formItem}
                            value={this.state.smoking}
                            trackColor={{ true: "#512DA8" }}
                            onValueChange={(value) => this.setState({ smoking: value })}
                        >

                        </Switch>
                    </View>
                    <View style={styles.formRow}>
                        <Text style={styles.formLabel}>
                            Date and Time
                    </Text>
                        <DatePicker
                            style={{ flex: 2, marginRight: 20 }}
                            date={this.state.date}
                            format=''
                            mode='datetime'
                            placeholder='Select Date and Time'
                            minDate='2020-01-01'
                            confirmBtnText='Confirm'
                            cancelBtnText='Cancle'
                            customStyles={{
                                dateIcon: {
                                    position: 'absolute',
                                    left: 0,
                                    top: 4,
                                    marginLeft: 0
                                },
                                dateInput: {
                                    marginLeft: 36,
                                }
                            }}
                            onDateChange={(date) => this.setState({ date: date })}
                        />
                    </View>
                    <View style={styles.formRow}>
                        <Button
                            title='Reserve'
                            color='#512DA8'
                            onPress={() => this.handleReservation()}
                            accessibilityLabel='Learn more about this purple button'
                        />
                    </View>
                    {/* <Modal
                        animationType={'slide'}
                        transparent={false}
                        visible={this.state.showModal}
                        onDismiss={() => { this.resetForm() }}
                        onRequestClose={() => { this.toggleModal(); this.resetForm() }}
                    >
                        <View style={styles.Modal}>
                            <Text style={styles.modalTitle}>Your Reservation</Text>
                            <Text style={styles.modalText}>Number of Guests: {this.state.guests}</Text>
                            <Text style={styles.modalText}>Smoking? : {this.state.smoking ? "Yes" : "NO"}</Text>
                            <Text style={styles.modalText}>Date and Time: {this.state.date}</Text>
                            <Button
                                onPress={() => { this.toggleModal(); this.resetForm(); }}
                                color='#512DA8'
                                title='Close'
                            />

                        </View>
                    </Modal> */}
                </ScrollView>
            </Animatable.View>
        )
    }
}

const styles = StyleSheet.create({
    formRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 20,
    },
    formLabel: {
        fontSize: 18,
        flex: 2,

    },
    formItem: {
        flex: 1,
    },
    modal: {
        justifyContent: 'center',
        margin: 20
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        backgroundColor: '#512DA8',
        textAlign: 'center',
        color: 'white',
        marginBottom: 20,
        marginTop: 20
    },
    modalText: {
        fontSize: 18,
        margin: 10
    }
})

export default Reservation