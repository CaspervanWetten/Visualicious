// import { setLoading, setData } from "./index.js";
//
// function openIndexedDB(dbName, storeName) {
//     return new Promise((resolve, reject) => {
//         const request = indexedDB.open(dbName);
//         request.onerror = (event) => reject(new Error(`IndexedDB error: ${event.target.error}`));
//         request.onupgradeneeded = (event) => {
//             const db = event.target.result;
//             if (db.objectStoreNames.contains(storeName)) {
//                 db.deleteObjectStore(storeName); // Delete the object store if it already exists
//             }
//             db.createObjectStore(storeName, { autoIncrement: true });
//         };
//         request.onsuccess = (event) => resolve(event.target.result);
//     });
// }
//
// async function fetchAndStoreTSVChunks(url, dbName, storeName) {
//     setLoading(true);
//     let db; // Declare db here
//
//     try {
//         db = await openIndexedDB(dbName, storeName); // Open the database
//         const response = await fetch(url);
//
//         if (!response.body) {
//             throw new Error('ReadableStream not available');
//         }
//
//         const reader = response.body.getReader();
//         let line = ''; // Initialize an empty line
//         let decoder = new TextDecoder();
//
//         while (true) {
//             const { done, value } = await reader.read();
//
//             if (done) {
//                 // Store the last line if it's not empty
//                 if (line.length > 0) {
//                     await storeLineInDB(db, storeName, line);
//                 }
//                 break;
//             }
//
//             const chunkText = decoder.decode(value, { stream: true });
//             line += chunkText;
//
//             // Check for newline character to split lines
//             let newLineIndex = line.indexOf('\n');
//             while (newLineIndex !== -1) {
//                 const currentLine = line.substring(0, newLineIndex + 1);
//                 await storeLineInDB(db, storeName, currentLine);
//                 line = line.substring(newLineIndex + 1);
//                 newLineIndex = line.indexOf('\n');
//             }
//         }
//         console.log('All lines stored in IndexedDB.');
//     } catch (error) {
//         console.error('Error during fetch/store operation:', error.message);
//     } finally {
//         if (db) {
//             db.close(); // Close the database if it's open
//         }
//         setLoading(false);
//
//         // Retrieve the storage estimate and log the size
//         const storageEstimate = await navigator.storage.estimate();
//         console.log('IndexedDB storage size:', storageEstimate.usage);
//     }
// }
//
// async function storeLineInDB(db, storeName, line) {
//     return new Promise((resolve, reject) => {
//         const transaction = db.transaction(storeName, 'readwrite');
//         const store = transaction.objectStore(storeName);
//         const request = store.add(line);
//         request.onsuccess = resolve;
//         request.onerror = reject;
//     });
// }
//
// // Usage
// const URL = 'http://visualicious.bjornkoemans.nl/crimes_theft.tsv'; // Replace with the actual TSV file URL
// const DB_NAME = 'myDatabase';
// const STORE_NAME = 'tsvLines'; // Use a new store for storing individual lines
// fetchAndStoreTSVChunks(URL, DB_NAME, STORE_NAME);
