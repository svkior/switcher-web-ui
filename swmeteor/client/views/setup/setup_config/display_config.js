/**
 * Created by svkior on 08/09/14.
 */
/**
 * Created by svkior on 07/09/14.
 */
Template.displayConfig.helpers({
    isEdited: function(){
        return Session.equals('setupConfigEdit', this._id);
    },
    nameNnumber: function(){
        if(this.number == 0){
            return this.name;
        } else {
            return this.name + this.number;
        }
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
    'keyup .fieldmanuf, keyup .fieldart, keyup .fielddesc, keyup .fieldname, keyup .fieldnumber': function(evt, tmpl){
        evt.preventDefault();
        evt.stopPropagation();
        switch(evt.which){
            case 13:
                Configurations.update(this._id, {
                    $set:{
                        name:   tmpl.find('.fieldname').value,
                        number: parseInt(tmpl.find('.fieldnumber').value),
                        manuf:  tmpl.find('.fieldmanuf').value,
                        desc:   tmpl.find('.fielddesc').value,
                        art:    tmpl.find('.fieldart').value

                    }
                });
                Session.set('setupConfigEdit', null);
                break;
            case 27:
                Session.set('setupConfigEdit', null);
                break;
        }
    }
});