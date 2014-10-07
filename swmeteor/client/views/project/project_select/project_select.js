/**
 * Created by svkior on 09/09/14.
 */
Template.projectSelect.helpers({
    projects: function(){
        return Configurations.find({}, {sort:{name:1, number:1}});
    }
});