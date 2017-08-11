var NodeHelper = require("node_helper");
var request = require('request');



module.exports = NodeHelper.create({
	// Override start method.
	start: function() {
		console.log("Starting node helper for: " + this.name);

	},

	// Override socketNotificationReceived method.
	socketNotificationReceived: function(notification, payload) {
		var self = this;
		
		if (notification === "ADD_NOKIAHEALTHUSER") {
			fetchInterval=1000;
			url="http://apps.ecomerc.com/nokiahealth/user.php?userid=" + payload.userid;
			self.refreshTimer = setInterval(function() {
				fetcher(url, payload.userid, fetchInterval);
			}, fetchInterval);
		}
	},
	
	

	/* createFetcher(url, reloadInterval)
	 * Creates a fetcher for a new url if it doesn't exist yet.
	 * Otherwise it reuses the existing one.
	 *
	 * attribute url string - URL of the news feed.
	 * attribute reloadInterval number - Reload interval in milliseconds.
	 */

	fetcher: function(url, userid, fetchInterval) {
		var self = this;
		request(url, function (error, response, body) {
			console.log('error:', error); // Print the error if one occurred
			console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
			if (body=="1") {
				self.sendSocketNotification("NOKIAHEALTH_USERUPDATED", {
					userid: userid,
				});
			}
			self.refreshTimer = setInterval(function() {
				fetcher(url, userid, fetchInterval);
			}, fetchInterval);
		});	
	},
	
});
