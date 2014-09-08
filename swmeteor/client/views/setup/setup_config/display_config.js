/**
 * Created by svkior on 08/09/14.
 */
/**
 * Created by svkior on 07/09/14.
 */
Template.displayConfig.helpers({
    isEdited: function(){
        return Session.equals('setupConfigEdit', this._id);
    }
});

Template.displayConfig.events({
    'click .icon-lock': function(evt, tmpl){
        evt.preventDefault();
        evt.stopPropagation();
        Session.set('setupConfigEdit', this._id);
    },
    'click .fieldremove': function(evt, tmpl){
        evt.preventDefault();
        evt.stopPropagation();
        Configurations.remove(this._id);
    },
    'keyup .fielddesc, keyup .fieldname, keyup .fieldplace': function(evt, tmpl){
        evt.preventDefault();
        evt.stopPropagation();
        switch(evt.which){
            case 13:
                Configurations.update(this._id, {
                    $set:{
                        name:   tmpl.find('.fieldname').value,
                        desc:   tmpl.find('.fielddesc').value,
                        place:    tmpl.find('.fieldplace').value

                    }
                });
                Session.set('setupConfigEdit', null);
                Session.set('setupConnectorEdited', this._id);
                break;
            case 27:
                Session.set('setupConfigEdit', null);
                break;
        }
    }
});
