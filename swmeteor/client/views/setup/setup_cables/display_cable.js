/**
 * Created by svkior on 07/09/14.
 */
Template.displayCable.helpers({
    isEdited: function(){
        return Session.equals('setupCableEdit', this._id);
    },
    nameNnumber: function(){
        if(this.number == 0){
            return this.name;
        } else {
            return this.name + this.number;
        }
    }
});

Template.displayCable.events({
    'click .icon-lock': function(evt, tmpl){
        evt.preventDefault();
        evt.stopPropagation();
        Session.set('setupCableEdit', this._id);
    },
    'click .fieldremove': function(evt, tmpl){
        evt.preventDefault();
        evt.stopPropagation();
        Cables.remove(this._id);
    },
    'keyup .fieldmanuf, keyup .fieldart, keyup .fielddesc, keyup .fieldname, keyup .fieldnumber': function(evt, tmpl){
        evt.preventDefault();
        evt.stopPropagation();
        switch(evt.which){
            case 13:
                Cables.update(this._id, {
                    $set:{
                        name:   tmpl.find('.fieldname').value,
                        number: parseInt(tmpl.find('.fieldnumber').value),
                        manuf:  tmpl.find('.fieldmanuf').value,
                        desc:   tmpl.find('.fielddesc').value,
                        art:    tmpl.find('.fieldart').value

                    }
                });
                Session.set('setupCableEdit', null);
                break;
            case 27:
                Session.set('setupCableEdit', null);
                break;
        }
    }
});