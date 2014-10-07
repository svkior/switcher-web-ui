/**
 * Created by svkior on 09/09/14.
 */
Template.setupPinouts.helpers({
    pinouts: function(){
        return Pinouts.find({},{sort: {name:1}});
    }
});

Template.setupPinouts.events({
    'click .add-new-pinout': function(evt, templ){
        evt.preventDefault();
        evt.stopPropagation();

        var id = Pinouts.insert({
            name: 'XX',
            type: 'device',
            cableId: "",
            connectorId: "",
            pinArray: []
        });
        Session.set('setupCableEdit', id);
    }
});
