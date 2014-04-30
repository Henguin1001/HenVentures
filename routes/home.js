
var nano = require('nano')('http://localhost:5984');
var henventures = nano.db.use('henventures');

var blog_post_document_id = 'blog_posts',
	maxPosts = 4;

exports.index = function(req, res){
	henventures.get(blog_post_document_id, {
		revs_info: true
	}, function(err, body) {
		var posts = body.posts.filter(function(element, index) {
			return index < maxPosts;
		});
		res.render('home-index.twig', {
			blog_posts: posts,
			title: "Henry Troutman",
			footer:true
		});
		req.session.lastPage = req.url;
	});
};

exports.about = function(req, res){
	res.render('home-about.twig',{
		title:"about",
		footer:false
	})
};
