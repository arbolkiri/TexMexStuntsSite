;(function(exports){
    "use strict";

Backbone.TxMxRouter = Backbone.Router.extend({
    initialize: function(){
        console.log('routerinitialized');
        this.homeview = new Backbone.HomeView();
        Backbone.history.start();
    },

    routes: {

        "viewMark": "homepageMark",
        "viewClasses": "homepageClasses",
        "*default": "homepage"
    },
    homepage: function(){
        this.homeview.render();
    }
})

Backbone.HomeView = Backbone.TemplateView.extend({
    el: ".container",
    view: "homepage"
})




})(typeof module === "object" ? module.exports : window)