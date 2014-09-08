/**
 * Created by svkior on 07/09/14.
 */

function getRadioValue(theRadioGroup){

    var elements = document.getElementsByName(theRadioGroup);
    for (var i= 0, l = elements.length; i < l; i++){
        if(elements[i].checked){
            return elements[i].value;
        }
    }
}

function setRadioValue(theRadioGroup, value){
    var elements = document.getElementsByName(theRadioGroup);
    for(var i= 0, l= elements.length; i < l; i++){
        elements[i].checked = elements[i].id == value;
    }
}

Template.displayConnector.events({
    'dblclick .can-edit': function(evt, tmpl){
        evt.preventDefault();
        evt.stopPropagation();
        Session.set('setupConnectorEdit', this._id);
    },
    'click .fieldremove': function(evt, tmpl){
        evt.preventDefault();
        evt.stopPropagation();
        Connectors.remove(this._id);
    },
    'keyup .fieldmanuf, keyup .fieldart, keyup .fielddesc, keyup .fieldname, keyup .fieldnumber': function(evt, tmpl){
        evt.preventDefault();
        evt.stopPropagation();
        switch(evt.which){
            case 13:

                var typeC = getRadioValue('optionsRadios');
                var typeF = getRadioValue('optionsRadios2');

                Connectors.update(this._id, {
                    $set:{
                        name:   tmpl.find('.fieldname').value,
                        number: parseInt(tmpl.find('.fieldnumber').value),
                        manuf:  tmpl.find('.fieldmanuf').value,
                        desc:   tmpl.find('.fielddesc').value,
                        art:    tmpl.find('.fieldart').value,
                        typeC: typeC,
                        typeF: typeF
                    }
                });
                Session.set('setupConnectorEdit', null);
                Session.set('setupConnectorEdited', this._id);
                break;
            case 27:
                Session.set('setupConnectorEdit', null);
                Session.set('setupConnectorEdited', this._id);
                break;
        }
    },
    'click .addpin': function(evt, tmpl){
        evt.preventDefault();
        evt.stopPropagation();
        var idd = Pins.insert({name:'0', u:220, sMin: 0.0, sMax: 0.0, connectorId: this._id});
        Session.set('editing_pin', idd);
    },
    'click .copypin': function(evt, tmpl){
        evt.preventDefault();
        evt.stopPropagation();
        Session.set('select_copy_pin_from', this._id);
    },
    'click .connector-copy-from': function(){
        var minePins = Pins.find({connectorId: this._id},{reactive: false});
        var foreignId = Session.get('select_copy_pin_from');

        minePins.forEach(function(pin){
            Pins.insert({name:pin.name, u:pin.u, sMin: pin.sMin, sMax:  pin.sMax, connectorId: foreignId});
        });
        Session.set('select_copy_pin_from', null);
        Session.set('setupConnectorEdited', foreignId);
    }
});

Template.displayConnector.helpers({
    classCopyFrom: function(){
        var scpf = Session.get('select_copy_pin_from');
        if(scpf){
            return Session.equals('select_copy_pin_from', this._id) ? "" : "connector-copy-from";
        } else{
            return ""
        }
    },
   isEdited: function(){
       return Session.equals('setupConnectorEdit', this._id);
   },
    nameNnumber: function(){
        if(this.number == 0){
            return this.name;
        } else {
            return this.name + this.number;
        }
    },
    isCheckedF: function(name){
        return this.typeF == name ? "checked" : "";
    },
    isCheckedC: function(name){
        return this.typeC == name ? "checked" : "";
    },
    isLastEdited: function(){
        return Session.equals('setupConnectorEdited', this._id) ? "tr-edited" : "";
    },
    pinouts: function(){
    return Pins.find({connectorId: this._id},{sort:{name:1}});
    }
});
