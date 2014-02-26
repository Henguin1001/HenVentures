var nano = require('nano')('http://localhost:5984');
var henventures = nano.db.use('henventures');

var blog_post_document_id = 'blog_posts',
	maxPosts = 4;
exports.multiPost = function(req, res) {
	console.log(req.url);
	henventures.get(blog_post_document_id, {
		revs_info: true
	}, function(err, body) {
		var pageNumber = req.params[0],
			numberOfPages = Math.ceil(body.posts.length / maxPosts),
			fromHomePage = false;
		if (!pageNumber) {
			pageNumber = 0;
			fromHomePage = true;
		}
		var posts = body.posts.filter(function(element, index) {
			return (index >= pageNumber * maxPosts && index < (pageNumber + 1) * maxPosts);
		});
		res.render(blog_post_document_id, {
			previousPage: req.session.lastPage,
			posts: posts,
			pageNumber: pageNumber,
			numberOfPages: numberOfPages,
			fromHomePage: fromHomePage
		});
		req.session.lastPage = req.url;

	});
};
exports.category = function(req, res) {
	henventures.get(blog_post_document_id, {
		revs_info: true
	}, function(err, body) {
		var category = req.params[0],
			pageNumber = req.params[1],
			pageLength = Math.ceil(body.posts.length / maxPosts),
			fromHomePage = false;
		if (!pageNumber) {
			pageNumber = 0;
			fromHomePage = true;
		}

		var indexOfCategory = 0,
			postsOfCategory = body.posts.filter(function(post) {
				if (!category || post.category == category) {
					if (indexOfCategory >= pageNumber * maxPosts && indexOfCategory < (pageNumber + 1) * maxPosts) {
						indexOfCategory++;
						return true;
					}
				}
			});
		res.render(blog_post_document_id, {
			previousPage: req.session.lastPage,
			posts: postsOfCategory,
			pageNumber: pageNumber,
			pageLength: pageLength,
			fromHomePage: fromHomePage,
			category: category
		});
		req.session.lastPage = req.url;

	});
};
exports.singlePost = function(req, res) {
	var getData = req.params;
	henventures.get(blog_post_document_id, {
		revs_info: true
	}, function(err, body) {

		var post = body.posts.filter(function(element) {
			return element.id == getData;
		})[0];
		res.render('blog_post', {
			post: post,
			previousPage: req.session.lastPage
		});
		req.session.lastPage = req.url;
	});
};
