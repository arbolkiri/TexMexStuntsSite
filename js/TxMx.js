;
(function(exports) {
    "use strict";

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
            var self =  this
            this.markview.render().then(function(){
                self.markview.videorender()
            })
        },
        classes: function() {
            var self = this
            this.classview.render().then(function() {
                self.classview.startGMaps()
            })
        },
        collection: function() {
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
        view: "stntClassView",
        events: {
            "click #viewClasses": "trainingViewPage"
        },
        trainingViewPage: function(event) {
            event.preventDefault();
        },
        startGMaps: function() {
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
                title: "blah",

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
        markMenuPage: function(event) {
            event.preventDefault();
        },
        videorender:  function($) {

            console.log(document.querySelector('#player'));

              var tag = document.createElement('script');
              tag.src = "https://www.youtube.com/iframe_api";
              var firstScriptTag = document.getElementsByTagName('script')[0];
              firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

              var player;

              window.onYouTubeIframeAPIReady= function() {
                player = new YT.Player('player', {
                    div: '#player',
                  // height: '390',
                  // width: '640',
                  videoId: 'FKVbdVXcKs8',
                  events: {
                    onReady: 'onPlayerReady',
                    onStateChange: 'onPlayerStateChange'
                  }
                });
              }

              function onPlayerReady(event) {
                event.target.playVideo();
              }
              var done = false;
              function onPlayerStateChange(event) {
                if (event.data == YT.PlayerState.PLAYING && !done) {
                  setTimeout(stopVideo, 6000);
                  done = true;
                }
              }
              function stopVideo() {
                player.stopVideo();
              }
              return player;
            }
         })
})(typeof module === "object" ? module.exports : window)


       //  youtubeAPIready: function() {
       //      player = new YT.Player('player', {
       //          videoID: [],
       //          playerVars: {
       //              controls: 0,
       //              showinfo: 0,
       //              modestbranding: 0,
       //              wmode: 'transparent'
       //          },
       //          events: {
       //              'onReady': "onPlayerReady",
       //              'onStateChange': "onPlayerStateChange"
       //          }

       //      })
       //  },
       //  onPlayerStateChange: function(event) {

       //      if (event.data === 0) {
       //          $('#nextVideo').trigger('click');
       //      } else if (event.data === 2) {
       //          $('#play').show();
       //          $('#pause').hide();
       //      } else if (event.data === 1) {
       //          $('#pause').show();
       //          $('#play').hide();
       //      }
       //  },
       //  loadVideo: function(videoID) {
       //      player.loadVideoByid(videoID);
       //  },
       //  onPlayerReady: function(event) {
       //      event.target.playVideo();
       //  },
       //  nextVideo: function() {
       //      player.loadVideoByid(videoID);
       //  },
       //  prevVideo: function() {
       //      player.loadVideoByid(videoID);
       //  },
       //  playVideo: function() {
       //      player.playVideo();
       //  },
       //  pauseVideo: function() {
       //      player.pauseVideo();
       //  },
       //  makevideoswork: function(){
       //  $(function() {
       //      var index = 0
       //      var options = [];
       //      var videoIDs =[];
       //      $("form#search-youtube").submit(function() {
       //          var request = $("input#search-item").val();
       //          $.get("https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&q=" + request + "&key=AIzaSyAD9lwLl9lgkPno4di-bLCQBlWHi6CbRB4&order=viewCount")
       //              .done(function(responseText) {
       //                  responseText.items.forEach(function(video) {
       //                      videoIDs.unshift(video.id.videoId);
       //                  });
       //              })
       //              .done(function() {
       //                  loadVideo(videoIDs[index]);
       //              });
       //          $("#search-item").val("");
       //          return false;
       //      });

       //      $("#nextVideo").click(function() {
       //          loadVideo(videoIDs[index + 1]);
       //          index++;
       //      });

       //      $("#prevVideo").click(function() {
       //          loadVideo(videoIDs[index - 1]);
       //          index--;
       //      });

       //      $("#play").hover(function() {
       //          $(this).val("play");
       //      });

       //      $("#play").mouseout(function() {
       //          $(this).val(">");
       //      });

       //      $("#pause").hover(function() {
       //          $(this).val("pause");
       //      });

       //      $("#pause").mouseout(function() {
       //          $(this).val("ll");
       //      });

       //      $("#nextVideo").hover(function() {
       //          $(this).val("next");
       //      });

       //      $("#nextVideo").mouseout(function() {
       //          $(this).val(">>");
       //      });

       //      $("#prevVideo").hover(function() {
       //          $(this).val("prev");
       //      });

       //      $("#prevVideo").mouseout(function() {
       //          $(this).val("<<");
       //      });

       //      $("#about").hover(function() {
       //          $(this).val("about");
       //      });

       //      $("#about").mouseout(function() {
       //          $(this).val("?");
       //      });

       //      $("#about").click(function() {
       //          $("#myModal").modal('show');
       //          $("#pause").trigger('click');
       //      });

       //      $("#modal-close").click(function() {
       //          $("#play").trigger('click');
       //      });
       //  })
       // }

// var splitlayout = document.getElementById('splitlayout');
//       this.leftside = splitlayout.querySelector('div.intro > div.side-left'),
//       this.rightside = splitlayout.querySelector('div.intro > div.side-right'),
//       this.leftpage = splitlayout.querySelector('div.page-left'),
//       this.rightpage = splitlayout.querySelector('div.page-right')
