/**
 * Created by svkior on 06/09/14.
 */
Template.position.helpers({
    editing_tablename: function(){
        return Session.equals('editing_tablename', this._id);
    },
    dbfields: function(){
        return DBfields.find({positionId: this._id}, {sort:{name: 1}});
    }
});

Template.position.events({
    'click .addfield': function(evt, tmpl){
        evt.preventDefault();
        evt.stopPropagation();
        var idd = DBfields.insert({name:'NewField', value:'---', positionId: this._id});
        Session.set('editing_field', idd);
    },
    'click .icon-tasks': function(evt, tmpl){
        evt.preventDefault();
        evt.stopPropagation();
        Session.set('editing_tablename', this._id);
    },
    'click .icon-share': function(evt, tmpl){
        evt.preventDefault();
        evt.stopPropagation();
        Session.set('neeed_assign_to_class', this._id);
    },
    'click .close': function(evt, tmpl){
        evt.preventDefault();
        evt.stopPropagation();
        console.log(this._id);
        console.log('Debug1: ', DBfields.find({positionId: this._id}).count());
        _.each(DBfields.find({positionId:this._id}).fetch(), function(doc){
            DBfields.remove(doc._id);
        });
        console.log('Debug2: ', DBfields.find({positionId: this._id}).count());
        Positions.remove({_id:this._id});
    },
    'keyup .tablename': function(evt, tmpl){
        evt.stopPropagation();
        evt.preventDefault();
        if(evt.which === 13){
            Positions.update(this._id, {$set:{name:tmpl.find('.tablename').value}});
            Session.set('editing_tablename', null);
        } else {
            if(evt.which === 27){
                Session.set('editing_tablename', null);
            }
        }
    }

});

Template.position.rendered = function(){
    $('.modal').draggable({
/*        containment: "parent",*/
        handle: '.modal-header',
        stop: function(evt,ui){
            var left = Math.round(ui.position.left/10)*10;
            var top = Math.round(ui.position.top/10)*10;
            var id = $(this).attr('id');
           /* console.log(Positions.findOne(id));
            console.log(left);
            console.log(top);*/
            Positions.update(id, {$set: {left: left + 'px', top: top + 'px'}});
        }
    });

    //$('.tablename').tooltip();

    var input = this.find('.tablename');

    if(input){
        input.focus()
    }
};