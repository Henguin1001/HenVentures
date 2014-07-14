
function initialize (argument) {
	$(".project").each(function(){
		var project = this, 
			project_image = $(this).children('.project-image');
		project_image.load(function(){
			var wrapper = $('<div class="project-image_wrapper"></div>');
			wrapper.css('width', project_image.css('width'));
			$(project).append(wrapper);
		});
		
	});
}

$(document).ready(initialize);
$(window).resize(initialize);
