<template>
<v-app-bar app flat max-height="40">
  <v-btn text class="px-1" @click="homePage">
    <v-img src="../assets/首页/首页.png" aspect-ratio="1" style="max-height: 100%;
    max-width: 100%;"></v-img>
  </v-btn>
  <v-btn text class="px-1" @click="backward">
    <v-img src="../assets/首页/后退.png" aspect-ratio="1"></v-img>
  </v-btn>
  <v-btn text class="px-1" @click="forward">
    <v-img src="../assets/首页/前进灰.png" aspect-ratio="1"></v-img>
  </v-btn>
  <v-btn text class="px-1" @click="refresh">
    <v-img src="../assets/首页/刷新.png" aspect-ratio="1"></v-img>
  </v-btn>
  <v-divider class="mx-4" vertical></v-divider>
  <span class="font-weight-light">乐学一百在线学习课程 | 上乐学一百 一学就会 | 中小学网络学习首选品牌</span>
  <v-spacer></v-spacer>
  <v-divider class="mx-4" vertical></v-divider>
  <v-btn text class="px-1" @click="viewDownloads">
    <v-img src="../assets/首页/下载.png" aspect-ratio="1"></v-img>
  </v-btn>
  <v-btn text class="px-1" @click="checkUpgrade">
    <v-img src="../assets/首页/升级.png" aspect-ratio="1"></v-img>
  </v-btn>
</v-app-bar>
</template>

<script>
export default {
  name: 'NavigationBar',
  methods:{
    homePage(){
      window.ipcRenderer.send('toHomePage')
    },
    backward(){
      window.ipcRenderer.send('toBackwardPage')
    },
    forward(){
      window.ipcRenderer.send('toForwardPage')
    },
    refresh(){
      window.ipcRenderer.send('toCurrentPage')
    },
    viewDownloads(){
      window.ipcRenderer.send('toDownloadTab')
    },
    checkUpgrade(){
      window.ipcRenderer.send('toUpgradeTab')
    }
  }
}
</script>

<style scoped>
</style>
