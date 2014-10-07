/**
 * Created by svkior on 09/09/14.
 */
Template.projectSpec.helpers({
    confName: function(){
        var cid = Session.get('selected_configuration');
        if(!cid){
            cid = ServerRun.findOne().conf;
            Session.set('selected_configuration', cid);
        }
        return Configurations.findOne(ServerRun.findOne().conf).name;
    },
    ProjectSpec: function(){
        return ProjectSpec.find({confId : Session.get('selected_configuration')},{sort:{name:1, number:1}});
    }
});

Template.projectSpec.events({
    'click .add-spec-position': function(evt, tmpl){
        evt.preventDefault();
        evt.stopPropagation();
        ProjectSpec.insert({
            name: "",
            number: 0,
            deviceId: "",
            universe: 0,
            dmx: 0,
            confId : Session.get('selected_configuration')
        })
    }
});