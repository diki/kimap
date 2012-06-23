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

        self.selectedWidget.model.toJSON();
        console.log(currentOrder, self.selectedWidget.model.toJSON());

        //update orders of left siblings
        this.collection.each(function (el, idx) {
            var o = el.get("order");
            console.log(o);
            if (o > currentOrder) {
                el.set("order", el.get("order") + 1);
            }
        });

        var newOrder = currentOrder + 1;
        newModel.set("order", newOrder);

        switch (newModel.get("type")) {
            case "title":
                newModel.set("type", "title");
                newModel.set("content", "Ürünlerimiz");

                var v = new WidgetView({ model: newModel });
                $(self.selectedWidget.el).after(v.el);
                break;

            case "text":
                newModel.set("type", "text");
                newModel.set("title", "Bu işte en iyi biziz");
                newModel.set("content", "Ne iş yapıyorsunuz. Sizin için önemi nedir. Ürün, servis ...");

                var v = new WidgetView({ model: newModel });
                $(self.selectedWidget.el).after(v.el);
                break;

            case "gallery":
                newModel.set("type", "gallery");
                newModel.set("title1", "title 1");
                newModel.set("content1", "content 1");

                newModel.set("title2", "title 2");
                newModel.set("content2", "content 2");

                newModel.set("title3", "title 3");
                newModel.set("content3", "content 3");

                var v = new WidgetView({ model: newModel });
                $(self.selectedWidget.el).after(v.el);
                break;

            case "bio":
                newModel.set("type", "bio");
                newModel.set("title", "Biz !!!");
                newModel.set("address", "Adres");
                newModel.set("phone", "phone");
                newModel.set("email", "email");
                newModel.set("website", "webSite");

                var v = new WidgetView({ model: newModel });
                $(self.selectedWidget.el).after(v.el);
                break;

            case "close":
                console.log("close");
                return;
                //$("#widgets-gallery-box").hide();
            default:
        }


    }


});