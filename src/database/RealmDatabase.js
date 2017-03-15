import Realm from 'realm';

let repository = new Realm({
    schema: [{
        name: 'User',
        primaryKey: 'id',
        properties: {
            name: 'string',
            access_token: 'string',
            company: 'string',
            id: 'string',
            image_link: 'string'
        }}]
});

let RealmDatabse = {
    findUser: function() {
        return repository.objects('User');
    },
    saveUser: function(userModel) {
        repository.write(() => {
            repository.create('User', userModel,true);
        })
    }
    //
    // update: function(todo, callback) {
    //     if (!callback) return;
    //     repository.write(() => {
    //         callback();
    //         todo.updatedAt = new Date();
    //     });
    // }
};

module.exports = RealmDatabse;