/* Magic Mirror
 * Node Helper: uptimekuma
 *
 * By Mike Bishop
 * Based on uptimerobot by Simon Crnko
 * MIT Licensed.
 */

const NodeHelper = require("node_helper");
const axios = require('axios');

module.exports = NodeHelper.create({

    start: function () {
        this.config = null;
    },

    // Override socketNotificationReceived method.

    /* socketNotificationReceived(notification, payload)
     * This method is called when a socket notification arrives.
     *
     * argument notification string - The identifier of the noitication.
     * argument payload mixed - The payload of the notification.
     */
    socketNotificationReceived: async function (notification, payload) {
        if (notification === "uptimekuma-getData") {
            this.config = payload;
            await this.getData();
        }
    },

    /*
     * getData
     * function example return data and show it in the module wrapper
     * get a URL request
     *
     */
    getData: async function (config) {
        var self = this;

        var retry = true;

        const statusPagePromise = axios.get(config.baseUrl + 'api/status-page/' + config.statusPage);
        const heartbeatPromise = axios.get(config.baseUrl + 'api/status-page/heartbeat/' + config.statusPage);

        try {
            const statusPage = await statusPagePromise;
            const heartbeat = await heartbeatPromise;

            var monitors = statusPage.data.publicGroupList.monitorList;
            var heartbeatsPerMonitor = heartbeat.heartbeatList;
        }
        catch (error) {
            console.log(error);
            retry = false;
            monitors = [];
        }

        self.sendSocketNotification("uptimekuma-processData", JSON.parse(
            monitors.map(monitor => ({
                name: monitor.name,
                status: heartbeatsPerMonitor[monitor.id].at(-1).status,
        }))));

        if (retry) {
            self.scheduleUpdate((self.loaded) ? -1 : self.config.retryDelay);
        }
    },

    /* scheduleUpdate()
     * Schedule next update.
     *
     * argument delay number - Milliseconds before next update.
     *  If empty, this.config.updateInterval is used.
     */
    scheduleUpdate: function (delay) {
        var nextLoad = this.config.updateInterval;
        if (typeof delay !== "undefined" && delay >= 0) {
            nextLoad = delay;
        }
        nextLoad = nextLoad;
        var self = this;
        setTimeout(function () {
            self.getData();
        }, nextLoad);
    }

});
