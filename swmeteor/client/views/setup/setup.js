/**
 * Created by svkior on 07/09/14.
 */

Template.setup.helpers({

    configParams: function(){
        return [{
            name: 'test'
        }]
    },
    ifSelected: function(name){
        //console.log('name', name);
        var sel = Session.get('setupSelector');
        return sel === name;
    },
    configItems: function() {
        return [
            {
                name: "Конфигурации"
            },
            {
                name: "Пользователи"
            },
            {
                name: "Протоколы"
            },
            {
                name: "Кабели"
            },
            {
                name: "Разъемы"
            },
            {
                name: "Распиновки"
            },
            {
                name: "Контролы приборов"
            },
            {
                name: "Патчлисты"
            },
            {
                name: "Приборы"
            }
        ];
    }
});

