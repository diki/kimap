var WidgetView = Backbone.View.extend({

	tagName: "div",
	className: "row span_16",
	
	events: {
		"mouseenter": "widgetMouseEnter",
		"mouseleave": "widgetMouseLeave",
		"click .edit-view-slide-button": "alternateWidgetView"
	},
	
	initialize: function(options){
		_.bindAll(this,"render", "widgetMouseEnter", "widgetMouseLeave", "alternateWidgetView");
		
		var self=this;
		
		this.templateSelector = "#"+this.model.get("type")+"-widget-template";
		this.altTemplateSelector = "#"+this.model.get("type")+"-widget-alt-template";
		this.extraTemplateSelector = "#"+this.model.get("type")+"-widget-extra-template";
		
		this._template = _.template($(self.templateSelector).html());
		//store alternative views and follow current view with index of this array (default 0)
		this.templates = [];
		this.templates.push(self._template(self.model.attributes));
		
		if($(self.altTemplateSelector).length > 0){
			this._altTemplate = _.template($(self.altTemplateSelector).html());
			this.templates.push(self._altTemplate(self.model.attributes));
		}
		
		if($(self.extraTemplateSelector).length > 0){
			this._extraTemplate = _.template($(self.extraTemplateSelector).html());
			this.templates.push(self._extraTemplate(self.model.attributes));
		}
		

		
		this.currentViewIndex = 0;
		
		
		//if header add noisy background
		if(this.model.get("type")=="header"){
			$(this.el).addClass("bg-noise1");		
		}
		
		//dom element of this can be also assigned from options
		if(options.el!==undefined){
			this.el = options.el;
		} else {
			this.render();
		}
	},
	
	render: function(){
		var self = this;
		$(this.el).append(self.templates[self.currentViewIndex]);
	},
	
	widgetMouseEnter: function(e){
		var hasAlternatives = this.templates.length > 1;
		$(this.el).append(_.template($("#edit-widget-template").html())({slider: hasAlternatives}));
	},
	
	widgetMouseLeave: function(e){
		$(".edit-view",this.el).remove();
	},
	
	alternateWidgetView: function(e){
		var self = this;
		
		$(".content", self.el).remove();
		
		if($(e.target).hasClass("right-part")){
			if(self.currentViewIndex == self.templates.length-1){
				self.currentViewIndex = 0;
			} else {
				self.currentViewIndex++;
			}
		} else if($(e.target).hasClass("left-part")){
			if(self.currentViewIndex == 0){
				self.currentViewIndex = self.templates.length-1;
			} else {
				self.currentViewIndex--;
			}
		}
		
		$(self.templates[self.currentViewIndex]).prependTo($(self.el));
	}
	
});