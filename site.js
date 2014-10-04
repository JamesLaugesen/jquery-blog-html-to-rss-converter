
		function getRss()
		{
			var input = $('#input').val();
			input = $('<div>' + input + '</div>');
			var output = $('<xml />');
			//output.append('<?xml version="1.0" encoding="UTF-8"?>');
			//output.append('<?xml-stylesheet type="text/css" href="/stylesheets/rss.css"?>');
			var channel = $('<rss version="2.0" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:trackback="http://madskills.com/public/xml/rss/module/trackback/"></rss>');
			output.append(channel);
			
			// Correct any URLs
			input.find('img').each(function(){
				var url = $(this).attr('src');
				if (url == null || url.length == 0) return;
				var pos = url.indexOf('http://');
				if (pos == -1) url.indexOf('https://');
				if (pos == -1) return;
				url = url.substring(pos);
				$(this).attr('src', url);
			});
			input.find('a').each(function(){
				var url = $(this).attr('href');
				if (url == null || url.length == 0) return;
				var pos = url.indexOf('http://');
				if (pos == -1) url.indexOf('https://');
				if (pos == -1) return;
				url = url.substring(pos);
				$(this).attr('href', url);
			});
			
			// Blogger
			input.find('.post').each(function(){
				var post = $(this);
				var item = $('<item></item>');
				item.append($('<title />').html(post.find('.post-title a').text()));
				item.append($('<description />').html(post.find('.post-body').html()));
				item.append($('<pubDate />').html(post.find('abbr.published').attr('title')));
				post.find('.post-labels a').each(function(){
					var label = $(this);
					item.append($('<category />').html(label.text()));
				});
				channel.append(item);
			});
			
			// Typo
			input.find('.atomentry').each(function(){
				var post = $(this);
				var item = $('<item></item>');
				item.append($('<title />').html(post.find('.title a').text()));
				item.append($('<description />').html(post.find('.content').html()));
				item.append($('<pubDate />').html(post.find('abbr.published').attr('title')));
				post.find('.categories a').each(function(){
					var label = $(this);
					item.append($('<category />').html(label.text()));
				});
				channel.append(item);
			});
			
			$('#output').val(output.html());
		}