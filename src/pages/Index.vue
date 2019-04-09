<template>
  <q-page class="flex flex-center">
    <img alt="Quasar logo" src="~assets/quasar-logo-full.svg">
    <q-btn round color="secondary" @click="click">
      <q-icon name="card_giftcard"/>
    </q-btn>
  </q-page>
</template>

<style>
</style>

<script>
const electron = require("electron");
var path = require("path");
const axios = require("axios");
//import { getPic } from "../../puppeteer/main";
async function createWindow() {
  // session.defaultSession.clearStorageData({ storages: "serviceworkers" });
  // session.defaultSession.setUserAgent(
  //   "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36"
  // );
  // var url = "https://web.whatsapp.com/";
  // let top = new BrowserWindow({ width: 800, height: 600, show: false });
  // top.loadFile("index.html");
  // let child = new BrowserWindow({ parent: top });
  // child.loadURL(url);
  // top.once("ready-to-show", () => {
  //   top.show();
  // });
  // top.on("closed", () => {
  //   win = null;
  // });
}

export default {
  name: "PageIndex",
  methods: {
    click: function() {
      console.log("click");
      //electron.shell.openItem(path.join(__dirname, "..", "main.js"));
      console.log(electron);
      console.log(typeof electron);
      let childs = electron.remote.getCurrentWindow().getChildWindows();

      console.log(path.join(__dirname, "..", "main.js"));
      axios.get("http://127.0.0.1:5000/");
    }
  }
};
</script>
