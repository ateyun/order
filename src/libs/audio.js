var createPlayer = require('web-audio-player')

var audioPlay = require('../assets/audio/neworder.ogg')

var audio = createPlayer(audioPlay)

export default {
	play: ()=> {
		audio.play()
		audio.node.connect(audio.context.destination)
	},
	stop: ()=>{
		audio.stop()
		audio.node.connect(audio.context.destination)
	}
}

// audio.on('load', () => {
//   console.log('Audio loaded...')
  
//   // start playing audio file
//   audio.play()
  
//   // and connect your node somewhere, such as
//   // the AudioContext output so the user can hear it!
//   audio.node.connect(audio.context.destination)
// })

// audio.on('ended', () => {
//   console.log('Audio ended...')
// })