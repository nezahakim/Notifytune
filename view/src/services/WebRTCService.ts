import { Socket } from 'socket.io-client';

class WebRTCService {
 
  private peerConnection: RTCPeerConnection | null = null;
  private localStream: MediaStream | null = null;
  private socket: Socket;
  private audioContext: AudioContext;
  private audioAnalyser: AnalyserNode;

  constructor(socket: Socket) {
    this.socket = socket;
    this.audioContext = new AudioContext();
    this.audioAnalyser = this.audioContext.createAnalyser();
  }

  async initializeAudio() {
    try {
      this.localStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.setupAudioAnalysis();
      return true;
    } catch (error) {
      console.error('Error accessing microphone:', error);
      return false;
    }
  }

  private setupAudioAnalysis() {
    if (!this.localStream) return;

    const source = this.audioContext.createMediaStreamSource(this.localStream);
    source.connect(this.audioAnalyser);
    
    const dataArray = new Uint8Array(this.audioAnalyser.frequencyBinCount);
    let speaking = false;
    
    const checkAudioLevel = () => {
      this.audioAnalyser.getByteFrequencyData(dataArray);
      const average = dataArray.reduce((a, b) => a + b) / dataArray.length;
      
      if (average > 30 && !speaking) {
        speaking = true;
        this.socket.emit('speaking-started');
      } else if (average <= 30 && speaking) {
        speaking = false;
        this.socket.emit('speaking-ended');
      }
      
      requestAnimationFrame(checkAudioLevel);
    };
    
    checkAudioLevel();
  }

  // ... existing WebRTC methods
}

export default WebRTCService;
