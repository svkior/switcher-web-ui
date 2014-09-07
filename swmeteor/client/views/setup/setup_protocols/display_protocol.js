/**
 * Created by svkior on 07/09/14.
 */
Template.displayProtocol.helpers({
    isEdited: function(){
        return Session.equals('setupProtocolEdit', this._id);
    }
});
Template.displayProtocol.events({
    'click .icon-lock': function(evt, tmpl){
        evt.preventDefault();
        evt.stopPropagation();
        Session.set('setupProtocolEdit', this._id);
    },
    'click .fieldremove': function(evt, tmpl){
        evt.preventDefault();
        evt.stopPropagation();
        Protocols.remove(this._id);
    },
    'keyup .fielddesc, keyup .fieldname': function(evt, tmpl){
        evt.preventDefault();
        evt.stopPropagation();
        switch(evt.which){
            case 13:
                Protocols.update(this._id, {
                    $set:{
                        name:   tmpl.find('.fieldname').value,
                        desc:   tmpl.find('.fielddesc').value
                    }
                });
                Session.set('setupProtocolEdit', null);
                break;
            case 27:
                Session.set('setupProtocolEdit', null);
                break;
        }
    }
});
