/**
 * Created by svkior on 09/09/14.
 */
Template.specLine.helpers({
    plans: function(){
        return Plans.find({}, {sort:{name:1, number:1}});
    },
    deviceName: function(){
        if(this.deviceId){
            var ggg = Devices.findOne(this.deviceId);
            if(ggg) {
                return ggg.name + ggg.number /*+ " : " + ggg.desc*/;
            }
        }
        return "----";
    },
    universeName: function(){
        if(this.universe){
            var ggg = Buses.findOne(this.universe);
            return ggg.name + ggg.number + " : " + ggg.desc;
        } else {
            return "----";
        }
    },
    classCopyFrom: function(){
        var scpf = Session.get('select_copy_spec_from');
        if(scpf){
            return Session.equals('select_copy_spec_from', this._id) ? "" : "connector-copy-from";
        } else{
            return ""
        }
    },nameNnumber: function(){
        if(this.number == 0){
            return this.name;
        } else {
            return this.name + this.number;
        }
    },
    isEdited: function(){
        return Session.equals('setupSpecEdit', this._id);
    },
    isLastEdited: function(){
        return Session.equals('setupSpecEdited', this._id) ? "tr-edited" : "";
    },
    selectDevices: function(){
        return Devices.find({},{sort:{name:1,number:1}});
    },
    selectUniverses: function(){
        return Buses.find({confId : Session.get('selected_configuration')});
    },
    isSelectedBus: function(bus){
        var curSpecId = Session.get('setupSpecEdit');
        var curSpec = ProjectSpec.findOne(curSpecId);
        return this._id == curSpec.universe ? 'selected' : '';
    },
    isDeviceSelected: function(){
        var curSpecId = Session.get('setupSpecEdit');
        var curSpec = ProjectSpec.findOne(curSpecId);
        return curSpec.deviceId == this._id ? 'selected' : '';
    }
});

Template.specLine.events({
    'change .check-check': function(evt, tmpl){
        var pl = PlanLocations.findOne({planId: evt.currentTarget.id, deviceId:this._id});
        if(evt.currentTarget.checked)
        {
            if(pl){
                PlanLocations.upsert(pl._id,
                    {$set: {visible:true}}
                );
            } else {
                console.log(this);
                var pid = PlanLocations.insert({
                    planId: evt.currentTarget.id,
                    deviceId:this._id,
                    visible: true,
                    x: 300,
                    y: 300
                });
                console.log('Pla: ',pid);
            }
        } else {
            var fo = PlanLocations.findOne({planId: evt.currentTarget.id, deviceId:this._id});
            if(fo){
                PlanLocations.remove(fo._id);
            }
        }
    },
    'click .fieldremove': function(evt, tmpl){
        evt.preventDefault();
        evt.stopPropagation();
        ProjectSpec.remove(this._id);
    },
    'click .connector-copy-from': function(){
        var foreignId = Session.get('select_copy_spec_from');

        ProjectSpec.update(foreignId, {$set:{deviceId: this.deviceId}});
        Session.set('select_copy_spec_from', null);
        Session.set('setupSpecEdited', foreignId);
    },
    'click .copydevice': function(evt, tmpl){
        evt.preventDefault();
        evt.stopPropagation();
        Session.set('select_copy_spec_from', this._id);
    },
    'dblclick .can-edit': function(evt, tmpl){
        evt.preventDefault();
        evt.stopPropagation();
        Session.set('setupSpecEdit', this._id);
        Session.set('setupSpecEdited', null);
    },
    'keyup .can-save': function(evt, tmpl){
        evt.preventDefault();
        evt.stopPropagation();
        switch(evt.which){
        case 13:
            var rrr = $('#select-device').val();
            ProjectSpec.update(this._id, {
            $set:{
                name:   tmpl.find('.fieldname').value,
                number: parseInt(tmpl.find('.fieldnumber').value),
                universe: $('#select-universe').val(),
                dmx: parseInt(tmpl.find('.fielddmx').value),
                deviceId: rrr
            }
        });
        Session.set('setupSpecEdit', null);
        Session.set('setupSpecEdited', this._id);
        break;
    case 27:
        Session.set('setupSpecEdit', null);
        Session.set('setupSpecEdited', this._id);
        break;
    }
}
});
