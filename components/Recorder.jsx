import { jsxDEV } from "react/jsx-dev-runtime";
import React, { useRef, useEffect } from "react";
import { useStore } from "../store.js";
import { saveRecordingChunk } from "../db.js";
import { Video, Square, MonitorPlay } from "lucide-react";
const Recorder = () => {
  const { isRecording, startRecordingState, stopRecordingState } = useStore();
  const mediaRecorderRef = useRef(null);
  const streamRef = useRef(null);
  const intervalRef = useRef(null);
  const chunkSequenceRef = useRef(0);
  const CHUNK_DURATION_MS = 3e4;
  const startCapture = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: { frameRate: 30 },
        audio: true
      });
      streamRef.current = stream;
      chunkSequenceRef.current = 0;
      stream.getVideoTracks()[0].onended = () => {
        stopCapture();
      };
      startNewSegment();
      startRecordingState();
    } catch (err) {
      console.error("Error starting capture:", err);
      alert("Could not start recording. " + err.message);
    }
  };
  const startNewSegment = () => {
    if (!streamRef.current || !streamRef.current.active) return;
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
    }
    const options = { mimeType: "video/webm;codecs=vp8,opus" };
    if (!MediaRecorder.isTypeSupported(options.mimeType)) {
      delete options.mimeType;
    }
    const recorder = new MediaRecorder(streamRef.current, options);
    const chunks = [];
    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) chunks.push(e.data);
    };
    const currentSeq = chunkSequenceRef.current;
    const sessionId = useStore.getState().currentSessionId || Date.now().toString();
    recorder.onstop = async () => {
      const blob = new Blob(chunks, { type: "video/webm" });
      if (blob.size > 0) {
        await saveRecordingChunk(blob, sessionId, currentSeq);
      }
    };
    recorder.start();
    mediaRecorderRef.current = recorder;
    chunkSequenceRef.current += 1;
    if (intervalRef.current) clearTimeout(intervalRef.current);
    intervalRef.current = setTimeout(() => {
      if (useStore.getState().isRecording) {
        startNewSegment();
      }
    }, CHUNK_DURATION_MS);
  };
  const stopCapture = () => {
    if (intervalRef.current) clearTimeout(intervalRef.current);
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    stopRecordingState();
  };
  return /* @__PURE__ */ jsxDEV(
    "button",
    {
      onClick: isRecording ? stopCapture : startCapture,
      className: `flex items-center gap-2 px-4 py-2 rounded-lg font-bold transition-all ${isRecording ? "bg-red-500 hover:bg-red-600 animate-pulse text-white" : "bg-indigo-600 hover:bg-indigo-500 text-white"}`,
      children: [
        isRecording ? /* @__PURE__ */ jsxDEV(Square, { size: 18, fill: "currentColor" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 110,
          columnNumber: 28
        }) : /* @__PURE__ */ jsxDEV(MonitorPlay, { size: 18 }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 110,
          columnNumber: 71
        }),
        isRecording ? "STOP RECORDING" : "RECORD SCREEN"
      ]
    },
    void 0,
    true,
    {
      fileName: "<stdin>",
      lineNumber: 102,
      columnNumber: 9
    }
  );
};
export {
  Recorder
};
