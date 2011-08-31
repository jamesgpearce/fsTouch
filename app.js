var fs = new Ext.Application({

    launch: function() {

        fs.back = new Ext.Button({
            text:'Back', ui:'back',
            hidden: true,
            handler: function () {fs.viewport.setActiveItem(0, {type:'slide', direction:'right'});this.hide();}
        });

        fs.viewport = new Ext.Panel({
            layout: 'card',
            fullscreen: true,
            dockedItems: [
                {xtype:'toolbar', title: '<b>Function</b>Source', items: [fs.back]},
            ],
            cardSwitchAnimation: 'slide',
            items: [{
                xtype: 'list',
                plugins: [{
                    ptype: 'pullrefresh'
                }],
                store: new Ext.data.Store({
                    model: Ext.regModel('', {
                        fields: [
                            {name: 'id', type:'string'},
                            {name: 'title', type:'string'},
                            {name: 'author', type:'string'},
                            {name: 'content', type:'string', convert: function (content) {
                                return content
                                    .replace(/src="/g, 'src="http://src.sencha.io/-36/')
                                    .replace(/width|height=".*"/g, '');
                            }}
                        ]
                    }),
                    autoLoad:true,
                    proxy: {
                        type: 'scripttag',
                        url: 'http://functionsource.com/api/posts/post/1.json'
                    }
                }),
                itemTpl: '{title}',
                listeners: {
                    selectionchange: function (selModel, records) {
                        if (records[0]) {
                            fs.back.show();
                            fs.viewport
                                .setActiveItem(1)
                                .getActiveItem().update(records[0].data);
                        }
                    }
                }
            }, {
                scroll: 'vertical',
                styleHtmlContent: true,
                tpl: '<h2>{title}</h2><p style="font-size:smaller">By {author}</p>{content}'
            }]
        });

    }
});