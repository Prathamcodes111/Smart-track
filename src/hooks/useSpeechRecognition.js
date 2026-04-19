import { useCallback, useEffect, useRef, useState } from "react";

const getRecognitionCtor = () => {
  if (typeof window === "undefined") return null;
  return window.SpeechRecognition || window.webkitSpeechRecognition || null;
};

/**
 * Thin wrapper over Web Speech API recognition. Returns:
 *   { supported, listening, transcript, start, stop, reset, error }
 *
 * `transcript` is updated live with both interim + final results so
 * the UI feels responsive. If recognition isn't supported or denied,
 * the consumer can fall back to a sample script.
 */
export function useSpeechRecognition() {
  const [supported] = useState(() => Boolean(getRecognitionCtor()));
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [error, setError] = useState(null);
  const recogRef = useRef(null);
  const finalRef = useRef("");

  useEffect(() => {
    const Ctor = getRecognitionCtor();
    if (!Ctor) return;
    const r = new Ctor();
    r.continuous = true;
    r.interimResults = true;
    r.lang = "en-US";

    r.onresult = (event) => {
      let interim = "";
      let final = finalRef.current;
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const res = event.results[i];
        if (res.isFinal) final += res[0].transcript;
        else interim += res[0].transcript;
      }
      finalRef.current = final;
      setTranscript((final + interim).trim());
    };

    r.onerror = (e) => {
      setError(e.error || "speech_error");
      setListening(false);
    };

    r.onend = () => {
      setListening(false);
    };

    recogRef.current = r;
    return () => {
      try {
        r.stop();
      } catch {
        /* ignore */
      }
      recogRef.current = null;
    };
  }, []);

  const start = useCallback(() => {
    if (!recogRef.current) return;
    setError(null);
    finalRef.current = "";
    setTranscript("");
    try {
      recogRef.current.start();
      setListening(true);
    } catch (e) {
      setError(e?.message || "start_failed");
    }
  }, []);

  const stop = useCallback(() => {
    if (!recogRef.current) return;
    try {
      recogRef.current.stop();
    } catch {
      /* ignore */
    }
    setListening(false);
  }, []);

  const reset = useCallback(() => {
    finalRef.current = "";
    setTranscript("");
    setError(null);
  }, []);

  const setManualTranscript = useCallback((text) => {
    finalRef.current = text;
    setTranscript(text);
  }, []);

  return {
    supported,
    listening,
    transcript,
    error,
    start,
    stop,
    reset,
    setManualTranscript,
  };
}
