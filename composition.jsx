import { jsxDEV } from "react/jsx-dev-runtime";
import React, { useMemo } from "react";
import { Sequence, Video, Audio, AbsoluteFill, useVideoConfig } from "remotion";
const MainComposition = ({ timelineItems }) => {
  const { fps } = useVideoConfig();
  let currentFrame = 0;
  const sequences = timelineItems.map((item) => {
    const rawDurationSec = 30;
    const effectiveDurationFrames = Math.floor(rawDurationSec * fps / item.playbackRate);
    const seq = {
      ...item,
      from: currentFrame,
      durationInFrames: effectiveDurationFrames
    };
    currentFrame += effectiveDurationFrames;
    return seq;
  });
  if (timelineItems.length === 0) {
    return /* @__PURE__ */ jsxDEV(AbsoluteFill, { className: "bg-slate-900 flex items-center justify-center", children: /* @__PURE__ */ jsxDEV("h1", { className: "text-white text-4xl font-bold", children: "No clips in timeline" }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 29,
      columnNumber: 17
    }) }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 28,
      columnNumber: 13
    });
  }
  return /* @__PURE__ */ jsxDEV(AbsoluteFill, { style: { backgroundColor: "#000" }, children: sequences.map((item) => {
    const src = URL.createObjectURL(item.blob);
    return /* @__PURE__ */ jsxDEV(
      Sequence,
      {
        from: item.from,
        durationInFrames: item.durationInFrames,
        children: [
          item.type === "video" ? /* @__PURE__ */ jsxDEV(
            Video,
            {
              src,
              playbackRate: item.playbackRate,
              style: { width: "100%", height: "100%", objectFit: "contain" }
            },
            void 0,
            false,
            {
              fileName: "<stdin>",
              lineNumber: 47,
              columnNumber: 29
            }
          ) : /* @__PURE__ */ jsxDEV(Audio, { src }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 53,
            columnNumber: 30
          }),
          /* @__PURE__ */ jsxDEV("div", { className: "absolute top-4 left-4 bg-black/50 p-2 rounded text-white text-xs", children: new Date(item.timestamp).toLocaleTimeString() }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 57,
            columnNumber: 26
          })
        ]
      },
      item.uid,
      true,
      {
        fileName: "<stdin>",
        lineNumber: 40,
        columnNumber: 21
      }
    );
  }) }, void 0, false, {
    fileName: "<stdin>",
    lineNumber: 35,
    columnNumber: 9
  });
};
export {
  MainComposition
};
