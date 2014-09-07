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

Template.displayConnector.events({
    'click .icon-lock': function(evt, tmpl){
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
                break;
            case 27:
                Session.set('setupConnectorEdit', null);
                break;
        }
    }
});

Template.displayConnector.helpers({
   isEdited: function(){
       return Session.equals('setupConnectorEdit', this._id);
   },
    nameNnumber: function(){
        if(this.number == 0){
            return this.name;
        } else {
            return this.name + this.number;
        }
    }
});