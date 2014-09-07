/**
 * Created by svkior on 07/09/14.
 */
Template.setupProtocols.helpers({
    protocols: function(){
        return Protocols.find({}, {sort:{name:1}});
    }
});

Template.setupProtocols.events({
    'click .add-new-protocol': function(evt, templ){
        evt.preventDefault();
        evt.stopPropagation();

        var id = Protocols.insert({
            name: 'XXXX',
            desc: 'Новый Протокол'
        });
        Session.set('setupProtocolEdit', id);
    }
});
