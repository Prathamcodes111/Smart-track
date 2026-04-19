import { useCallback, useEffect, useRef, useState } from "react";

const STORAGE_KEY = "smart-track:voice-enabled";

const isSupported = () =>
  typeof window !== "undefined" && "speechSynthesis" in window;

/**
 * Tiny wrapper around window.speechSynthesis. Used by Smart Track's
 * "Hands-free" mode so realtors driving between showings can hear
 * their briefing aloud.
 *
 * - `enabled` persists across reloads (localStorage)
 * - `speak(text)` cancels any in-flight utterance first
 * - We pick the first English voice that loads; otherwise default
 */
export function useSpeech() {
  const [supported] = useState(() => isSupported());
  const [enabled, setEnabled] = useState(() => {
    if (!isSupported()) return false;
    try {
      return window.localStorage.getItem(STORAGE_KEY) === "true";
    } catch {
      return false;
    }
  });
  const voiceRef = useRef(null);

  useEffect(() => {
    if (!supported) return;
    const pickVoice = () => {
      const voices = window.speechSynthesis.getVoices();
      if (!voices.length) return;
      voiceRef.current =
        voices.find(
          (v) => /en-US/i.test(v.lang) && /Google|Samantha|Daniel/i.test(v.name),
        ) ||
        voices.find((v) => /en/i.test(v.lang)) ||
        voices[0] ||
        null;
    };
    pickVoice();
    window.speechSynthesis.addEventListener?.("voiceschanged", pickVoice);
    return () => {
      window.speechSynthesis.removeEventListener?.("voiceschanged", pickVoice);
      window.speechSynthesis.cancel();
    };
  }, [supported]);

  const cancel = useCallback(() => {
    if (!isSupported()) return;
    window.speechSynthesis.cancel();
  }, []);

  const speak = useCallback((text) => {
    if (!isSupported() || !text) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    if (voiceRef.current) u.voice = voiceRef.current;
    u.rate = 1.05;
    u.pitch = 1.0;
    u.volume = 1.0;
    window.speechSynthesis.speak(u);
  }, []);

  const toggle = useCallback(() => {
    setEnabled((prev) => {
      const next = !prev;
      try {
        window.localStorage.setItem(STORAGE_KEY, String(next));
      } catch {
        /* ignore */
      }
      if (!next && isSupported()) window.speechSynthesis.cancel();
      return next;
    });
  }, []);

  return { supported, enabled, toggle, speak, cancel };
}
