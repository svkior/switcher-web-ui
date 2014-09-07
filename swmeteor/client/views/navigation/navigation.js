/**
 * Created by svkior on 06/09/14.
 */
Template.navigation.helpers({
    active_item: function(){
        return Session.get('ActivePage');
    },
    active_main: function(){
        return Session.equals('ActivePage', 'main') ? 'active' : "";
    }
});

Template.navigation.events({

});