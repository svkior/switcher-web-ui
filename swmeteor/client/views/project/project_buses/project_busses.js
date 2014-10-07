/**
 * Created by svkior on 09/09/14.
 */
Template.projectBuses.helpers({
    confName: function(){
        var cid = Session.get('selected_configuration');
        if(!cid){
            cid = ServerRun.findOne().conf;
            Session.set('selected_configuration', cid);
        }
        return Configurations.findOne(ServerRun.findOne().conf).name;
    },
    buses: function(){
        return Buses.find({confId:Session.get('selected_configuration')}, {sort:{name:1, number:1}});
    }
});

Template.projectBuses.events({
    'click .add-bus': function(evt, tmpl){
        evt.preventDefault();
        evt.stopPropagation();
        console.log('Hi!');
        var bid = Buses.insert({
            name: "",
            number: 0,
            confId : Session.get('selected_configuration')
        });
        Session.set('setupBusEdit', bid);

    }
});
