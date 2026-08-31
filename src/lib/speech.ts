export const VOICE_LINES: Record<string, string> = {
  hero: "Welcome to Eterniventures. I am your cognitive system guide.",
  work: "Observe our dispatched resources. High-leverage production applications running live on edges.",
  manifesto: "The era of manual labor is sunsetting. We direct intention. This is our manifesto.",
  stack: "Our surgical tool stack. Precision instruments for accelerated cognitive engineering.",
  process: "The compilation pipeline. From pure conceptual prompting to global orbit in seconds.",
  contact: "All systems nominal. Are you ready to establish a secure connection with us?"
};

let voicesLoaded = false;
let preferredVoice: SpeechSynthesisVoice | null = null;

const loadVoices = () => {
  const voices = window.speechSynthesis.getVoices();
  if (voices.length > 0) {
    voicesLoaded = true;
    // Look for a sweet/futuristic female voice. 
    // Fallbacks to standard female voices depending on OS.
    preferredVoice = 
      voices.find(v => v.name.includes('Google UK English Female')) ||
      voices.find(v => v.name.includes('Samantha')) ||
      voices.find(v => v.name.includes('Victoria')) ||
      voices.find(v => v.name.includes('Karen')) ||
      voices.find(v => v.name.includes('Microsoft Zira')) ||
      voices.find(v => v.name.includes('Microsoft Hazel')) ||
      voices.find(v => v.lang.startsWith('en') && v.name.toLowerCase().includes('female')) ||
      voices[0];
  }
};

if (typeof window !== 'undefined' && window.speechSynthesis) {
  loadVoices();
  window.speechSynthesis.onvoiceschanged = loadVoices;
}

export const speak = (text: string) => {
  if (typeof window === 'undefined' || !window.speechSynthesis) return;

  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  
  if (preferredVoice) {
    utterance.voice = preferredVoice;
  }
  
  // futuristic / sweet adjustments
  utterance.pitch = 1.2; 
  utterance.rate = 0.95; 
  utterance.volume = 0.8;

  window.speechSynthesis.speak(utterance);
};
