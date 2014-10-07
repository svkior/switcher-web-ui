/**
 * Created by svkior on 09/09/14.
 */
Template.projectPlans.helpers({
    ProjectSpec: function(){
        return Plans.find({confId : Session.get('selected_configuration')},{sort:{name:1, number:1}});
    },nameNnumber: function(){
        if(this.number == 0){
            return this.name;
        } else {
            return this.name + this.number;
        }
    }
});

Template.projectPlans.events({
    'click .add-plan': function(evt, tmpl){
        evt.preventDefault();
        evt.stopPropagation();
        Plans.insert({
            name: "",
            number: 0,
            desc: "",
            confId : Session.get('selected_configuration')
        })

    }
});
