/**
 * Created by svkior on 07/09/14.
 */
Template.setupConfig.helpers({
    cables: function(){
        return Configurations.find({}, {sort:{name:1, number:1}});
    }
});

Template.setupConfig.events({
    'click .add-new-cable': function(evt, templ){
        evt.preventDefault();
        evt.stopPropagation();

        var id = Configurations.insert({
            desc: 'Описание',
            place: 'Площадка',
            name: 'XX'
        });
        Session.set('setupConfigEdit', id);
    }
});