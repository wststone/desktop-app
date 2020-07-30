'use strict'

import path from 'path'
import { app, protocol, BrowserView, BrowserWindow, screen, /* ipcRenderer, ipcMain, webContents*/ } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'
const isDevelopment = process.env.NODE_ENV !== 'production'

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win
let mainView
// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

function createWindow() {
  // Create the browser window.
  const { width, height } = screen.getPrimaryDisplay().workAreaSize
  win = new BrowserWindow({
    width: width,
    height: height,
    preload: path.join(__dirname, 'preload.js'),
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false,
      nodeIntegrationInSubFrames: false,
      allowRunningInsecureContent: true,
      devTools: true
    }
  })




  mainView = new BrowserView({
    webPreferences: {
      nodeIntegration: false,
      webSecurity: false,
      allowRunningInsecureContent: true
    }
  })
  win.setBrowserView(mainView)

  mainView.setBounds({ x: 50, y: 50, width: 500, height: 500 })




  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    mainView.webContents.loadURL("https:lexue100.com")
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  }

  win.on('closed', () => {
    win = null
  })
}


// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      //await installExtension(VUEJS_DEVTOOLS)
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }
  createWindow()
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}

/*
ipcMain.on('toHomePage', (event, arg)=>{
  win.webContents
})
ipcMain.on('toBackwardPage', (event, arg)=>{
  win.webContents
})
ipcMain.on('toForwardPage', (event, arg)=>{
  win.webContents
})
ipcMain.on('toCurrentPage', (event, arg)=>{
  win.webContents
})
ipcMain.on('toDownloadTab', (event, arg)=>{
  win.webContents
})
ipcMain.on('toUpgradeTab', (event, arg)=>{
  win.webContents
})
*/
