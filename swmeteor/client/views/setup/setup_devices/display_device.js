/**
 * Created by svkior on 07/09/14.
 */
Template.displayDevice.helpers({
    isEdited: function(){
        return Session.equals('setupDeviceEdit', this._id);
    },
    nameNnumber: function(){
        if(this.number == 0){
            return this.name;
        } else {
            return this.name + this.number;
        }
    }
});

Template.displayDevice.events({
    'dblclick .can-edit': function(evt, tmpl){
        evt.preventDefault();
        evt.stopPropagation();
        Session.set('setupDeviceEdit', this._id);
    },
    'click .fieldremove': function(evt, tmpl){
        evt.preventDefault();
        evt.stopPropagation();
        Devices.remove(this._id);
    },
    'keyup .can-save': function(evt, tmpl){
        evt.preventDefault();
        evt.stopPropagation();
        switch(evt.which){
            case 13:
                Devices.update(this._id, {
                    $set:{
                        name:   tmpl.find('.fieldname').value,
                        number: parseInt(tmpl.find('.fieldnumber').value),
                        manuf:  tmpl.find('.fieldmanuf').value,
                        desc:   tmpl.find('.fielddesc').value,
                        dmx:    parseInt(tmpl.find('.fielddmx').value),
                        art:    tmpl.find('.fieldart').value

                    }
                });
                Session.set('setupDeviceEdit', null);
                break;
            case 27:
                Session.set('setupDeviceEdit', null);
                break;
        }
    }
});