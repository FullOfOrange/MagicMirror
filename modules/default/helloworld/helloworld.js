/* global Module */

/* Magic Mirror
 * Module: HelloWorld
 *
 * By Michael Teeuw http://michaelteeuw.nl
 * MIT Licensed.
 */
var test = 1;
Module.register("helloworld",{

	// Default module config.
	defaults: {
		text: "Hello!"
	},
	start: function() {
		var self = this;
    	Log.log(self.name + ' is started!');
    	setInterval(function() {
    		self.updateDom();
		}, 5000);
	},
<<<<<<< HEAD
	// Override dom generator.
	getDom: function() {
    	this.hide();
		var wrapper = document.createElement("div");
		wrapper.innerHTML = this.config.text;
    	this.sendNotification('HOME',{type: "notification"});
		return wrapper;
	},
=======

	getTemplate: function () {
		return "helloworld.njk"
	},

	getTemplateData: function () {
		return this.config
	}
>>>>>>> de57daa3cd881ce1a14b88307bf61e8109879c81
});
