/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import { Platform, StyleSheet, Text, View, ScrollView } from 'react-native'

var wifi = require('react-native-android-wifi')

const timeout = 1000 //podac w milisekundach
const socketAddress = 'ws://192.168.43.100:8999' //wpisac adres lokalny komputera na ktorym jest serwer

export default class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      intervalID: undefined,
      wifiList: [],
      socket: undefined
    }
  }

  componentDidMount() {
    const intervalID = setInterval(() => {
      this.getWiFiList()
        .then(list => this.updateWiFiList(list))
        .catch(e => alert(e))
    }, timeout)
    this.setState({ intervalID: intervalID })

    let ws = new WebSocket(socketAddress)
    this.setState({ socket: ws })

      setInterval( () => {
        this.setState({
          curTime : new Date().toLocaleString()
        })
      },1000)
  }

  componentWillUnmount() {
    let { intervalID } = this.state
    ws.close()
    cancelInterval(intervalID)
  }

  getWiFiList() {
    return new Promise((success, fail) => {
      wifi.reScanAndLoadWifiList(
        (wifiStringList) => {
          let wifiArray = JSON.parse(wifiStringList)
          success(wifiArray)
        },() =>{
          error => fail(error)
        } 
      )
    })
  }

  updateWiFiList(list) {
    let { socket } = this.state
    this.setState({ wifiList: list })
    if (socket)
      socket.send(JSON.stringify(list))
    else {
      let ws = new WebSocket(socketAddress)
      this.setState({ socket: ws })
    }
  }

  render() {
    const { wifiList } = this.state
    const wifiListView = wifiList.map(a => {
      return (
        <View>
          <Text style={styles.lista}>
            {JSON.stringify(a.SSID + "   level: " + a.level )}
          </Text>
        </View>
      )
    })
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to FiFiSpeaker!</Text>
        <ScrollView>
          {wifiListView}
        </ScrollView>
        <View>
            <Text>Date: {this.state.curTime}</Text>
        </View>
      </View>
    );    
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 28,
    textAlign: 'center',
    margin: 15,
  },
  lista: {
    fontSize: 13,
    textAlign: 'center',
    margin: 10,
  }
});

