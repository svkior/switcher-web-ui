/**
 * Created by svkior on 09/09/14.
 */
Template.displayProject.events({
    'click .menu-item': function(evt, tmpl){
        evt.preventDefault();
        evt.stopPropagation();
        Session.set("selected_configuration", this._id);
        ServerRun.update(
            ServerRun.findOne()._id,
            {
                conf : this._id
            }
        );
    }
});

Template.displayProject.helpers({
   isSelected: function(){
       return Session.get("selected_configuration") == this._id ? "menu-item-selected":"";
   }
});