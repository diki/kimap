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
        this.collection.on("add", this.appendAfter);
        this.render();

    },

    render: function () {

        //console.log("eveeeeeet");
        this.collection.each(this.appendWidget);
        return this;
    },

    appendWidget: function (widgetModel) {
        var v = new WidgetView({ model: widgetModel });

        $(this.el).append(v.el);
    },

    appendAfter: function (newModel) {

        var self = this;

        var currentOrder = self.selectedWidget.model.get("order");
        //update orders of left siblings
        this.collection.each(function (el, idx) {
            var o = el.get("order");
            if (o > currentOrder) {
                el.set("order", 0 + 1);
            }
        });

        var newOrder = currentOrder++;
        newModel.set("order", newOrder);



        switch (newModel.get("type")) {
            case "title":
                var v = new WidgetView({ model: DefaultTitleModel });
                $(self.selectedWidget.el).after(v.el);
                break;

            case "text":
                var v = new WidgetView({ model: DefaultTextModel });
                $(self.selectedWidget.el).after(v.el);
                break;

            case "gallery":
                var v = new WidgetView({ model: DefaultGalleryModel });
                $(self.selectedWidget.el).after(v.el);
                break;

            case "bio":
                var v = new WidgetView({ model: DefaultBioModel });
                $(self.selectedWidget.el).after(v.el);
                break;

            case "close":
                console.log("close");
                //$("#widgets-gallery-box").hide();
            default:
        }


    }


});