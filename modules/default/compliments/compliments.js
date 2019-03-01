/* global Log, Module, moment */

/* Magic Mirror
 * Module: Compliments
 *
 * By Michael Teeuw http://michaelteeuw.nl
 * MIT Licensed.
 */
<<<<<<< HEAD
var test = 1;
var text = null;
var isSleep = false;
Module.register("compliments",{
=======
Module.register("compliments", {

>>>>>>> de57daa3cd881ce1a14b88307bf61e8109879c81
	// Module config defaults.
	defaults: {
		compliments: {
			anytime: [
				"Hey there sexy!"
			],
			morning: [
				"좋은 아침입니다!",
				"좋은 하루 되세요!",
				"잠자리는 어떠셨나요?(음흉)"
			],
			afternoon: [
				"안녕하세요, 저는 숭Siri에요.",
				"하야..음.. 좀 졸리네요",
				"할 일은 다 하셨나요?",
				"점심은 드셨나요?"
			],
			evening: [
				"거울아, 거울아, 하야하야",
				"고생하셨어요!",
				"하음.. 졸리다..."
			]
		},
		updateInterval: 30000,
<<<<<<< HEAD
		fadeSpeed: 1000
=======
		remoteFile: null,
		fadeSpeed: 4000,
		morningStartTime: 3,
		morningEndTime: 12,
		afternoonStartTime: 12,
		afternoonEndTime: 17
>>>>>>> de57daa3cd881ce1a14b88307bf61e8109879c81
	},

	// Set currentweather from module
	currentWeatherType: "",

	// Define required scripts.
	getScripts: function() {
		return ["moment.js"];
	},

	// Define start sequence.
	start: function() {
		var self = this;
		Log.info("Starting module: " + self.name);

		self.lastComplimentIndex = -1;

<<<<<<< HEAD
=======
		var self = this;
		if (this.config.remoteFile != null) {
			this.complimentFile(function(response) {
				self.config.compliments = JSON.parse(response);
				self.updateDom();
			});
		}

>>>>>>> de57daa3cd881ce1a14b88307bf61e8109879c81
		// Schedule update timer.
		setInterval(function() {
			self.updateDom(self.config.fadeSpeed);
		}, self.config.updateInterval);
	},

	/* randomIndex(compliments)
	 * Generate a random index for a list of compliments.
	 *
	 * argument compliments Array<String> - Array with compliments.
	 *
	 * return Number - Random index.
	 */
	randomIndex: function(compliments) {
		if (compliments.length === 1) {
			return 0;
		}

		var generate = function() {
			return Math.floor(Math.random() * compliments.length);
		};

		var complimentIndex = generate();

		while (complimentIndex === this.lastComplimentIndex) {
			complimentIndex = generate();
		}

		this.lastComplimentIndex = complimentIndex;

		return complimentIndex;
	},

	/* complimentArray()
	 * Retrieve an array of compliments for the time of the day.
	 *
	 * return compliments Array<String> - Array with compliments for the time of the day.
	 */
	complimentArray: function() {
		var hour = moment().hour();
<<<<<<< HEAD
			if (hour >= 3 && hour < 12) {
				return this.config.compliments.morning;
			} else if (hour >= 12 && hour < 17) {
				return this.config.compliments.afternoon;
			} else {
				return this.config.compliments.evening;
			}
=======
		var compliments;

		if (hour >= this.config.morningStartTime && hour < this.config.morningEndTime && this.config.compliments.hasOwnProperty("morning")) {
			compliments = this.config.compliments.morning.slice(0);
		} else if (hour >= this.config.afternoonStartTime && hour < this.config.afternoonEndTime && this.config.compliments.hasOwnProperty("afternoon")) {
			compliments = this.config.compliments.afternoon.slice(0);
		} else if(this.config.compliments.hasOwnProperty("evening")) {
			compliments = this.config.compliments.evening.slice(0);
		}

		if (typeof compliments === "undefined") {
			compliments = new Array();
		}

		if (this.currentWeatherType in this.config.compliments) {
			compliments.push.apply(compliments, this.config.compliments[this.currentWeatherType]);
		}

		compliments.push.apply(compliments, this.config.compliments.anytime);

		return compliments;
	},

	/* complimentFile(callback)
	 * Retrieve a file from the local filesystem
	 */
	complimentFile: function(callback) {
		var xobj = new XMLHttpRequest(),
			isRemote = this.config.remoteFile.indexOf("http://") === 0 || this.config.remoteFile.indexOf("https://") === 0,
			path = isRemote ? this.config.remoteFile : this.file(this.config.remoteFile);
		xobj.overrideMimeType("application/json");
		xobj.open("GET", path, true);
		xobj.onreadystatechange = function() {
			if (xobj.readyState == 4 && xobj.status == "200") {
				callback(xobj.responseText);
			}
		};
		xobj.send(null);
>>>>>>> de57daa3cd881ce1a14b88307bf61e8109879c81
	},

	/* complimentArray()
	 * Retrieve a random compliment.
	 *
	 * return compliment string - A compliment.
	 */
	randomCompliment: function() {
		var compliments = this.complimentArray();
		var index = this.randomIndex(compliments);

		return compliments[index];
	},

	// Override dom generator.
	getDom: function() {
<<<<<<< HEAD
		if(text==null){
			var complimentText = this.randomCompliment();

			var compliment = document.createTextNode(complimentText);
			var wrapper = document.createElement("div");
			wrapper.className = "thin xlarge bright";
			wrapper.appendChild(compliment);
		}else{
			var wrapper = document.createElement("div");
			wrapper.className = "thin xlarge bright";
			wrapper.innerHTML = text;
		}
		return wrapper;
	},
	notificationReceived: function(notification, payload, sender) {
        var self = this;
        if(notification === 'HI'){
        	if(!isSleep){
	        	self.show();
	        	text = "안녕?";
	        	self.updateDom(self.config.fadeSpeed);
	        	text = null;
	        	isSleep = false;
	        }
        }else if(notification === 'BYE'){
        	isSleep = true;
        	self.show();
        	text = "응, 알았어!"
        	self.updateDom(self.config.fadeSpeed);
        	text = null;
        	self.hide(1000);
        }else if(notification === 'WAKE_UP'){
        	self.show();
        	isSleep = false;
        }else if(notification === 'HOME'){
        	if(!isSleep){
        		self.show();
        		isSleep = false;
        	}
    	}else {
        	if(!isSleep){
        		self.hide();
        		isSleep = false;
        	}
        }
    }
=======
		var complimentText = this.randomCompliment();

		var compliment = document.createTextNode(complimentText);
		var wrapper = document.createElement("div");
		wrapper.className = this.config.classes ? this.config.classes : "thin xlarge bright pre-line";
		wrapper.appendChild(compliment);

		return wrapper;
	},


	// From data currentweather set weather type
	setCurrentWeatherType: function(data) {
		var weatherIconTable = {
			"01d": "day_sunny",
			"02d": "day_cloudy",
			"03d": "cloudy",
			"04d": "cloudy_windy",
			"09d": "showers",
			"10d": "rain",
			"11d": "thunderstorm",
			"13d": "snow",
			"50d": "fog",
			"01n": "night_clear",
			"02n": "night_cloudy",
			"03n": "night_cloudy",
			"04n": "night_cloudy",
			"09n": "night_showers",
			"10n": "night_rain",
			"11n": "night_thunderstorm",
			"13n": "night_snow",
			"50n": "night_alt_cloudy_windy"
		};
		this.currentWeatherType = weatherIconTable[data.weather[0].icon];
	},


	// Override notification handler.
	notificationReceived: function(notification, payload, sender) {
		if (notification == "CURRENTWEATHER_DATA") {
			this.setCurrentWeatherType(payload.data);
		}
	},

>>>>>>> de57daa3cd881ce1a14b88307bf61e8109879c81
});
