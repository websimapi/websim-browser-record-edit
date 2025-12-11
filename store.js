import { create } from 'zustand';
import { getAllRecordings, saveRecordingChunk } from './db.js';

export const useStore = create((set, get) => ({
    // Recording State
    isRecording: false,
    currentSessionId: null,
    recordingStartTime: null,
    
    // Data State
    recordings: [], // Raw clips from DB
    
    // Editor State
    timeline: [], // Clips added to the timeline
    playbackSpeed: 1,
    isPlaying: false,

    // Actions
    fetchRecordings: async () => {
        const recs = await getAllRecordings();
        // Sort by timestamp desc
        recs.sort((a, b) => b.timestamp - a.timestamp);
        set({ recordings: recs });
    },

    startRecordingState: () => {
        set({ 
            isRecording: true, 
            currentSessionId: Date.now().toString(),
            recordingStartTime: Date.now()
        });
    },

    stopRecordingState: () => {
        set({ isRecording: false, currentSessionId: null });
        get().fetchRecordings();
    },

    addToTimeline: (recording) => {
        set((state) => ({
            timeline: [
                ...state.timeline,
                {
                    ...recording,
                    uid: Math.random().toString(36).substr(2, 9),
                    playbackRate: 1,
                    trimStart: 0,
                    trimEnd: 0,
                    type: 'video'
                }
            ]
        }));
    },

    removeFromTimeline: (uid) => {
        set((state) => ({
            timeline: state.timeline.filter(t => t.uid !== uid)
        }));
    },

    updateTimelineItem: (uid, updates) => {
        set((state) => ({
            timeline: state.timeline.map(t => t.uid === uid ? { ...t, ...updates } : t)
        }));
    },
    
    setPlaybackSpeed: (speed) => set({ playbackSpeed: speed }),
    
    // Helper to create object URL (needs manual cleanup in real app, simplified here)
    getBlobUrl: (blob) => URL.createObjectURL(blob),
}));

