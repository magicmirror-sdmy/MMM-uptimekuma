/* Magic Mirror
 * Module: uptimekuma
 *
 * By Mike Bishop
 * Based on uptimerobot by Simon Crnko
 * MIT Licensed.
 */

Module.register("MMM-uptimekuma", {
  defaults: {
    updateInterval: 60000,
    useIcons: false,
    useColors: false,
    baseUrl: "http://localhost:3001/",
    statusPage: "default",
    headers: "auto",
    vertical: true,
  },

  start: function () {
    var self = this;

    //Flag for check if module is loaded
    this.loaded = false;

    // Schedule update timer.
    this.getData();
    setInterval(function () {
      self.getData();
    }, this.config.updateInterval);
  },

  getStyles: function () {
    return [this.file('MMM-uptimekuma.css')];
  },

  getData: function () {
    this.sendSocketNotification("uptimekuma-getData", this.config);
  },

  createWrapper: function (textToTranslate) {
    var wrapperDataNotification = document.createElement("div");
    wrapperDataNotification.innerHTML = this.translate(textToTranslate);
    return wrapperDataNotification;
  },

  // getScripts: function () {
  //   return [];
  // },

  // Load translations files
  getTranslations: function () {
    //FIXME: This can be load a one file javascript definition
    return {
      en: "translations/en.json",
      es: "translations/es.json",
      de: "translations/de.json",
      fr: "translations/fr.json"
    };
  },

  processData: function (data) {
    console.log(data);
    this.dataRequest = data;
    if (this.loaded === false) {
      this.updateDom(this.config.animationSpeed);
    }
    this.loaded = true;
    this.updateDom();
  },

  // socketNotificationReceived from helper
  socketNotificationReceived: function (notification, payload) {
    if (notification === "uptimekuma-processData") {
      this.processData(payload);
      this.updateDom();
    }
  },

  setStatus: function (statusObject, statusForTranslate, statusClass, status) {
    if (!this.config.useIcons) {
      statusObject.innerHTML = this.translate(statusForTranslate);
    } else {
      statusObject.className = statusClass;
    }

    statusObject.className += " " + status;

    if (this.config.useColors) {
      statusObject.className += " colored";
    }
  },

  getStatusTest: function (statusValue) {
    var status = document.createElement('td');
    switch (statusValue) {
      case 0:
        this.setStatus(status, "DOWN", "fa fa-arrow-circle-down", "offline");
        break;
      case 1:
        this.setStatus(status, "ONLINE", "fa fa-arrow-circle-up", "online");
        break;
      case 2:
        this.setStatus(status, "SEEMSDOWN", "fa fa-chevron-circle-down", "seems-down");
        break;
      case 3: // MAINTENANCE
        this.setStatus(status, "PAUSED", "fa fa-pause-circle-o", "paused")
        break;
      default:
        return "";
    }
    return status;
  },


  getDom: function () {
    var self = this;
    // create element wrapper for show into the module
    var wrapper = document.createElement("div");

    // If this.dataRequest is not empty
    if (self.dataRequest) {
      var outerTable = document.createElement("table");
      outerTable.className = "small";

      var outerTableLine = document.createElement("tr");
      for( let collection of self.dataRequest ) {
        var outerTableCell = document.createElement("td");
        outerTableLine.appendChild(outerTableCell);

        if( self.config.vertical ) {
          outerTable.appendChild(outerTableLine);
          outerTableLine = document.createElement("tr");
        }

        var innerTable = document.createElement("table");
        innerTable.classList.add(collection.name);
        innerTable.classList.add("inner");
        innerTable.classList.add("small");
        innerTable.classList.add("MMM-uptimekuma");

        // If we're displaying headers, create a header row for this set
        if (self.config.headers == true || 
              (self.config.headers == "auto" && self.dataRequest.length > 1)
        ) {
          var tableLine = document.createElement("tr");
          var headerCell = document.createElement("th");
          headerCell.colSpan = 2;
          headerCell.innerHTML = collection.name;
          headerCell.className = 'header';
          tableLine.appendChild(headerCell);
          innerTable.appendChild(tableLine);
        }

        for( let element of collection.monitors ) {
          // create new row for each item in array
          var tableLine = document.createElement("tr");

          // create a cell in a row for name of server
          var lineCell = document.createElement("td");

          lineCell.className = 'friendlyName';
          lineCell.innerHTML = element.name;
          tableLine.appendChild(lineCell);

          // add status
          tableLine.appendChild(self.getStatusTest(element.status));
          innerTable.appendChild(tableLine);
        }
        outerTableCell.appendChild(innerTable);
      }
      
      if( !self.config.vertical ) {
        outerTable.appendChild(outerTableLine);
      }

      wrapper.appendChild(outerTable);
    } else {
      // Loading
      wrapper.className = "dimmed light small";
      wrapper.appendChild(self.createWrapper("LOADING"));
    }

    return wrapper;
  }
});
