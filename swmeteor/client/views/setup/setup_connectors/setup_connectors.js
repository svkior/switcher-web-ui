/**
 * Created by svkior on 07/09/14.
 */
Template.setupConnectors.helpers({
    connectors: function(){
        return Connectors.find({});
    }
});

Template.setupConnectors.events({
    'click .add-new-connector': function(evt, templ){
        evt.preventDefault();
        evt.stopPropagation();

        var id = Connectors.insert({
            art: 'Артикул',
            desc: 'Описание',
            manuf: 'Производитель',
            typeC: 'Cable',
            typeF: 'Male',
            pins: []
        });
        Session.set('setupConnectorEdit', id);
    }
});
