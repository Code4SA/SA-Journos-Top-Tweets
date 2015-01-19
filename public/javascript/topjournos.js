$(function() {
	var heroku_api = "https://twitter-list-watcher.herokuapp.com/tweets/top/retweets";
	var local_api = "http://topjournos.dev:8080/tweets/top/retweets";
	$.get(heroku_api, function(tweets) {
		twttr.ready(function (twttr) {
			tweets.forEach(function(tweet) {
				twttr.widgets.createTweet(
					tweet.id_str,
					$('#tweets').append("<div></div>")[0],
					{
						theme: 'dark',
					}
				).then(function(el) {
					console.log(el);
				});
			});
		});
	});
});