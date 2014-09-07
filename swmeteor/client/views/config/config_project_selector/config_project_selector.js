/**
 * Created by svkior on 07/09/14.
 */
Template.configProjectSelector.events({
    'click .menu-item': function(evt, tmpl){
        evt.preventDefault();
        evt.stopPropagation();
        Session.set("projectSelector", this.name);
        //console.log('SetupSelector');
    }
});

Template.configProjectSelector.helpers({
    selected: function(){
        if(Session.equals('projectSelector', this.name))
            return "menu-item-selected";
        else
            return "";
    }
});