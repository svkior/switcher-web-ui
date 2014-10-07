/**
 * Created by svkior on 09/09/14.
 */
Template.displayPlan.helpers({
    nameNnumber: function(){
        if(this.number == 0){
            return this.name;
        } else {
            return this.name + this.number;
        }
    },
    isEdited: function(){
        return Session.equals('setupPlanEdit', this._id);
    },
    devices: function(){
        return PlanLocations.find({planId: this._id});
    }
});

Template.displayPlan.events({
    'click .fieldremove': function(evt, tmpl){
        evt.preventDefault();
        evt.stopPropagation();
        Plans.remove(this._id);
    },
    'dblclick .can-edit': function(evt, tmpl){
        evt.preventDefault();
        evt.stopPropagation();
        Session.set('setupPlanEdit', this._id);
        Session.set('setupPlanEdited', null);
    },
    'keyup .can-save': function(evt, tmpl) {
        evt.preventDefault();
        evt.stopPropagation();
        switch (evt.which) {
            case 13:
                Plans.update(this._id, {
                    $set: {
                        name: tmpl.find('.fieldname').value,
                        number: parseInt(tmpl.find('.fieldnumber').value),
                        desc: tmpl.find('.fielddesc').value
                    }
                });
                Session.set('setupPlanEdit', null);
                Session.set('setupPlanEdited', this._id);
                break;
            case 27:
                Session.set('setupPlanEdit', null);
                Session.set('setupPlanEdited', this._id);
                break;
        }
    }
});
