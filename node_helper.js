var NodeHelper = require("node_helper");



module.exports = NodeHelper.create({
	// Override start method.
	start: function() {
		console.log("Starting node helper for: " + this.name);

	},

	// Override socketNotificationReceived method.
	socketNotificationReceived: function(notification, payload) {
		var self = this;
		
		if (notification === "ADD_NOKIAHEALTHUSER") {
			//check url=http://apps.ecomerc.com/nokiahealth/user.php?userid=
			
			//DEMO: JUST SHOW AFTER 5 SECONDS
			self.refreshTimer = setInterval(function() {

				self.sendSocketNotification("NOKIAHEALTH_USERUPDATED", {
					userid: payload.userid,
				});

			}, 5000);
		}
	},
	
	

	/* createFetcher(url, reloadInterval)
	 * Creates a fetcher for a new url if it doesn't exist yet.
	 * Otherwise it reuses the existing one.
	 *
	 * attribute url string - URL of the news feed.
	 * attribute reloadInterval number - Reload interval in milliseconds.
	 */

	createFetcher: function(url, fetchInterval, maximumEntries, maximumNumberOfDays, auth) {
		var self = this;

	}
});
