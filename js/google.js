define(
    [ "async!http://maps.google.com/maps/api/js?key=AIzaSyAbITj3aC4kXSAOc_2AocD_tS9qZkiRwWo&sensor=true!callback" ],
    function() {
        return {
            addMapToCanvas: function( mapCanvas ) {
                var myOptions = {
                    center: new google.maps.LatLng( -34.397, 150.644 ),
                    zoom: 8,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };

                var map = new google.maps.Map( mapCanvas, myOptions );
            }
        }
    }
);