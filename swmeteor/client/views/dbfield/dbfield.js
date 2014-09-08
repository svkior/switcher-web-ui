/**
 * Created by svkior on 06/09/14.
 */
Template.dbfield.helpers({
    editing_field: function(){
        return Session.equals('editing_field', this._id);
    }
});

Template.dbfield.events({
    'click .icon-lock': function(evt, tmpl){
        Session.set('editing_field', this._id);
    },
    'click .fieldremove': function(evt, tmpl){
        DBfields.remove(this._id);
    },
    'keyup .fieldname, keyup .fieldvalue': function(evt, tmpl){
        evt.preventDefault();
        evt.stopPropagation();
        switch(evt.which){
            case 13:
                DBfields.update(this._id, {$set:{name:tmpl.find('.fieldname').value, value: tmpl.find('.fieldvalue').value}});
                Session.set('editing_field', null);
                break;
            case 27:
                Session.set('editing_field', null);
                break;
        }
    }
});
