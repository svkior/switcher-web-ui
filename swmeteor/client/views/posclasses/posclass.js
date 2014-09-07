/**
 * Created by svkior on 07/09/14.
 */
Template.posclass.events({
   'click .fieldremove': function(evt, tmpl){
       evt.stopPropagation();
       evt.preventDefault();
       PositionClasses.remove(this._id);
   },
   'click .icon-lock': function(evt, tmpl){
       evt.stopPropagation();
       evt.preventDefault();
       Session.set('editing_groupname', this._id);
   },
   'click .menu-item': function(evt, tmpl){
       evt.stopPropagation();
       evt.preventDefault();
       Session.set('selected_posgroup', this._id);
   },
   'keyup .fieldname': function(evt, tmpl){
       evt.stopPropagation();
       evt.preventDefault();
       switch(evt.which){
           case 13:
               PositionClasses.update(this._id, {$set:{name:tmpl.find('.fieldname').value}});
               Session.set('editing_groupname', null);
               break;
           case 27:
               Session.set('editing_groupname', null);
               break;
       }
   }
});

Template.posclass.helpers({
    editing_field: function(){
        return Session.equals('editing_groupname', this._id);
    },
    isSelected: function(){
        if(Session.equals('selected_posgroup', this._id))
            return "menu-item-selected";
        else
            return "";
    }
});