/* global Module */

/* Magic Mirror
 * Module: NokiaHealth
 *
 * By EcoMerc http://ecomerc.com
 * MIT Licensed.
 */

Module.register("MMM-iFrame",{
	// Default module config.
	defaults: {
			height:"300px",
			width:"100%",
			updateInterval: 0.5 * 60 * 1000,
			userid: ["0"],
	},
	iframe: null,

	start: function () {
		self = this;
		var count = 0;
		if (this.config.userid.length > 1 ) {
			  setInterval( function () { 
				 self.updateDom(1000);
				 console.log('update' + count++)
				 }, this.config.updateInterval);
		}
		this.config.userid.forEach(function (item) {
			self.sendSocketNotification("ADD_NOKIAHEALTHUSER", {
				userid: item
			});
		});
	},
	getRandomInt: function (min, max) {
		return Math.floor(Math.random() * (max - min)) + min;
	},
  
	resume: function() {
		console.log("Resuming");
		return this.getDom();
	},

	getDom: function() {

		this.iframe = document.createElement("IFRAME");
		this.iframe.style = "border:0"
		this.iframe.width = this.config.width;
		this.iframe.height = this.config.height;
		
		this.iframe.scrolling = "no";
		var url_index = 0;
		var repeat = true;
		
		user_index = this.getRandomInt(0,this.config.userid.length);
		futureURL = "http://apps.ecomerc.com/nokiahealth/code.php?userid=" + this.config.userid[user_index];
		console.log("URL_length:" + this.config.userid.length + " " + "URL_index:" + user_index + " " + "url:" + futureURL);
		this.iframe.src = futureURL;
					
		return this.iframe;

	},
	
	notificationReceived: function(notification, payload, sender) {
		self=this;
		
		if (sender) {
			Log.log(this.name + " received a module notification: " + notification + " from sender: " + sender.name);
		} else {
			Log.log(this.name + " received a system notification: " + notification);
		}
		if (notification == "DOM_OBJECTS_CREATED") {
			this.hide();
		}
	},
	
	socketNotificationReceived: function(notification, payload) {
		self=this;
		Log.log(this.name + " received a socket notification: " + notification + " - Payload: " + payload);
		if (notification == "NOKIAHEALTH_USERUPDATED") {
			this.show();
			this.iframe.src="http://apps.ecomerc.com/nokiahealth/code.php?userid=" + payload.userid;
			
			self.autohideTimer = setInterval(function() {
				self.hide(1000);
			}, 60000);
		}
	},

});
