/**
 * Created by svkior on 08/09/14.
 */

function getRadioValue(theRadioGroup){

    var elements = document.getElementsByName(theRadioGroup);
    for (var i= 0, l = elements.length; i < l; i++){
        if(elements[i].checked){
            return elements[i].value;
        }
    }
}

Template.displayWire.helpers({
    isEditing: function(){
        return Session.equals('editing_wire', this._id);
    },
    isChecked1: function(name){
        return this.color1 == name ? "checked" : "";
    },
    isChecked2: function(name){
        return this.color2 == name ? "checked" : "";
    }

});

Template.displayWire.events({
    'click .icon-lock': function(evt, tmpl){
        Session.set('editing_wire', this._id);
    },
    'click .fieldremove': function(evt, tmpl){
        Wires.remove(this._id);
    },
    'keyup .finish-edit': function(evt, tmpl){
        evt.preventDefault();
        evt.stopPropagation();
        switch(evt.which){
            case 13:
                Wires.update(this._id, {$set:{
                    name:tmpl.find('.fieldname').value,
                    u: parseFloat(tmpl.find('.fieldu').value),
                    s: parseFloat(tmpl.find('.field-s').value),
                    color1: getRadioValue('color1'),
                    color2: getRadioValue('color2')
                }});
                Session.set('editing_wire', null);
                break;
            case 27:
                Session.set('editing_wire', null);
                break;
        }
    }
});