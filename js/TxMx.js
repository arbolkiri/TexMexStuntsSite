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
                this.classview.render();

            },
            collection: function() {
                var self = this;
                this.collection.fetch();
            },
            gmap: function() {
                this.stntmap.render();
            }
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
            console.log("hi");

            // }
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
            console.log("introducingmark");
        }
    })

    // Backbone.MapView = Backbone.View.extend({
    //     // el: "#map-canvas",
    //     initialize: function() {
    //         this.el = "#map-canvas",
    //                  this.map = new GMaps ({
    //                     div: ".stuntwrapper",
    //                    lat: 29.934777,
    //                     lng: -95.579013,
    //                     markers: [{
    //                         lat: 29.934777,
    //                         lng: -95.579013,
    //                         color: 'red'}]
    //                 });
    //                  Backbone.classview.bind('reset', this);
    //             }

    // })

// })


})(typeof module === "object" ? module.exports : window)



// var splitlayout = document.getElementById('splitlayout');
//       this.leftside = splitlayout.querySelector('div.intro > div.side-left'),
//       this.rightside = splitlayout.querySelector('div.intro > div.side-right'),
//       this.leftpage = splitlayout.querySelector('div.page-left'),
//       this.rightpage = splitlayout.querySelector('div.page-right')
