/**
 * Created by svkior on 06/09/14.
 */

Template.ListOfMindMaps.helpers({
    Mindmaps: function(){
        return Mindmaps.find({});
    }
});

Template.ListOfMindMaps.events({
   'submit form': function(e){
       e.preventDefault();

       var nameInput = $(e.target).find('[name=name]');

       Mindmaps.insert({name:nameInput.val()});

       nameInput.val('');
   }
});

Template.MindMapItem.events({
    'click .delete-button': function(e){
        e.preventDefault();
        //console.log('Delete Button:', this._id);
        Mindmaps.remove(this._id);
    },
    'click .open-editor': function(e){
        e.preventDefault();
        console.log('OPen Editor ', this._id);
        Session.set('edited-mindmap', this._id);
    }
});

Template.MindMapEditor.helpers({
   HasMindmap: function(){
       return Session.get('edited-mindmap') != undefined;
   },
   Mindmap: function(){
       return Session.get('edited-mindmap');
   }
});