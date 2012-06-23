var WidgetsCollection = Backbone.Collection.extend({

    model: WidgetModel,
    url: "/build/page",

    parse: function (resp) {
        return resp.data;
    }

});