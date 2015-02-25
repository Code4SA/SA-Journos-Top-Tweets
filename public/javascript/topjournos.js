$(function() {

	Handlebars.registerHelper('since', function(date) {
		date = Handlebars.Utils.escapeExpression(date);
		var result = moment(date).fromNow();

		return new Handlebars.SafeString(result);
	});

	Handlebars.registerHelper('num_format', function(num) {
		num = Handlebars.Utils.escapeExpression(num);
		result = num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		return new Handlebars.SafeString(result);
	});

	// var api = "http://localhost:8080";
	var api = "https://twitter-list-watcher.herokuapp.com";

	var tweeter_template = Handlebars.compile($("#twitter_profile_template").html());

	var displayTweets = function(type) {
		$.get(api + "/tweets/top/" + type)
		.done(function(tweets) {
			tweets.forEach(function(tweet) {
				twttr.widgets.createTweet(
					tweet.id_str,
					$('#' + type).append("<div></div>")[0],
					{
						theme: 'dark',
					}
				)
			});
		})
		.fail(function(err) {
			console.log("Err", err);
		})
		;
	}

	var displayTweeters = function(type) {
		$.get(api + "/tweeters/top/" + type)
		.done(function(tweets) {
			tweets.forEach(function(tweeter) {
				$('#tweeter_' + type).append(tweeter_template(tweeter));
			});
		})
		.fail(function(err) {
			console.log("Err", err);
		})
		;
	}
	
	// twttr.ready(function (twttr) {
		displayTweets("retweets");
		displayTweets("favourites");
		displayTweeters("followers");
		displayTweeters("favourite");
		displayTweeters("listed");
	// });
});