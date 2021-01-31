const path = require("path");
const { app, BrowserWindow, ipcMain, Tray } = require("electron");
const url = require("url");
const Store = require("./store.js");
const { Resolver } = require("dns");
const resolver = new Resolver();
// const screen = require("screen");
const exec = require("child_process").exec;

// First instantiate the class
const store = new Store({
  // We'll call our data file 'user-preferences'
  configName: "user-preferences",
  defaults: {
    // filters: false
    filters: {
      securityFilter: false,
      familyFilter: false,
      privacyFilter: false
    }
  }
});

require("electron-reload")(__dirname);

// Don't show the app in the doc
app.dock.hide();

ipcMain.on("set-dns", (event, arg) => {
  exec(`networksetup -setdnsservers Wi-Fi ${arg.dns}`, async function(
    error,
    stdout,
    stderr
  ) {
    if (error) {
      // event.reply("successful-dns-setup", error);
      return;
    }
    await store.set("filters", arg.filters);
    let data = {
      dnsValues: await store.get("filterDnsValues"),
      filters: await store.get("filters")
    };
    event.reply("send-app-values", data);
  });
});

ipcMain.on("save-dnsInfo-locally", (event, arg) => {
  store.set("filterDnsValues", arg);
});

ipcMain.on("online-status-changed", (event, status) => {
  if (status === "online") {
    let booleanFilters = store.get("filters");
    if (
      booleanFilters.securityFilter ||
      booleanFilters.familyFilter ||
      booleanFilters.privacyFilter
    ) {
      let storedDnsValues = store.get("filterDnsValues");

      if (booleanFilters.securityFilter) {
        exec(
          `networksetup -setdnsservers Wi-Fi ${storedDnsValues
            .securityFilter[0] +
            " " +
            storedDnsValues.securityFilter[1]}`
        );
      }

      if (booleanFilters.familyFilter) {
        exec(
          `networksetup -setdnsservers Wi-Fi ${storedDnsValues.familyFilter[0] +
            " " +
            storedDnsValues.familyFilter[1]}`
        );
      }

      if (booleanFilters.privacyFilter) {
        exec(
          `networksetup -setdnsservers Wi-Fi ${storedDnsValues
            .privacyFilter[0] +
            " " +
            storedDnsValues.privacyFilter[1]}`
        );
      }
    }
  }
});

ipcMain.on("get-app-values", event => {
  console.log("servers are", resolver.getServers());

  //below interval is working fine

  let booleanFilters = store.get("filters");
  if (
    booleanFilters.securityFilter ||
    booleanFilters.familyFilter ||
    booleanFilters.privacyFilter
  ) {
    setInterval(
      function(str1, str2) {
        console.log(str1 + " " + str2);
        let storedDnsValues = store.get("filterDnsValues");

        if (booleanFilters.securityFilter) {
          exec(
            `networksetup -setdnsservers Wi-Fi ${storedDnsValues
              .securityFilter[0] +
              " " +
              storedDnsValues.securityFilter[1]}`
          );
        }

        if (booleanFilters.familyFilter) {
          exec(
            `networksetup -setdnsservers Wi-Fi ${storedDnsValues
              .familyFilter[0] +
              " " +
              storedDnsValues.familyFilter[1]}`
          );
        }

        if (booleanFilters.privacyFilter) {
          exec(
            `networksetup -setdnsservers Wi-Fi ${storedDnsValues
              .privacyFilter[0] +
              " " +
              storedDnsValues.privacyFilter[1]}`
          );
        }

        exec(`ping google.com`, async function(error, stdout, stderr) {
          console.log("***************", stdout);
          console.log("err is ", stderr);
          if (stderr.length !== 0) {
            exec(`networksetup -setdnsservers Wi-Fi 8.8.8.8`);
            return;
          }
        });
      },
      3600000, // one hour in millisecons
      "Hello.",
      "How are you?"
    );
  }

  let data = {
    dnsValues: store.get("filterDnsValues"),
    filters: store.get("filters")
  };
  event.reply("send-app-values", data);
});

ipcMain.on("quit-app", (event, arg) => {
  exec(`networksetup -setdnsservers Wi-Fi empty`, function(
    error,
    stdout,
    stderr
  ) {
    if (error) {
      // event.reply("successful-dns-setup", error);
      return;
    }
    store.set("filters", arg.filters);
    app.quit();
  });
});

// Call any os method of os node.js here
let win;
let tray;

const createwindow = () => {
  //create browser window
  win = new BrowserWindow({
    width: 320,
    height: 400,
    show: false,
    frame: false,
    fullscreenable: false,
    resizable: false,
    transparent: true,
    icon: path.join(__dirname, "/../spider-logo.icns"),
    webPreferences: {
      nodeIntegration: true
    }
  });

  // and load the index.html of the app.
  const startUrl =
    process.env.ELECTRON_START_URL ||
    url.format({
      pathname: path.join(__dirname, "/../build/index.html"),
      protocol: "file:",
      slashes: true
    });

  //Load index.html
  win.loadURL(startUrl);

  // Hide the window when it loses focus
  // win.on("blur", () => {
  //   if (!win.webContents.isDevToolsOpened()) {
  //     win.hide();
  //   }
  // });

  //open chrome devtools
  if (process.env.ELECTRON_START_URL === "http://localhost:300") {
    win.webContents.openDevTools();
  }

  win.on("closed", () => {
    win = null;
  });

  //Quit
  app.on("window-all-closed", () => {
    app.quit();
  });
};

const createTray = () => {
  tray = new Tray(path.join(__dirname, "../spider-tray-logo.png"));
  tray.on("click", function(event) {
    toggleWindow();
  });
};

const toggleWindow = () => {
  win.isVisible() ? win.hide() : showWindow();
};
const showWindow = () => {
  const position = getWindowPosition();
  win.setPosition(position.x, position.y, false);
  win.show();
};

const getWindowPosition = () => {
  const windowBounds = win.getBounds();
  const trayBounds = tray.getBounds();

  // Center window horizontally below the tray icon
  const x = Math.round(
    trayBounds.x + trayBounds.width / 2 - windowBounds.width / 2
  );
  // Position window 4 pixels vertically below the tray icon
  const y = Math.round(trayBounds.y + trayBounds.height + 4);
  return { x: x, y: y };
};

//Runs createwindow function
app.on("ready", () => {
  createTray();
  createwindow();
});
