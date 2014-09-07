/**
 * Created by svkior on 07/09/14.
 */
Template.setupProtocols.helpers({

});

Template.setupProtocols.events({
    'click .add-new-protocol': function(evt, templ){
        evt.preventDefault();
        evt.stopPropagation();

        var id = Protocols.insert({
            name: 'Новый протокол'
        });
    }
});
