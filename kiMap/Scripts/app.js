$(function () {

    window.DefaultHeaderModel = new WidgetModel({
        type: "header",
        header: "Mesajınızı buraya yazın",
        subheader: "Alt başlık ekleyin"
    });

    //img&text
    window.DefaultTextModel = new WidgetModel({
        type: "text",
        title: "Bu işte en iyi biziz",
        content: "Ne iş yapıyorsunuz. Sizin için önemi nedir. Ürün, servis ...",
        //imgSrc1: undefined
    });

    //title
    window.DefaultTitleModel = new WidgetModel({
        type: "title",
        content: "Ürünlerimiz"
    });

    //gallery
    window.DefaultGalleryModel = new WidgetModel({
        type: "gallery",
        title1: "title 1",
        content1: "content 1",
        imgSrc1: undefined,
        title2: "title 2",
        content2: "content 2",
        imgSrc2: undefined,
        title3: "title 3",
        content3: "content 3",
        imgSrc3: undefined
    });

    //bio
    window.DefaultBioModel = new WidgetModel({
        type: "bio",
        title: "Biz !!!",
        address: "Adrs",
        phone: "phone",
        email: "email",
        website: "website",
        fb: undefined,
        tw: undefined,
        imgSrc1: undefined
    });

    window.widgetsCollection = new WidgetsCollection();


    window.editorView = new EditorView({
        collection: widgetsCollection
    });

    /************************************************************************/
    /* initializing widget box view, handle new widget addition             */
    /************************************************************************/
    window.widgetBoxView = new WidgetBoxView();
    widgetsCollection.fetch();
});