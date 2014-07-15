

function initialize (argument) {
	$(".project-header").each(function(){
		var project = this, 
			project_image = $(this).children('.project-header-image');
		project_image.load(function(){
			var wrapper = $('<div class="project-header-image_wrapper"></div>');
			wrapper.css('width', project_image.css('width'));
			$(project).append(wrapper);
		});
		
	});
}

$(document).ready(initialize);
$(window).resize(initialize);
