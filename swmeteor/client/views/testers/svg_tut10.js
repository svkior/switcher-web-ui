/**
 * Created by svkior on 06/09/14.
 */


Template.svgTut10.helpers({
   buttonColor: function(){
       return Session.get('button_light') == true ? "lightgreen": "green";
   }
});

Template.svgTut10.events({
    'mouseenter .rect': function(e){
        e.preventDefault();
        Session.set('button_light', true);
    },
    'mouseleave .rect': function(e){
        e.preventDefault();
        Session.set('button_light', false);
    }
});