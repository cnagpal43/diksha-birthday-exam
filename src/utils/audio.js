// Web Audio API & Speech Synthesis engine for NEET PG Diksha Edition

class SoundEffects {
  constructor() {
    this.ctx = null;
    this.muted = false;
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.muted = !this.muted;
    if (this.muted && typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    return this.muted;
  }

  playClick() {
    if (this.muted) return;
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(800, this.ctx.currentTime + 0.05);

      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.05);
    } catch (e) {
      console.warn("Audio play error", e);
    }
  }

  playCelebration() {
    if (this.muted) return;
    try {
      this.init();
      if (!this.ctx) return;

      const notes = [
        { freq: 523.25, time: 0.0, dur: 0.18 }, // C5
        { freq: 659.25, time: 0.16, dur: 0.18 }, // E5
        { freq: 783.99, time: 0.32, dur: 0.22 }, // G5
        { freq: 1046.50, time: 0.52, dur: 0.55 }, // C6
        { freq: 880.00, time: 1.10, dur: 0.22 }, // A5
        { freq: 1046.50, time: 1.35, dur: 0.8 }  // C6 grand hold
      ];

      notes.forEach(({ freq, time, dur }) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + time);

        gain.gain.setValueAtTime(0.18, this.ctx.currentTime + time);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + time + dur);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(this.ctx.currentTime + time);
        osc.stop(this.ctx.currentTime + time + dur);
      });
    } catch (e) {
      console.warn("Audio celebration error", e);
    }
  }

  // Voice speech for correct questions: "You are the best!"
  speakYouAreTheBest() {
    if (this.muted) return;
    this.playCheerfulTone();
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance("You are the best!");
        utterance.rate = 1.0;
        utterance.pitch = 1.2;
        utterance.volume = 1.0;
        
        // Select an expressive English voice if available
        const voices = window.speechSynthesis.getVoices();
        const preferredVoice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Samantha') || v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Karen')));
        if (preferredVoice) utterance.voice = preferredVoice;

        window.speechSynthesis.speak(utterance);
      } catch (e) {
        console.warn("Speech synthesis error", e);
      }
    }
  }

  // Voice speech for wrong questions: "I am with you"
  speakIAmWithYou() {
    if (this.muted) return;
    this.playComfortingTone();
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance("I am with you");
        utterance.rate = 0.9;
        utterance.pitch = 0.95;
        utterance.volume = 1.0;

        const voices = window.speechSynthesis.getVoices();
        const preferredVoice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Daniel') || v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Aaron')));
        if (preferredVoice) utterance.voice = preferredVoice;

        window.speechSynthesis.speak(utterance);
      } catch (e) {
        console.warn("Speech synthesis error", e);
      }
    }
  }

  playCheerfulTone() {
    try {
      this.init();
      if (!this.ctx) return;
      const notes = [587.33, 880]; // D5, A5
      notes.forEach((freq, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + (i * 0.1));
        gain.gain.setValueAtTime(0.12, this.ctx.currentTime + (i * 0.1));
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + (i * 0.1) + 0.25);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(this.ctx.currentTime + (i * 0.1));
        osc.stop(this.ctx.currentTime + (i * 0.1) + 0.25);
      });
    } catch (e) {}
  }

  playComfortingTone() {
    try {
      this.init();
      if (!this.ctx) return;
      const notes = [392.00, 440.00]; // G4, A4 warm chord
      notes.forEach((freq) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
        gain.gain.setValueAtTime(0.10, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.5);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(this.ctx.currentTime);
        osc.stop(this.ctx.currentTime + 0.5);
      });
    } catch (e) {}
  }
}

export const sounds = new SoundEffects();
