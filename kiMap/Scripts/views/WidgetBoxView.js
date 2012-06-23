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

        widgetsCollection.add(new WidgetModel({
            type: widgetType
        }));

        $(this.el).hide();

    }


});