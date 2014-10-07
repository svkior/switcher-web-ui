/**
 * Created by svkior on 07/09/14.
 */

Template.project.helpers({
    configItems: function() {
        return [
            {
                name: "Выбор конфигурации"
            },
            {
                name: "Планы размещения"
            },
            {
                name: "Спецификация оборудования"
            },
            {
                name: "Кабельный журнал"
            },
            {
                name: "Шины"
            },
            {
                name: "Патчи"
            },
            {
                name: "Шоу"
            },
            {
                name: "Секвенции"
            },
            {
                name: "Пульты управления"
            }
        ];
    },
    ifSelected: function(name){
        //console.log('name', name);
        var sel = Session.get('projectSelector');
        return sel === name;
    }
});