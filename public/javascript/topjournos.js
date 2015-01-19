$(function() {

	var api = "https://twitter-list-watcher.herokuapp.com";
	var local_api = "http://localhost:8080";
	
	var displayTweets = function(type) {
		$.get(api + "/tweets/top/" + type, function(tweets) {
			tweets.forEach(function(tweet) {
				twttr.widgets.createTweet(
					tweet.id_str,
					$('#' + type).append("<div></div>")[0],
					{
						theme: 'dark',
					}
				)
			});
		});
	}
	
	twttr.ready(function (twttr) {
		displayTweets("retweets");
		displayTweets("favourites");
	});
});