var nano = require('nano')('http://localhost:5984'),
	database_interface = require('./database_interface.js')(nano),
	Projects_interface = database_interface('projects', 'project');

var projects = new Projects_interface();

/* 
	usually my database handles searching, but with couchdb
	it's complicated so here is a gross search function

*/
projects.search = function(keywords, callback) {
	keywords = keywords.toLowerCase().split(" ");
	projects.listByView('search_data', function(err, body) {
		if (!err) {
			var rows = body.rows.map(function(row) {
				var words = row.value,
					matches = 0;
				keywords.forEach(function(word) {
					if (words[word]) {
						matches += words[word];
					}
				});
				return {
					id: row.id,
					matches: matches
				};
			}).sort(function(a, b) {
				if (a.matches < b.matches) return -1;
				if (a.matches > b.matches) return 1;
				return 0;
			}).filter(function(result) {
				return result.matches > 0;
			});
			callback(undefined, rows);
		} else callback(err);
	});
};


///////////////////////
// all of the routes //
///////////////////////
/* 
	/projects & /projects/p/* (for paging)
*/
module.exports.home = function(req, res) {
	var page_number = req.params[0] || 0;
	projects.listByView_paging('byPost_timestamp', page_number, {
		limit: 10
	}, function(err, body) {
		if (!err) {
			var projects = body.rows.map(function(element) {
				return element.value;
			});
			res.render('projects-home', {
				projects: projects,
				pagination: body.wasLimited,
				page_number: page_number,
				page_total: body.total,
				title: "Recent"
			});

		} else next(err);
	});
};
/*
	 /projects/search/*
*/
module.exports.search = function(req, res, next) {
	var query = req.query.q;
	projects.search(query, function(err, resulting_ids) {
		if (!err) {
			resulting_ids = resulting_ids.map(function(result) {
				return result.id;
			});
			projects.getByIds(resulting_ids, function(err, resulting_docs) {
				if (!err) {
					res.render('projects-home', {
						projects: resulting_docs,
						title: "Search for " + query
					});
				} else next(err);
			});

		} else next(err);
	});
};

/*
	/projects/*
*/
module.exports.select = function(req, res, next) {
	var post_id = req.params[0];
	projects.getById(post_id, function(err, project) {
		if (!err) {
			res.render('projects-select', {
				title: project.name,
				project: project
			});
		} else next(err);
	});
};