import { ipcRenderer } from 'electron'
window.ipcRenderer = ipcRenderer
console.log('Logging from preload.js')
