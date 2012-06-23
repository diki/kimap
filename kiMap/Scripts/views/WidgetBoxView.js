/* File Created: Haziran 18, 2012 */

var WidgetBoxView = Backbone.View.extend({

    el: "#widgets-gallery-box",

    events: {
        "click li": "addNewModelFromWidgetBox"
    },
    initialize: function () {

        _.bindAll(this, "render", "appendWidget", "addNewModelFromWidgetBox");

        //this.render();



    },
    render: function () {

        this.collection.each(this.appendWidget);
        return this;
    },

    appendWidget: function (widgetModel) {
        var v = new WidgetView({ model: widgetModel });

        $(this.el).append(v.el);
    },

    addNewModelFromWidgetBox: function (e) {
        var widgetType = $(e.target).attr("id");

        var el = $(e.target).parents("ul");

        if (!editorView.selectedWidget) {
            return;
        }

        var vidgetTemplate = $("#" + widgetType + "-widget-template");
        //TODO: move this method to a mamager object
        switch (widgetType) {
            case "title":
                var v = new WidgetView({ model: DefaultTitleModel });
                $(editorView.selectedWidget.el).after(v.el);
                break;
            case "text":
                var v = new WidgetView({ model: DefaultTextModel });
                $(editorView.selectedWidget.el).after(v.el);
                break;
            case "gallery":
                break;
            case "bio":
                break;
            case "close":
                console.log("close");
                el.hide();
            default:
        }
    }


});