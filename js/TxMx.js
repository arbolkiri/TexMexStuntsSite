;
(function(exports) {
    "use strict";

    // function mapUser(mapkey) {
    //     this.mapkey = mapkey;


    Backbone.TxMxRouter = Backbone.Router.extend({
        initialize: function() {
            console.log('routerinitialized');
            this.collection = new Backbone.ClassList();
            this.model = new Backbone.ClassModel();
            this.sessionmodel = new Backbone.Session();
            this.homeview = new Backbone.HomeView({
                model: this.model
            });
            this.markview = new Backbone.MarkMenuView();
            this.classview = new Backbone.ClassView();
            // this.stntmap = new Backbone.MapView({
            //     model: this.sessionmodel
            // });

            Backbone.history.start();
        },

        routes: {

            "viewMark": "Mark",
            "viewClasses": "classes",
            "collection": "collection",
            "*default": "homepage"
        },
        homepage: function() {
            this.homeview.render();
        },
        Mark: function() {
            this.markview.render();
        },
        classes: function() {
            var self = this
            this.classview.render().then(function(){
                self.classview.startGMaps()
            })
        },
        collection: function() {
            var self = this;
            this.collection.fetch();
        },
        // gmap: function() {
        //     this.stntmap.render();
        // }
    })


    Backbone.HomeView = Backbone.TemplateView.extend({
        el: ".container",
        view: "homepage"
    })

    Backbone.ClassModel = Backbone.Model.extend({
        defaults: {
            "classes": "false",
            "title": "not title given",
            "chvritbtn": "false"
        }
    })

    Backbone.ClassList = Backbone.Collection.extend({
        model: Backbone.Classmodel
    })

    Backbone.ClassView = Backbone.TemplateView.extend({
        el: ".container",
        view: "stntClassView",
        events: {
            "click #viewClasses": "trainingViewPage"
        },
        trainingViewPage: function(event) {
            event.preventDefault();
        },
        startGMaps: function(){
            console.log(document.querySelector('#map'))
            this.map = new GMaps({
                // div: ".stuntwrapper",
                div: "#map",
                lat: 29.934777,
                lng: -95.579013,
            })

                this.map.addMarker({
                    lat: 29.934777,
                    lng: -95.579013,
                    title:"blah",

                    click: function(e) {
                        alert('You clicked in this marker');
                    }
                });
            }

    })

    Backbone.Session = Backbone.Model.extend({
        defaults: {
            "signup": "false",
            "login": "not logged in"
        }
    })


    Backbone.MarkMenuView = Backbone.TemplateView.extend({
        el: ".container",
        view: "mark",
        events: {
            "click #viewMark": "markMenuPage"
        },
        markMenuPage: function(event) {
            event.preventDefault();
        }
        // youtubeAPIready: function(){
        //     player = new YT.Player('player', {

        //     })
        // }
        // youtubeplayerready: function(){
        //     player = new YT.Player('player', {
        //         videoId: 'FKVbdVXcKs8'
        //     });
        //     document.getElementById('resume').onclick = function(){
        //         player.playVideo();
        //     };
        //     document.getElementById('pause').onclick = function(){
        //         player.pauseVideo();
        //     }
        // }
    })

})(typeof module === "object" ? module.exports : window)



// var splitlayout = document.getElementById('splitlayout');
//       this.leftside = splitlayout.querySelector('div.intro > div.side-left'),
//       this.rightside = splitlayout.querySelector('div.intro > div.side-right'),
//       this.leftpage = splitlayout.querySelector('div.page-left'),
//       this.rightpage = splitlayout.querySelector('div.page-right')
