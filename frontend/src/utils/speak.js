export function speak(text, options = {}) {
  if (!window.speechSynthesis) return;

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);

  const {
    rate = 0.9,
    pitch = 1,
    lang = "en-US",
  } = options;

  const voices = window.speechSynthesis.getVoices();

  const voice =
    voices.find(v => v.lang?.includes("en")) || voices[0];

  if (voice) utterance.voice = voice;

  utterance.lang = lang;
  utterance.rate = rate;
  utterance.pitch = pitch;

  window.speechSynthesis.speak(utterance);
}