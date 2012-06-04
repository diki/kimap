var EditorView = Backbone.View.extend({

	el: "#editorWrapper",
	
	initialize: function(){
		
		_.bindAll(this, "render", "appendWidget");
		
		this.render();
		
	},
	render: function(){
		
		this.collection.each(this.appendWidget);
		return this;
	},
	
	appendWidget: function(widgetModel){
		console.log(widgetModel.attributes);
		var v = new WidgetView({model:widgetModel});
		
		console.log(v.el);
		$(this.el).append(v.el);	
	}


});