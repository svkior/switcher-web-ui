/**
 * Created by svkior on 07/09/14.
 */
Template.setupCables.helpers({
    cables: function(){
        return Cables.find({}, {sort:{name:1, number:1}});
    }
});

Template.setupCables.events({
    'click .add-new-cable': function(evt, templ){
        evt.preventDefault();
        evt.stopPropagation();

        var id = Cables.insert({
            art: 'Артикул',
            desc: 'Описание',
            manuf: 'Производитель',
            name: 'XX',
            number: 0,
            provods: []
        });
        Session.set('setupCableEdit', id);
    }
});