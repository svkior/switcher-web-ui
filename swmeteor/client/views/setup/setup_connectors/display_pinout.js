/**
 * Created by svkior on 08/09/14.
 */
Template.displayPinout.helpers({
    isEditing: function(){
        return Session.equals('editing_pinout', this._id);
    }
});


Template.displayPinout.events({
    'click .icon-lock': function(evt, tmpl){
        Session.set('editing_pinout', this._id);
    },
    'click .fieldremove': function(evt, tmpl){
        Pins.remove(this._id);
    },
    'keyup .finish-edit': function(evt, tmpl){
        evt.preventDefault();
        evt.stopPropagation();
        switch(evt.which){
            case 13:
                Pins.update(this._id, {$set:{
                    name:tmpl.find('.fieldname').value,
                    u: parseFloat(tmpl.find('.fieldu').value),
                    sMin: parseFloat(tmpl.find('.field-smin').value),
                    sMax: parseFloat(tmpl.find('.field-smax').value)
                }});
                Session.set('editing_pinout', null);
                break;
            case 27:
                Session.set('editing_pinout', null);
                break;
        }
    }
});
