/**
 * Created by svkior on 07/09/14.
 */
Template.setupDevices.helpers({
    devices: function(){
        return Devices.find({}, {sort:{name:1, number:1}});
    }
});

Template.setupDevices.events({
    'click .add-new-device': function(evt, templ){
        evt.preventDefault();
        evt.stopPropagation();

        var id = Devices.insert({
            art: 'Артикул',
            desc: 'Описание',
            manuf: 'Производитель',
            name: 'XX',
            number: 0
        });
        Session.set('setupDeviceEdit', id);
    }
});