/**
 * Created by svkior on 07/09/14.
 */
Template.classSelector.helpers({
    name: function(){
        var pid = Session.get('neeed_assign_to_class');
        if(pid === undefined){
            return null;
        } else {
            var pos = Positions.findOne(pid);
            return pos.name;
        }
    },
    posClasses: function(){
        return PositionClasses.find({});
    }
});

Template.classSelector.events({
    'click .cancel-edit': function(evt, tmpl){
        evt.preventDefault();
        evt.stopPropagation();
        Session.set('neeed_assign_to_class', null);
    }
});