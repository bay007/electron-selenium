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

var webdriver = require("selenium-webdriver");
var chrome = require("selenium-webdriver/chrome");
var path = require("chromedriver").path;

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
  data() {
    return {
      driver: null,
      allCookies: null
    };
  },
  methods: {
    click: async function() {
      console.log("click");
      //electron.shell.openItem(path.join(__dirname, "..", "main.js"));
      console.log(electron);
      console.log(typeof electron);
      //let childs = electron.remote.getCurrentWindow().getChildWindows();

      //console.log(path.join(__dirname, "..", "main.js"));

      var service = new chrome.ServiceBuilder(path).build();
      var options = new chrome.Options();
      options.addArguments(`user-data-dir=./userData`);
      chrome.setDefaultService(service);
      this.driver = new webdriver.Builder()
        .withCapabilities(webdriver.Capabilities.chrome())
        .setChromeOptions(options)
        .build();

      this.driver.get("http://web.whatsapp.com/send?phonenumber=");
    }
  }
};
</script>
