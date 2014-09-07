/**
 * Created by svkior on 07/09/14.
 */
Template.posclassSelect.events({
    'click .assign-class': function(evt, tmpl){
        evt.stopPropagation();
        evt.preventDefault();
        Positions.update(Session.get('neeed_assign_to_class'), {$set:{group: this._id}});
        Session.set('neeed_assign_to_class', null);
    }
});