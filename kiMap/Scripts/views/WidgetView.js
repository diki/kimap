var WidgetView = Backbone.View.extend({

    tagName: "div",
    className: "row span_16 widget-el",

    events: {
        "mouseover": "widgetMouseEnter",
        "mouseleave": "widgetMouseLeave",
        "click .edit-view-slide-button": "alternateWidgetView",
        "click .edit-view-button": "openEditView",
        "click .edit-widget-cancel": "cancelEditView",
        "click .edit-widget-done": "applyEditView",
        //"click .img-container": "openFileInput",
        "change .img-upload-input": "submitImage",
        "click .edit-view-add-button": "openWidgetBox"
    },

    initialize: function (options) {
        _.bindAll(this, "render", "modelUpdate", "widgetMouseEnter", "widgetMouseLeave",
        "alternateWidgetView", "openEditView", "cancelEditView", "prepareTemplates", "openFileInput", "openWidgetBox");

        var self = this;

        this.templateSelector = "#" + this.model.get("type") + "-widget-template";
        this.altTemplateSelector = "#" + this.model.get("type") + "-widget-alt-template";
        this.extraTemplateSelector = "#" + this.model.get("type") + "-widget-extra-template";

        this.prepareTemplates();

        //holds index of current view of a widget 
        if (this.model.get("templateIndex") == undefined) {
            this.currentViewIndex = 0;
        } else {
            this.currentViewIndex = this.model.get("templateIndex");
        }


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


        //also construct uplaods if necessary
        this.createFileUploads();

        /************************************************************************/
        /* edit page models for edit view template                              */
        /************************************************************************/
        this.WidgetEditModels = {
            "header": [{
                modelAttr: "header",
                labelName: "Başlık",
                type: "text"
            }, {
                modelAttr: "subheader",
                labelName: "Alt Başlık",
                type: "text"
            }],

            "text": [{
                modelAttr: "title",
                labelName: "Başlık",
                type: "text"
            }, {
                modelAttr: "content",
                labelName: "İçerik",
                type: "paragraph"
            }],

            "title": [{
                modelAttr: "content",
                labelName: "Başlık",
                type: "text"
            }],

            "gallery": [{
                modelAttr: "title1",
                labelName: "Başlık",
                type: "text"
            }, {
                modelAttr: "content1",
                labelName: "İçerik",
                type: "paragraph"
            }, {
                modelAttr: "title2",
                labelName: "Başlık",
                type: "text"
            }, {
                modelAttr: "content2",
                labelName: "İçerik",
                type: "paragraph"
            }, {
                modelAttr: "title3",
                labelName: "Başlık",
                type: "text"
            }, {
                modelAttr: "content3",
                labelName: "İçerik",
                type: "paragraph"
            }],

            "bio": [{
                modelAttr: "title",
                labelName: "Başlık",
                type: "text"
            }, {
                modelAttr: "address",
                labelName: "İçerik",
                type: "text"
            }, {
                modelAttr: "phone",
                labelName: "Başlık",
                type: "text"
            }, {
                modelAttr: "email",
                labelName: "İçerik",
                type: "text"
            }, {
                modelAttr: "website",
                labelName: "Başlık",
                type: "text"
            }]
        }

    },

    prepareTemplates: function () {
        var self = this;
        this._template = _.template($(self.templateSelector).html());

        //store alternative views and follow current view with index of this array (default 0)
        //these enables navigating between alternative views of widget
        this.templates = [];
        this.templates.push($(self._template(self.model.attributes)));


        //if there is alternative
        if ($(self.altTemplateSelector).length > 0) {
            this._altTemplate = _.template($(self.altTemplateSelector).html());

            var content = self._altTemplate(self.model.attributes);

            this.templates.push($(content));
        }

        //if there is extra
        if ($(self.extraTemplateSelector).length > 0) {
            this._extraTemplate = _.template($(self.extraTemplateSelector).html());
            this.templates.push($(self._extraTemplate(self.model.attributes)));
        }
    },

    createFileUploads: function () {
        var self = this;
        _.each($(".img-upload-input", self.el), function (ell, idx) {
            SI.Files.stylize(ell);
        });
    },

    imageUploaded: function () {
        var self = this;
        console.log($(".img-container", self.el));
    },
    modelUpdate: function () {
        //reconstruct this.templates

        if (this.model.hasChanged("order") || this.model.hasChanged("templateIndex")) {
            return;
        }

        console.log("model update");
        this.prepareTemplates();
        this.render();
    },

    render: function () {
        var self = this;


        $(this.el).html(self.templates[self.currentViewIndex]);

        //info about widget view like color, font, theme will be handled herer
        //different types of widgets require different implemetation of color, font functions
        if (self.model.get("type") === "header") {
            $(self.el).addClass("header-widget");

            //TODO: create all color effects
            $(self.el).css("background-color", self.model.get("color"));
            $(self.el).css("color", "white");
        } else {
            $(".content", self.el).addClass("not-edited");
        }
    },

    widgetMouseEnter: function (e) {
        var self = this;
        e.stopPropagation();

        if ($(e.target).hasClass("widget-el") && !$(e.target).hasClass("editing")) {
            /*console.log("eeee")
            return;*/
            if ($(".edit-view-el", self.el).length == 0) {
                var hasAlternatives = this.templates.length > 1;
                $(this.el).append(_.template($("#edit-widget-template").html())({ slider: hasAlternatives }));
            }

        }



    },

    widgetMouseLeave: function (e) {
        //e.stopPropagation();
        $(".edit-view-el", this.el).remove();
    },

    alternateWidgetView: function (e) {
        var self = this;

        $(".content", self.el).remove();

        if ($(e.target).hasClass("edit-view-slide-button-right")) {
            if (self.currentViewIndex == self.templates.length - 1) {
                self.currentViewIndex = 0;
            } else {
                self.currentViewIndex++;
            }
        } else if ($(e.target).hasClass("edit-view-slide-button-left")) {
            if (self.currentViewIndex == 0) {
                self.currentViewIndex = self.templates.length - 1;
            } else {
                self.currentViewIndex--;
            }
        }

        $(self.templates[self.currentViewIndex]).prependTo($(self.el));
        //also update model templateIndex value
        self.model.set("templateIndex", self.currentViewIndex);
    },

    openEditView: function () {
        var self = this;
        var widgetEditModel = this.WidgetEditModels[self.model.get("type")];

        //add content to edit model to properly display
        _.each(widgetEditModel, function (el) {
            el.content = self.model.get(el.modelAttr);
        });

        console.log(self.model.toJSON());
        //order number of widget will be used to generate unique id for text editor fields
        //necessary for wysihtml5 to work properly
        _.each(widgetEditModel, function (el) {
            //console.log(el);
            el.order = self.model.get("order");
        })


        var widgetEditModelEl = _.template($("#widget-edit-template").html())({ fields: widgetEditModel });
        //add dom element editing class to disable hover action
        $(this.el).addClass("editing");

        $(".content", self.el).remove();
        $(".edit-view-el", self.el).remove();
        $(self.el).append(widgetEditModelEl);


        //apply wysihtml5 text editor plugin if already not applied

        $("textarea", widgetEditModelEl).each(function (idx, el) {
            var tid = $(el).attr("id");
            var sid = tid.split("-")[1];
            var textEditor = new wysihtml5.Editor
            (
                tid,
                {
                    toolbar: "toolbar-" + sid,
                    parserRules: wysihtml5ParserRules
                }
            );

        });




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
        var vals = {};
        $(".edit-widget-input", self.el).each(function (idx, ell) {
            var attr = $(ell).attr("model-attr");
            var val = $(ell).val();

            vals[attr] = val;

        });

        self.model.set(vals);
    },

    openFileInput: function (e) {
        e.stopPropagation();
        $(".img-upload-input", this.el).show().focus().trigger("click").hide();
        //$(".img-upload-input", this.el).hide();
    },

    submitImage: function (e) {
        e.stopPropagation();
        var self = this;
        var frm = $(e.target).parents("form");
        var imgWrapper = frm.siblings(".img-wrapper");
        var imgId = $(imgWrapper).attr("id");

        $(frm).ajaxSubmit(function (d) {

            var dd = false;
            if ($.browser.msie) {
                var die = $(d).html();
                dd = $.parseJSON(die);
            } else {
                dd = $.parseJSON(d);
            }

            self.imagesUploaded(imgId, "/Content/Images/Thumb/" + dd.src);

        });
    },

    imagesUploaded: function (imgId, imgSrc) {
        var self = this;
        var id = imgId.split("-")[1];
        self.model.set("imgSrc" + id, imgSrc);
    },

    openWidgetBox: function (e) {


        var offset = $(e.target).offset();

        editorView.selectedWidget = this;

        $(".widgets-gallery-box").css({ "top": offset.top, "left": offset.left - 103 }).show();

    }

});