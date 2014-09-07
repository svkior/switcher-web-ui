/**
 * Created by svkior on 06/09/14.
 */
Template.home.helpers({
    positions: function(){
        var gid = Session.get('selected_posgroup');
        if(gid === undefined){
            return Positions.find({})
        } else {
            return Positions.find({group: gid});
        }
    },
    posClasses: function(){
        return PositionClasses.find({});
    },
    need2SelectClass: function(){
        var pid = Session.get('neeed_assign_to_class');
        return pid != undefined;
    }
});

Template.home.events({
    'dblclick .click-to-add-new': function(evt, tmpl){
        evt.preventDefault();
        evt.stopPropagation();

        var gid = Session.get('selected_posgroup');
        if(evt.target.className === 'span10 click-to-add-new'){
            var id = Positions.insert({name:'New Table', left:(evt.pageX + 280)+'px', top:(evt.pageY) + 'px', group:gid});
            Session.set('editing_tablename', id);

        }
    },
    'click .add-new-class': function(evt, tmpl){
        evt.preventDefault();
        evt.stopPropagation();
        var id = PositionClasses.insert({name:'Новая Группа'});
        Session.set('editing_positionclass', id);
    },
    'click .unassigned-class': function(evt, tmpl){
        evt.preventDefault();
        evt.stopPropagation();
        Session.set('selected_posgroup', null);
    }
});