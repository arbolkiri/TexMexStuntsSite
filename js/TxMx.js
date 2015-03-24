;
(function(exports) {
    "use strict";

    function mapUser(mapkey) {
        this.mapkey = mapkey;


        Backbone.TxMxRouter = Backbone.Router.extend({
            initialize: function() {
                console.log('routerinitialized');
                this.collection = new Backbone.ClassList();
                this.model = new Backbone.ClassModel();
                this.homeview = new Backbone.HomeView({
                    model: this.model
                });
                this.markview = new Backbone.MarkMenuView();
                this.classview = new Backbone.ClassView();

                this.mapmodel = new Backbone.MapModel();
                this.mapview = new Backbone.MapView({
                    model: this.mapmodel
                });

                Backbone.history.start();
            },

            routes: {
                " ": "rendermap",
                "viewMark": "Mark",
                "viewClasses": "classes",
                "collection": "collection",
                "righttransition": "rtransitions",
                "lefttransition": "ltransitions",
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
            rendermap: function() {
                    this.mapview.render();
                }
                // rtransitions: function(){
                //     this.rightside.render();
                // },
                // ltransitions: function(){
                //     this.leftside.render();
                // }
        })
        var router = new Backbone.TxMxRouter();
    };

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

    Backbone.MapModel = Backbone.Model.extend({
        el: "#map-canvas",
        defaults: {
            id: '',
            currentLatLng: {},
            mapOptions: {},
            map: {},
            position: {},
            zoom: 13,
            maxZoom: 16,
            minZoom: 12
        },
        initMap: function(position) {
                     var map = new Map({
                    zoom: 8,
                    maxZoom: 18,
                    minZoom: 8
                });
                map.initMap({
                    coords: {
                        latitude: 29.934777,
                        longitude: -95.579013
                    }
                });
            this.set('position', position);
            var currentLatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            this.set('currentLatLng', currentLatLng);
            var mapOptions = {
                zoom: this.get('zoom'),
                maxZoom: this.get('maxZoom'),
                minZoom: this.get('minZoom'),
                center: currentLatLng,
                mayTypeId: google.maps.MapTypeId.ROADMAP,
                mapTypeControl: false
            };

            this.set('mapOptions', mapOptions);
        }
    })

    Backbone.MapView = Backbone.View.extend({
        defaults: {
            region: 'us',
            language: 'en'
        },
        id: 'map-canvas',
        initialize: function() {
            debugger;
           var url = "http://maps.googleapis.com/maps/api/js?v=3.exp"+ "&signed_in=true&callback=initialize";
            $.ajax({
                url: url,
                dataType: "script",
                async: true,
                success: function() {
                    console.log('success!');
                }
            });
            this.model.set('map', new google.maps.Map(this.el, this.model.get('mapOptions')));
        },
        render: function() {
            console.log('mapinitialized');
            $('#viewClasses' + this.id).replaceWith(this.el);
            return this;
        }
    })
    exports.mapUser = mapUser;

})(typeof module === "object" ? module.exports : window)
  // function initialize() {
    //   var mapOptions = {
    //     zoom: 8,
    //     center: new google.maps.LatLng(29.934777, -95.579013)
    //   };
    //   map = new google.maps.Map(document.getElementById('map-canvas'),
    //       mapOptions);
    // }

    // google.maps.event.addDomListener(window, 'load', initialize);



// var splitlayout = document.getElementById('splitlayout');
//       this.leftside = splitlayout.querySelector('div.intro > div.side-left'),
//       this.rightside = splitlayout.querySelector('div.intro > div.side-right'),
//       this.leftpage = splitlayout.querySelector('div.page-left'),
//       this.rightpage = splitlayout.querySelector('div.page-right')
