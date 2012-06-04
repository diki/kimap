$(function(){

	var m1 = new WidgetModel({
		type: "header",
		header: "Mesajınızı buraya yazın",
		subheader: "Alt başlık ekleyin"
	});
	
	//img&text
	var m2 = new WidgetModel({
		type: "text",
		title: "Bu işte en iyi biziz",
		content: "Ne iş yapıyorsunuz. Sizin için önemi nedir. Ürün, servis ..."
	});
	
	//title
	var m3 = new WidgetModel({
		type: "title",
		content: "Ürünlerimiz"
	});
	
	//gallery
	var m4 = new WidgetModel({
		type: "gallery",
		title1: "title 1",
		content1: "content 1",
		title2: "title 2",
		content2: "content 2",
		title3: "title 3",
		content3: "content 3"
	});
	
	//bio
	var m5 = new WidgetModel({
		type: "bio",
		title: "Biz !!!",
		address: "Adrs",
		phone: "phone",
		email: "email",
		website: "website",
		fb: undefined,
		tw: undefined
	});
	
	var widgetsCol = new WidgetsCollection();
	widgetsCol.add(m1);
	widgetsCol.add(m2);
	widgetsCol.add(m3);
	widgetsCol.add(m4);
	widgetsCol.add(m5);
	
	var ev = new EditorView({
		collection: widgetsCol
	});

});