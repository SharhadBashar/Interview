import React from 'react';

import {
  View,
  Text,
  Image,
  StyleSheet,
  Alert
} from 'react-native';

import PopupModalComponent from '../components/PopupModalComponent';
import Video from 'react-native-video';

var styles = StyleSheet.create({
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  }
});

export default class VideoViewModal extends PopupModalComponent {
  
  //return to lesson screen when video is finished
  _onComplete() {
    this.props.onVideoEnd(true);
    this.close(); 
  }


  renderContent(extra) { 
    return (
      <Video
        ref={(ref) => { this.player = ref }}
        onBuffer={this.onBuffer}                // Callback when remote video is buffering
        onError={this.videoError}               // Callback when video cannot be loaded
        style={styles.backgroundVideo}
        source={{ uri: (`${extra.extra}`) }}
        resizeMode={"cover"}
        volume={1.0}
        rate={1.0}
        onEnd={this._onComplete.bind(this)} />
    );
  }
}