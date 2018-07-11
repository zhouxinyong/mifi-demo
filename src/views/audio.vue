<template>
  <div class="about">
    <h1>测试录音</h1>
    <div class="record-c">
      <transition name="fade" mode="out-in">
        <button class="btn" @click="startRecord" v-if="!recording" key="start">开始录音</button>
        <button class="btn mgl" @click="stopRecord" v-else key="stop" >结束录音</button>
      </transition>
    </div>
    <div class="load-wrapp" v-if="recording">
      <div class="load-3">
        <p>录音中...</p>
        <div class="line"></div>
        <div class="line"></div>
        <div class="line"></div>
      </div>
    </div>
    <div id="audio" class="audio">
    </div>
  </div>
</template>

<script>
import RecordRTC from 'recordrtc'
let audio
let mp3SizeContent
export default {
  data () {
    return {
      recording: false
    }
  },
  created () {

  },
  methods: {
    record () {
      const media = navigator.mediaDevices.getUserMedia({ audio: true })
      media.then(this.startUserMedia.bind(this)).catch(this.onUserMediaError.bind(this))
      return media
    },
    startUserMedia (stream) {
      this.RecordRTC = RecordRTC(stream, { type: 'audio' })
      return stream
    },
    onUserMediaError (e) {
      alert('未取得录音权限')
    },
    startRecord () {
      if (audio) {
        document.getElementById('audio').removeChild(audio)
        audio = null
      }
      if (mp3SizeContent) {
        document.getElementById('audio').removeChild(mp3SizeContent)
        mp3SizeContent = null
      }
      this.recording = true
      this.record().then(() => {
        this.RecordRTC.startRecording()
      })
    },
    stopRecord () {
      this.recording = false
      this.RecordRTC && this.RecordRTC.stopRecording((data) => {
        const blob = this.RecordRTC.getBlob()
        this.voiceData(blob)
      })
    },
    voiceData (data) {
      if (audio) {
        document.getElementById('audio').removeChild(audio)
      }
      if (mp3SizeContent) {
        document.getElementById('audio').removeChild(mp3SizeContent)
      }
      const blob = new Blob([data], { type: 'audio/mp3' })
      audio = document.createElement('audio')
      audio.src = URL.createObjectURL(blob)
      audio.controls = true
      mp3SizeContent = document.createElement('div')
      mp3SizeContent.innerHTML = `音频大小: ${(Number(blob.size) / 1000).toFixed(2)}kb`
      document.getElementById('audio').appendChild(audio)
      document.getElementById('audio').appendChild(mp3SizeContent)
    }
  }
}
</script>

<style scoped>
  .about {
    padding: 20px;
    position: relative;
  }
  .record-c {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    left: 0;
    right: 0;
  }
  .btn {
    border: 0;
    outline: 0;
    padding: 20px 20px;
    color: #fff;
    border-radius: 15px;
    background: #704f4f;
  }
  .mgl {
    /* margin-left: 20px; */
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s, transform .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
  .fade-enter {
    transform: translateX(30px);
  }
  .fade-leave-active {
    transform: translateX(-30px);
  }

  .audio {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    left: 0;
    right: 0;
    top: 200px;
    & >>> div {
      margin-top: 20px;
    }
  }
  .load-wrapp {
    width: 100px;
    height: 100px;
    margin: 100px auto;
    padding-top: 10px;
    text-align: center;
    /* background-color: #d8d8d8; */
}

  .load-wrapp p {padding: 0;}
  .load-wrapp:last-child {margin-right: 0;}

  .line {
    display: inline-block;
    width: 15px;
    height: 15px;
    margin: 5px;
    border-radius: 15px;
    background-color: #704f4f;
  }
  .load-3 .line:nth-last-child(1) {animation: loadingC .6s .1s linear infinite;}
  .load-3 .line:nth-last-child(2) {animation: loadingC .6s .2s linear infinite;}
  .load-3 .line:nth-last-child(3) {animation: loadingC .6s .3s linear infinite;}
  @keyframes loadingC {
    0 {transform: translate(0,0);}
    50% {transform: translate(0,15px);}
    100% {transform: translate(0,0);}
}
</style>
