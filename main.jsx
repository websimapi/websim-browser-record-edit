import { jsxDEV } from "react/jsx-dev-runtime";
import React, { useState, useRef, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { Player } from "@remotion/player";
import { Recorder } from "./components/Recorder.jsx";
import { ClipLibrary, TimelineTrack } from "./components/Timeline.jsx";
import { MainComposition } from "./composition.jsx";
import { useStore } from "./store.js";
import { Download, Upload, Video as VideoIcon, Layers } from "lucide-react";
const App = () => {
  const { timeline, addToTimeline } = useStore();
  const [durationInFrames, setDurationInFrames] = useState(1);
  const fps = 30;
  useEffect(() => {
    const totalFrames = timeline.reduce((acc, item) => {
      const rawSec = 30;
      const frames = Math.floor(rawSec * fps / item.playbackRate);
      return acc + frames;
    }, 0);
    setDurationInFrames(Math.max(1, totalFrames));
  }, [timeline]);
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const pseudoRec = {
      id: "upload_" + Date.now(),
      sessionId: "imported",
      sequenceIdx: 0,
      blob: file,
      timestamp: Date.now(),
      durationSec: 30
      // Approximate, ideally we'd read metadata
    };
    addToTimeline(pseudoRec);
  };
  const [isRendering, setIsRendering] = useState(false);
  const playerRef = useRef(null);
  const handleRender = async () => {
    if (timeline.length === 0) return alert("Nothing to render");
    alert("Rendering started! \n\n(In a full implementation, this would use WebCodecs to concatenate the blobs or record the <Player> canvas output to a single file.)");
  };
  return /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col h-full bg-slate-950 text-white font-sans", children: [
    /* @__PURE__ */ jsxDEV("header", { className: "h-16 border-b border-slate-800 flex items-center justify-between px-6 bg-slate-900 shadow-md z-10", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center", children: /* @__PURE__ */ jsxDEV(VideoIcon, { size: 20, className: "text-white" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 64,
          columnNumber: 25
        }) }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 63,
          columnNumber: 21
        }),
        /* @__PURE__ */ jsxDEV("h1", { className: "font-bold text-xl tracking-tight", children: "StreamWeaver" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 66,
          columnNumber: 21
        })
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 62,
        columnNumber: 17
      }),
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsxDEV("label", { className: "flex items-center gap-2 px-3 py-2 bg-slate-800 hover:bg-slate-700 rounded cursor-pointer text-sm transition", children: [
          /* @__PURE__ */ jsxDEV(Upload, { size: 16 }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 71,
            columnNumber: 25
          }),
          /* @__PURE__ */ jsxDEV("span", { children: "Add Video/Audio" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 72,
            columnNumber: 25
          }),
          /* @__PURE__ */ jsxDEV("input", { type: "file", accept: "video/*,audio/*", className: "hidden", onChange: handleFileUpload }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 73,
            columnNumber: 25
          })
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 70,
          columnNumber: 22
        }),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: handleRender,
            className: "flex items-center gap-2 px-3 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-sm font-bold transition",
            children: [
              /* @__PURE__ */ jsxDEV(Download, { size: 16 }, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 80,
                columnNumber: 25
              }),
              /* @__PURE__ */ jsxDEV("span", { children: "Render & Download" }, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 81,
                columnNumber: 25
              })
            ]
          },
          void 0,
          true,
          {
            fileName: "<stdin>",
            lineNumber: 76,
            columnNumber: 21
          }
        ),
        /* @__PURE__ */ jsxDEV("div", { className: "h-6 w-px bg-slate-700 mx-2" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 84,
          columnNumber: 21
        }),
        /* @__PURE__ */ jsxDEV(Recorder, {}, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 86,
          columnNumber: 21
        })
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 69,
        columnNumber: 17
      })
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 61,
      columnNumber: 13
    }),
    /* @__PURE__ */ jsxDEV("div", { className: "flex-1 flex overflow-hidden", children: [
      /* @__PURE__ */ jsxDEV(ClipLibrary, {}, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 93,
        columnNumber: 17
      }),
      /* @__PURE__ */ jsxDEV("div", { className: "flex-1 flex flex-col relative bg-black", children: /* @__PURE__ */ jsxDEV("div", { className: "flex-1 flex items-center justify-center p-8", children: /* @__PURE__ */ jsxDEV("div", { className: "aspect-video w-full max-w-4xl shadow-2xl bg-black border border-slate-800 rounded-lg overflow-hidden relative", children: /* @__PURE__ */ jsxDEV(
        Player,
        {
          ref: playerRef,
          component: MainComposition,
          inputProps: { timelineItems: timeline },
          durationInFrames,
          fps,
          compositionWidth: 1280,
          compositionHeight: 720,
          style: {
            width: "100%",
            height: "100%"
          },
          controls: true
        },
        void 0,
        false,
        {
          fileName: "<stdin>",
          lineNumber: 99,
          columnNumber: 30
        }
      ) }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 98,
        columnNumber: 25
      }) }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 97,
        columnNumber: 21
      }) }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 96,
        columnNumber: 17
      })
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 91,
      columnNumber: 13
    }),
    /* @__PURE__ */ jsxDEV(TimelineTrack, {}, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 119,
      columnNumber: 13
    })
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 59,
    columnNumber: 9
  });
};
const root = createRoot(document.getElementById("root"));
root.render(/* @__PURE__ */ jsxDEV(App, {}, void 0, false, {
  fileName: "<stdin>",
  lineNumber: 125,
  columnNumber: 13
}));
