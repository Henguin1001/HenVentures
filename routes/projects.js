/*
	
 */
module.exports.home = function(req,res){
	res.render('projects-home',{
		projects:[
			{
				name:"Forge",
				description:"Lorem ipsum dolor sit amet, nec et propriae mediocrem, vero graece utamur cu cum, ad oporteat perpetua eum. Posse postea reprehendunt per an, sale imperdiet et usu.Lorem ipsum dolor sit amet, nec et propriae mediocrem, vero graece utamur cu cum, ad oporteat perpetua eum. Posse postea reprehendunt per an, sale imperdiet et usu.",
				image:"http://placekitten.com/5000/1000",
				location:"http://google.com"
			},
			{
				name:"Forge",
				description:"Lorem ipsum dolor sit amet, nec et propriae mediocrem, vero graece utamur cu cum, ad oporteat perpetua eum. Posse postea reprehendunt per an, sale imperdiet et usu.",
				image:"http://placekitten.com/5000/1000",
				location:"http://google.com"
			}
		],
		title:"projects"
	});
}
/*
	
 */
module.exports.select = function(req,res){

}
/*
	
 */
module.exports.search = function(req,res){

}