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
    getData: async function () {
        var self = this;
        var config = self.config;

        const statusPagePromise = axios.get(config.baseUrl + 'api/status-page/' + config.statusPage);
        const heartbeatPromise = axios.get(config.baseUrl + 'api/status-page/heartbeat/' + config.statusPage);

        try {
            const statusPage = await statusPagePromise;
            const heartbeat = await heartbeatPromise;

            var groups = statusPage.data.publicGroupList;
            var heartbeatsPerMonitor = heartbeat.data.heartbeatList;
            self.sendSocketNotification("uptimekuma-processData",
                groups.map(group => ({
                    name: group.name,
                    monitors: group.monitorList.map(monitor => ({
                        name: monitor.name,
                        status: heartbeatsPerMonitor[monitor.id].at(-1).status,
                    })),
                })));
        }
        catch (error) {
            console.log(error);
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
