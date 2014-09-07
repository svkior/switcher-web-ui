/**
 * Created by svkior on 07/09/14.
 */
Template.configSelector.events({
    'click .menu-item': function(evt, tmpl){
        evt.preventDefault();
        evt.stopPropagation();
        Session.set("setupSelector", this.name);
        //console.log('SetupSelector');
    }
});

Template.configSelector.helpers({
    selected: function(){
        if(Session.equals('setupSelector', this.name))
            return "menu-item-selected";
        else
            return "";
    }
});