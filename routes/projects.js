var sample = [{
	name: "Forge",
	description: "Lorem ipsum dolor sit amet, nec et propriae mediocrem, vero graece utamur cu cum, ad oporteat perpetua eum. Posse postea reprehendunt per an, sale imperdiet et usu.",
	image: "http://placekitten.com/5000/1000",
	location: "http://google.com",
	github: "http://google.com",
	content:'<div class="row"> <div class="col-lg-2"> <img src="http://placekitten.com/400/300" class="img-rounded"> </div> <p class="col-lg-8"><span class="indent"></span>Ea soleat luptatum electram eam, partiendo interesset quo no. Paulo lobortis ne his. In mea nominavi officiis philosophia. An qui vidit saepe, ei cum eius mutat eripuit, eos reque zril no. Sit et autem fabellas torquatos, albucius indoctum cu vis, solet doming delectus vix ad. </p> </div> <div class="row"> <p class="col-lg-8"><span class="indent"></span>Ea soleat luptatum electram eam, partiendo interesset quo no. Paulo lobortis ne his. In mea nominavi officiis philosophia. An qui vidit saepe, ei cum eius mutat eripuit, eos reque zril no. Sit et autem fabellas torquatos, albucius indoctum cu vis, solet doming delectus vix ad. Vel cu idque saepe, summo iriure conceptam te vim, et impetus denique has. Ei eos atomorum omittantur, purto dicunt omnesque te ius. Duo eu ipsum diceret tacimates. Justo commodo eos ei.<br> <span class="indent"></span> Ne nec integre torquatos, amet utinam eruditi mel ei. Per animal voluptua eu, sea periculis dissentiunt at, an albucius disputando reprehendunt mel. Duo quem fuisset ea, ei congue nostrud reformidans nam. Quo legimus epicurei corrumpit no, te primis delenit meliore nec, quod petentium an usu. Graecis sensibus ex cum, iriure instructior eu pro. Eu persecuti eloquentiam adversarium quo, te sumo nonumy mandamus quo. </p> <div class="col-lg-4"> <img src="http://placekitten.com/1000/750" class="img-rounded"> </div> </div>',
	date:"June 7, 1997"
}, {
	name: "Forge",
	description: "Lorem ipsum dolor sit amet, nec et propriae mediocrem, vero graece utamur cu cum, ad oporteat perpetua eum. Posse postea reprehendunt per an, sale imperdiet et usu.",
	image: "http://placekitten.com/5000/1000",
	location: "http://google.com"
}];

/*
	
 */
module.exports.home = function(req, res) {
	res.render('projects-home', {
		projects: sample,
		title: "Recent"
	});
}
/*
	
 */
module.exports.search = function(req, res) {
	var query = req.body.query;
	res.render('projects-home', {
		projects:sample,
		title: "Search for " + query
	});
}
/*
	
 */
module.exports.select = function(req, res) {
	res.render('projects-select',{
		title:"project name",
		project:sample[0]
	});
}