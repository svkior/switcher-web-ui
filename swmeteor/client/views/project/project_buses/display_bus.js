/**
 * Created by svkior on 09/09/14.
 */
Template.displayBus.helpers({
    isEdited: function(){
        return Session.equals('setupBusEdit', this._id);
    },
    nameNnumber: function(){
        if(this.number == 0){
            return this.name;
        } else {
            return this.name + this.number;
        }
    }
});

Template.displayBus.events({
    'dblclick .can-edit': function(evt, tmpl){
        evt.preventDefault();
        evt.stopPropagation();
        Session.set('setupBusEdit', this._id);
    },
    'click .fieldremove': function(evt, tmpl){
        evt.preventDefault();
        evt.stopPropagation();
        Buses.remove(this._id);
    },    'keyup .can-save': function(evt, tmpl){
        evt.preventDefault();
        evt.stopPropagation();
        switch(evt.which){
            case 13:
                Buses.update(this._id, {
                    $set:{
                        name:   tmpl.find('.fieldname').value,
                        number: parseInt(tmpl.find('.fieldnumber').value),
                        desc: tmpl.find('.fielddesc').value
                    }
                });
                Session.set('setupBusEdit', null);
                Session.set('setupBusEdited', this._id);

                break;
            case 27:
                Session.set('setupBusEdit', null);
                Session.set('setupBusEdited', this._id);
                break;
        }
    }

});