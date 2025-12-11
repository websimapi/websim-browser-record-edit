import { openDB } from 'idb';

const DB_NAME = 'BrowserRecorderDB';
const DB_VERSION = 1;
const STORE_NAME = 'recordings';

export const initDB = async () => {
    return openDB(DB_NAME, DB_VERSION, {
        upgrade(db) {
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                const store = db.createObjectStore(STORE_NAME, { keyPath: 'id' });
                store.createIndex('timestamp', 'timestamp');
            }
        },
    });
};

export const saveRecordingChunk = async (blob, sessionId, sequenceIdx) => {
    const db = await initDB();
    const id = `${sessionId}_${sequenceIdx}`;
    const timestamp = Date.now();
    await db.put(STORE_NAME, {
        id,
        sessionId,
        sequenceIdx,
        blob,
        timestamp,
        durationSec: 30, // Approx
    });
    return id;
};

export const getAllRecordings = async () => {
    const db = await initDB();
    return db.getAllFromIndex(STORE_NAME, 'timestamp');
};

export const deleteRecording = async (id) => {
    const db = await initDB();
    await db.delete(STORE_NAME, id);
};

