import { jsxDEV } from "react/jsx-dev-runtime";
import React from "react";
import { useStore } from "../store.js";
import { Trash2, Plus, Clock, PlayCircle } from "lucide-react";
import { clsx } from "clsx";
const ClipLibrary = () => {
  const { recordings, addToTimeline, fetchRecordings } = useStore();
  React.useEffect(() => {
    fetchRecordings();
  }, []);
  const groupedRecordings = React.useMemo(() => {
    const groups = {};
    recordings.forEach((rec) => {
      if (!groups[rec.sessionId]) groups[rec.sessionId] = [];
      groups[rec.sessionId].push(rec);
    });
    return groups;
  }, [recordings]);
  return /* @__PURE__ */ jsxDEV("div", { className: "w-80 border-r border-slate-700 flex flex-col h-full bg-slate-900", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "p-4 border-b border-slate-700", children: [
      /* @__PURE__ */ jsxDEV("h2", { className: "font-bold text-lg text-slate-200", children: "Library" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 26,
        columnNumber: 17
      }),
      /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-slate-500", children: "Auto-saved 30s chunks" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 27,
        columnNumber: 17
      })
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 25,
      columnNumber: 13
    }),
    /* @__PURE__ */ jsxDEV("div", { className: "flex-1 overflow-y-auto p-2 space-y-4", children: [
      Object.keys(groupedRecordings).length === 0 && /* @__PURE__ */ jsxDEV("div", { className: "text-center text-slate-500 mt-10 p-4", children: [
        "No recordings found.",
        /* @__PURE__ */ jsxDEV("br", {}, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 32,
          columnNumber: 45
        }),
        'Click "Record Screen" to start.'
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 31,
        columnNumber: 21
      }),
      Object.entries(groupedRecordings).map(([sessionId, clips]) => /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-800 rounded-lg overflow-hidden", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "p-2 bg-slate-700 text-xs font-mono text-slate-300", children: [
          "Session: ",
          new Date(parseInt(sessionId) || 0).toLocaleString()
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 38,
          columnNumber: 25
        }),
        /* @__PURE__ */ jsxDEV("div", { className: "p-2 space-y-1", children: clips.map((clip, idx) => /* @__PURE__ */ jsxDEV("div", { className: "group flex items-center justify-between p-2 bg-slate-900/50 hover:bg-slate-700 rounded transition cursor-pointer border border-transparent hover:border-indigo-500/50", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "text-xs text-slate-300 font-medium", children: [
              "Part ",
              clip.sequenceIdx + 1
            ] }, void 0, true, {
              fileName: "<stdin>",
              lineNumber: 45,
              columnNumber: 41
            }),
            /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] text-slate-500", children: new Date(clip.timestamp).toLocaleTimeString() }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 46,
              columnNumber: 41
            })
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 44,
            columnNumber: 37
          }),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => addToTimeline(clip),
              className: "p-1.5 bg-indigo-600 rounded text-white opacity-0 group-hover:opacity-100 transition-opacity",
              title: "Add to Timeline",
              children: /* @__PURE__ */ jsxDEV(Plus, { size: 14 }, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 53,
                columnNumber: 41
              })
            },
            void 0,
            false,
            {
              fileName: "<stdin>",
              lineNumber: 48,
              columnNumber: 37
            }
          )
        ] }, clip.id, true, {
          fileName: "<stdin>",
          lineNumber: 43,
          columnNumber: 33
        })) }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 41,
          columnNumber: 25
        })
      ] }, sessionId, true, {
        fileName: "<stdin>",
        lineNumber: 37,
        columnNumber: 21
      }))
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 29,
      columnNumber: 13
    })
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 24,
    columnNumber: 9
  });
};
const TimelineTrack = () => {
  const { timeline, removeFromTimeline, updateTimelineItem } = useStore();
  return /* @__PURE__ */ jsxDEV("div", { className: "h-48 bg-slate-900 border-t border-slate-700 flex flex-col", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "h-8 bg-slate-800 border-b border-slate-700 flex items-center px-4 text-xs text-slate-400", children: "TIMELINE" }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 70,
      columnNumber: 14
    }),
    /* @__PURE__ */ jsxDEV("div", { className: "flex-1 overflow-x-auto p-4 flex gap-2 items-center", children: [
      timeline.length === 0 && /* @__PURE__ */ jsxDEV("div", { className: "w-full text-center text-slate-600 italic", children: "Drag items from library or click '+' to build your video" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 75,
        columnNumber: 21
      }),
      timeline.map((item, index) => /* @__PURE__ */ jsxDEV("div", { className: "relative flex-shrink-0 w-48 h-24 bg-indigo-900/40 border border-indigo-500/30 rounded-lg flex flex-col p-2 group", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between items-start mb-1", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "text-xs font-bold text-indigo-200", children: [
            "Clip ",
            index + 1
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 83,
            columnNumber: 29
          }),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => removeFromTimeline(item.uid),
              className: "text-red-400 hover:text-red-300",
              children: /* @__PURE__ */ jsxDEV(Trash2, { size: 14 }, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 88,
                columnNumber: 33
              })
            },
            void 0,
            false,
            {
              fileName: "<stdin>",
              lineNumber: 84,
              columnNumber: 29
            }
          )
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 82,
          columnNumber: 25
        }),
        /* @__PURE__ */ jsxDEV("div", { className: "text-[10px] text-indigo-300/60 truncate", children: item.id }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 91,
          columnNumber: 25
        }),
        /* @__PURE__ */ jsxDEV("div", { className: "mt-auto pt-2 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxDEV(Clock, { size: 12, className: "text-indigo-400" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 97,
            columnNumber: 30
          }),
          /* @__PURE__ */ jsxDEV(
            "select",
            {
              className: "bg-slate-800 text-[10px] text-white rounded border border-slate-600 outline-none",
              value: item.playbackRate,
              onChange: (e) => updateTimelineItem(item.uid, { playbackRate: parseFloat(e.target.value) }),
              children: [
                /* @__PURE__ */ jsxDEV("option", { value: "0.5", children: "0.5x" }, void 0, false, {
                  fileName: "<stdin>",
                  lineNumber: 103,
                  columnNumber: 34
                }),
                /* @__PURE__ */ jsxDEV("option", { value: "1", children: "1x" }, void 0, false, {
                  fileName: "<stdin>",
                  lineNumber: 104,
                  columnNumber: 34
                }),
                /* @__PURE__ */ jsxDEV("option", { value: "2", children: "2x" }, void 0, false, {
                  fileName: "<stdin>",
                  lineNumber: 105,
                  columnNumber: 34
                }),
                /* @__PURE__ */ jsxDEV("option", { value: "4", children: "4x" }, void 0, false, {
                  fileName: "<stdin>",
                  lineNumber: 106,
                  columnNumber: 34
                })
              ]
            },
            void 0,
            true,
            {
              fileName: "<stdin>",
              lineNumber: 98,
              columnNumber: 30
            }
          )
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 96,
          columnNumber: 25
        })
      ] }, item.uid, true, {
        fileName: "<stdin>",
        lineNumber: 81,
        columnNumber: 21
      }))
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 73,
      columnNumber: 13
    })
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 69,
    columnNumber: 9
  });
};
export {
  ClipLibrary,
  TimelineTrack
};
