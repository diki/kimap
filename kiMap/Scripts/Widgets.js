var WidgetManager = (function(parent, $){

	parent.test = function(){
		console.log(parent, $);
	}
	
	parent.editor = $("#wrapper"); //jquery object of wrapper element of all widgets
	
	parent.initWidgetContents = {
		"header": '<div class="widget-header">'+
			'<h1><span>Your header message here</span></h1>' +
			'<h2><span>Add subtitle here</span></h2>' + 
		'</div>'
	}
	parent.addInitWidget = function(type){
		
		var self = this;
		switch(type){
			case "header":
				console.log("adding header widget");
				self.editor.append()
				break;
			case "gallery":
				console.log("adding gallery widget");
				break;
			case "title":
				console.log("adding title widget");
				break;
			case "text":
				console.log("adding text widget");
				break;
			case "link":
				console.log("adding link widget");
				break;
			case "picture":
				cconsole.log("adding picture widget");
				break;
			case "video":
				console.log("adding video widget");
				break;
			case "event":
				console.log("adding event widget");
				break;
			case "bio":
				console.log("adding bio widget");
				break;
			default:
				break; 
		}
		
	}
	
	
	return parent;



})(WidgetManager || {}, jQuery);