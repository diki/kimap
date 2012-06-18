var EditorView = Backbone.View.extend({

    el: "#editorWrapper",

    initialize: function () {

        _.bindAll(this, "render", "appendWidget", "appendAfter");

        //with this variable i will obtain view of last click of add button
        this.selectedWidget = false;

        this.render();

    },
    render: function () {

        this.collection.each(this.appendWidget);
        return this;
    },

    appendWidget: function (widgetModel) {
        var v = new WidgetView({ model: widgetModel });

        $(this.el).append(v.el);
    },

    appendAfter: function () {
        
    }


});