/**
 * Created by svkior on 07/09/14.
 */
Template.displayCable.helpers({
    classCopyFrom: function(){
        var scwf = Session.get('select_copy_wire_from');
        if(scwf){
            return Session.equals('select_copy_wire_from', this._id) ? "" : "connector-copy-from";
        } else{
            return ""
        }
    },
    isEdited: function(){
        return Session.equals('setupCableEdit', this._id);
    },
    nameNnumber: function(){
        if(this.number == 0){
            return this.name;
        } else {
            return this.name + this.number;
        }
    },
    isLastEdited: function(){
        return Session.equals('setupCableEdited', this._id) ? "tr-edited" : "";
    },
    wires: function(){
        return Wires.find({cableId: this._id},{sort:{name:1}});
    }
});

Template.displayCable.events({
    'dblclick .can-edit': function(evt, tmpl){
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
    },
    'click .addwire': function(evt, tmpl){
        evt.preventDefault();
        evt.stopPropagation();
        var idd = Wires.insert({name:'0', u:220, s: 0.0, color1: "black", color2: "black", cableId: this._id});
        Session.set('editing_wire', idd);
    },
    'click .copywire': function(evt, tmpl){
        evt.preventDefault();
        evt.stopPropagation();
        Session.set('select_copy_wire_from', this._id);
    },
    'click .connector-copy-from ': function(evt, tmpl){
        evt.preventDefault();
        evt.stopPropagation();
        var mineWires = Wires.find({cableId: this._id}, {reactive: false});
        var foreignId  = Session.get('select_copy_wire_from');

        mineWires.forEach(function(wire){
            Wires.insert({name:wire.name, u:wire.u, s: wire.s, color1: wire.color1, color2: wire.color2, cableId: foreignId});
        });
        Session.set('select_copy_wire_from', null);
    }
});