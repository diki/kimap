var WidgetView = Backbone.View.extend({

    tagName: "div",
    className: "row span_16 widget-el",

    events: {
        "mouseover": "widgetMouseEnter",
        "mouseleave": "widgetMouseLeave",
        "click .edit-view-slide-button": "alternateWidgetView",
        "click .edit-view-button": "openEditView",
        "click .edit-widget-cancel": "cancelEditView",
        "click .edit-widget-done": "applyEditView"
    },

    initialize: function (options) {
        _.bindAll(this, "render", "modelUpdate","widgetMouseEnter", "widgetMouseLeave", "alternateWidgetView", "openEditView", "cancelEditView", "prepareTemplates");

        var self = this;

        this.templateSelector = "#" + this.model.get("type") + "-widget-template";
        this.altTemplateSelector = "#" + this.model.get("type") + "-widget-alt-template";
        this.extraTemplateSelector = "#" + this.model.get("type") + "-widget-extra-template";

        this.prepareTemplates();

        this.currentViewIndex = 0;


        //if header add noisy background
        if (this.model.get("type") == "header") {
            $(this.el).addClass("bg-noise1");
        }

        //dom element of this can be also assigned from options
        if (options.el !== undefined) {
            this.el = options.el;
        } else {
            this.render();
        }

        this.model.on("change", this.modelUpdate);

        this.WidgetEditModels = {
            "header": [{
                modelAttr: "header",
                "labelName": "Başlık",
                type: "text"
            }, {
                modelAttr: "subheader",
                labelName: "Alt Başlık",
                type: "text"
            }],

            "text": [{
                modelAttr: "title",
                "labelName": "Başlık",
                type: "text"
            }, {
                modelAttr: "content",
                labelName: "İçerik",
                type: "paragraph"
            }]
        }
    },

    prepareTemplates: function () {
        var self = this;
        this._template = _.template($(self.templateSelector).html());
        //store alternative views and follow current view with index of this array (default 0)
        //these enables navigating between alternative views of widget
        this.templates = [];
        this.templates.push(self._template(self.model.attributes));

        //if there is alternative
        if ($(self.altTemplateSelector).length > 0) {
            this._altTemplate = _.template($(self.altTemplateSelector).html());
            this.templates.push(self._altTemplate(self.model.attributes));
        }

        //if there is extra
        if ($(self.extraTemplateSelector).length > 0) {
            this._extraTemplate = _.template($(self.extraTemplateSelector).html());
            this.templates.push(self._extraTemplate(self.model.attributes));
        }
    },

    modelUpdate: function () {
        //reconstruct this.templates
        this.prepareTemplates();
        this.render();
    },

    render: function () {
        var self = this;
        $(this.el).html(self.templates[self.currentViewIndex]);
    },

    widgetMouseEnter: function (e) {
        e.stopPropagation();

        if ($(e.target).hasClass("widget-el") && !$(e.target).hasClass("editing")) {
            /*console.log("eeee")
            return;*/
            var hasAlternatives = this.templates.length > 1;
            $(this.el).append(_.template($("#edit-widget-template").html())({ slider: hasAlternatives }));
        }



    },

    widgetMouseLeave: function (e) {
        //e.stopPropagation();
        $(".edit-view", this.el).remove();
    },

    alternateWidgetView: function (e) {
        var self = this;

        $(".content", self.el).remove();

        if ($(e.target).hasClass("right-part")) {
            if (self.currentViewIndex == self.templates.length - 1) {
                self.currentViewIndex = 0;
            } else {
                self.currentViewIndex++;
            }
        } else if ($(e.target).hasClass("left-part")) {
            if (self.currentViewIndex == 0) {
                self.currentViewIndex = self.templates.length - 1;
            } else {
                self.currentViewIndex--;
            }
        }

        $(self.templates[self.currentViewIndex]).prependTo($(self.el));
    },

    openEditView: function () {
        var self = this;
        var widgetEditModel = this.WidgetEditModels[self.model.get("type")];

        //add content to edit model to properly display
        _.each(widgetEditModel, function (el) {
            el.content = self.model.get(el.modelAttr);
        });

        var widgetEditModelEl = _.template($("#widget-edit-template").html())({ fields: widgetEditModel });

        //add dom element editing class to disable hover action
        $(this.el).addClass("editing");

        $(".content", self.el).remove();
        $(".edit-view", self.el).remove();
        $(self.el).append(widgetEditModelEl);

    },

    cancelEditView: function () {
        var self = this;
        console.log("cancel");
        $(self.el).html("");
        $(self.templates[self.currentViewIndex]).prependTo($(self.el));
    },

    applyEditView: function () {
        var self = this;
        console.log("apply");
        $(".edit-widget-input", self.el).each(function (idx, ell) {
            var attr = $(ell).attr("model-attr");
            var val = $(ell).val();
            self.model.set(attr, val);
        });
    }

});