import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { View, Text, TouchableWithoutFeedback, StyleSheet, Dimensions } from 'react-native'
import Video from 'react-native-video'
import ProgressBar from 'react-native-progress/Bar'
import Icon from 'react-native-vector-icons/FontAwesome'
import * as Progress from 'react-native-progress';

function secondsToTime(time) {
    return ~~(time / 60) + ":" + (time % 60 < 10 ? "0" : "") + time % 60;
}

const { width, height } = Dimensions.get('screen');

export default class VideoComponent extends React.Component {

	state = {
	    paused: false,
	    progress: 0,
	    duration: 0
    }

    handleMainButtonTouch = () => {
        if(this.state.progress > 1){
            this.player.seek(0);
        }

        this.setState( state => {
            return {
                paused: !state.paused
            }
        })
    }

    handleProgressPress = (e) => {
        const position = e.nativeEvent.locationX;
        const progress = (position / 250) * this.state.duration;
        this.player.seek(progress);
    }

    handleEnd = () => {
        this.setState({
            paused: true
        })
    }

    handleProgress = (progress) => {
        this.setState({
            progress: progress.currentTime / this.state.duration
        })
    }
    
    handleLoad = (meta) => {
        this.setState({
            duration: meta.duration
        })
    }

	render() {
		return(
			<View style={styles.container}>
				<View>
					<Video
						source={require('./assets/videoplayback.mp4')}
						paused={this.state.paused}
						style={{ width: width, height: height}}
						onLoad={this.handleLoad}
						onProgress={this.handleProgress}
						onEnd={this.handleEnd}
						muted={true}
						repeat={true}
						resizeMode={"cover"}
						volume={1.0}
						rate={1.0}
						ignoreSilentSwitch={"obey"}
						ref={ref => this.player = ref}
						/>

                    <View style={styles.playpause}>
                        <TouchableWithoutFeedback onPress={this.handleMainButtonTouch}>
                            <Icon name={!this.state.paused ? "pause" : "play"} size={30} color="#FFF" />
                        </TouchableWithoutFeedback>
                    </View>

                    <View style={styles.controls}>
                        <TouchableWithoutFeedback onPress={this.handleProgressPress}>
                            <View>
                                <ProgressBar
                                    progress={this.state.progress}
                                    color="#FFF"
                                    unfilledColor="rgba(255, 255, 255, 0.5)"
                                    borderColor="rgba(255, 255, 255, 0.1)"
                                    width={width}
                                    height={2}
                                />
                            </View>
                        </TouchableWithoutFeedback>
					</View>

				</View>
			</View>
		)
	}

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    controls: {
      backgroundColor: "rgba(0, 0, 0, 0.2)",
      height: 150,
      left: 0,
      top: height - 220,
      right: 0,
      position: "absolute",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-around",
      paddingHorizontal: 10,
      borderTopLeftRadius: 100,
      borderTopRightRadius: 100,
    },
    playpause: {
      backgroundColor: "rgba(0, 0, 0, 0.1)",
      height: 50,
      width: 50,
      left: (width / 2 ) - 25,
      top: (height  / 2) -  70,
      right: 0,
      position: "absolute",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-around",
      paddingHorizontal: 10,
    },
    mainButton: {
      marginRight: 15,
    },
    duration: {
      color: "#FFF",
      marginLeft: 15,
    }
  });