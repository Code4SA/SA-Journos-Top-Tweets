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

	var num_format = function(num) { 
		return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}

	var api = "http://localhost:8080";
	// var api = "https://twitter-list-watcher.herokuapp.com";

	var tweeter_template = Handlebars.compile($("#twitter_profile_template").html());

	var displayTweets = function(type, ts) {
		if (!ts) {
			ts = "1d";
		}
		$('#' + type).html("<span class='label label-warning'>Fetching tweets...</span>");
		$.get(api + "/tweets?list_slug=sa-journos-who-tweet&limit=10&no_retweets=1&period=" + ts + "&sort=" + type)
		.done(function(tweets) {
			$('#' + type).empty();
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
		displayTweets("retweet_count");
		displayTweets("favorite_count");
		displayTweeters("followers");
		displayTweeters("favourite");
		displayTweeters("listed");
	// });

	$(".time-select-item").click(function() {
		$(".time-select>li").removeClass("active");
		$(this).parent().addClass("active");
		var ts = $(this).attr("href").replace("#", "");
		displayTweets("retweet_count", ts);
		displayTweets("favorite_count", ts);
	})

	//Bubbles
// 	var width = 600,
// 		height = 650,
// 		format = d3.format(",d"),
// 		color = d3.scale.category20c(),
// 		date_format = d3.time.format("%Y-%m-%d");

// 	var bubble = d3.layout.pack()
// 		.sort(null)
// 		.size([width, height])
// 		.padding(3)
// 		.value(function(d) { return d.size })

// 	var svg = d3.select("#bubbles").append("svg")
// 		.attr("width", "100%")
// 		.attr("height", height)
// 		.attr("class", "bubble");

// 	d3.json(api + "/tweets/top/retweets", function(err, data) {
// 		console.log(data);
// 		data.forEach(function(item) {
// 			item.size = item.retweet_count;
// 		});
// 		var node = svg.selectAll(".node")
// 			.data(bubble.nodes({ children: data })
// 			.filter(function(d) { return !d.children }))
// 			.enter()
// 			.append("g")
// 			.attr("class", "node")
// 			.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
// 			;
// 		node.append("circle")
// 			.attr("r", function(d) { return d.r; })
// 			.style("fill", function(d) { return color(d.retweet_count) })
// 			.attr("data-name", function(d) { return d.name })
			
			
// 		node.append("text")
// 			.attr("dy", function(d) {
// 				return "-" + (d.r - 25) + "px"
// 			})
// 			.style("text-anchor", "middle")
// 			.style("cursor", "pointer")
// 			.style("text-decoration", "underline")
// 			.style("font-size", "0.9em")
// 			.text(function(d) { if (d.r > 25) return "@" + d.user.screen_name } )
// 			.on("click", function(d) {
// 				location.href="https://twitter.com/" + d.user.screen_name;
// 			})
// 			;
// 		var r = 0;
// 		node.append("text")
// 			.attr("dy", function(d) {
// 				return "-" + (d.r - 45) + "px"
// 			})
// 			.style("text-anchor", "middle")
// 			.style("font-size", "0.8em")
// 			.text(function(d) { r = d.r; if (d.r > 25) return  num_format(d.text) } )
// 			.call(wrap, r * 2)
// 			;
// 	});

// function wrap(text, width) {
//   text.each(function() {
//     var text = d3.select(this),
//         words = text.text().split(/\s+/).reverse(),
//         word,
//         line = [],
//         lineNumber = 0,
//         lineHeight = 18, // px
//         y = text.attr("y"),
//         dy = parseFloat(text.attr("dy")),
//         tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "px");
//     while (word = words.pop()) {
//       line.push(word);
//       tspan.text(line.join(" "));
//       if (tspan.node().getComputedTextLength() > width) {
//         line.pop();
//         tspan.text(line.join(" "));
//         line = [word];
//         tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", (lineHeight) + "px").text(word);

//       }
//     }
//   });
// }

});