var EditorView = Backbone.View.extend({

    el: "#editorWrapper",

    initialize: function () {

        _.bindAll(this, "render", "appendWidget", "appendAfter");

        //with this variable i will obtain view of last click of add button
        this.selectedWidget = false;

        //initial rendering of widgets data coming from server
        this.collection.on("reset", this.render);

        //on addition of new widget this view will insert new widget view after selectedwidget
        //also order numbers of widge models in colllection should be updated
        this.collection.on("add", this.addWidget);
        this.render();

    },

    render: function () {

        console.log("eveeeeeet");
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