/**
 * Created by svkior on 07/09/14.
 */
Router.configure({
    layoutTemplate: 'layout'
});

Router.map(function(){
    this.route('home', {
        path: '/'
    });
    this.route('setup', {
        path: '/setup'
    });
    this.route('project',{
        path: '/project'
    });
    this.route('show', {
        path: '/show'
    });
});

