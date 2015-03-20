;(function(exports){
    "use strict";

Backbone.TxMxRouter = Backbone.Router.extend({
    initialize: function(){
        console.log('routerinitialized');
        this.collection = new Backbone.ClassList();
        this.model = new Backbone.ClassModel();
        this.homeview = new Backbone.HomeView({
            model: this.model
        });

        this.classview = new Backbone.ClassView();
        Backbone.history.start();
    },

    routes: {

        "viewMark": "Mark",
        "viewClasses": "classes",
        "collection": "collection",
        "righttransition": "rtransitions",
        "lefttransition": "ltransitions",
        "*default": "homepage"
    },
    homepage: function(){
        this.homeview.render();
    },
    Mark: function(){
        this.markview.render();
    },
    classes: function(){
        this.classview.render();
    },
    collection: function(){
        var self = this;
        this.collection.fetch();
    },
    rtransitions: function(){
        this.rightside.render();
    },
    ltransitions: function(){
        this.leftside.render();
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
    trainingViewPage: function(event){
        event.preventDefault();
        console.log("hi");

        // }
    }
})

  var splitlayout = document.getElementById('splitlayout');
        this.leftside = splitlayout.querySelector('div.intro > div.side-left'),
        this.rightside = splitlayout.querySelector('div.intro > div.side-right'),
        this.leftpage = splitlayout.querySelector('div.page-left'),
        this.rightpage = splitlayout.querySelector('div.page-right')





})(typeof module === "object" ? module.exports : window)