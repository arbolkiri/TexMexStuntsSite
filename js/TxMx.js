;(function(exports){
    "use strict";

Backbone.TxMxRouter = Backbone.Router.extend({
    initialize: function(){
        console.log('routerinitialized');
        this.model = new Backbone.ClassModel();
        this.homeview = new Backbone.HomeView({
            model: this.model
        });
        this.collection = new Backbone.ClassList();
        this.classview = new Backbone.ClassView();
        Backbone.history.start();
    },

    routes: {

        "viewMark": "Mark",
        "viewClasses": "classes",
        "collection": "collection",
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
    view: "stntClassView"
    // events: {
    //     "click #": "trainingViewPage"
    // }
    // trainingViewPage: function(event){
    //     event.preventDefault();
    //     var x = {
    //         chvritbtn: this.el.querySelector("a[name='rightbtn']").value
    //     }
    // }
})





})(typeof module === "object" ? module.exports : window)