const expect = require('expect');
const {Users} = require('./users');

describe('Users', () => {

        beforeEach(() => {
            users = new Users();
            users.users =[{
                id: '1',
                name: 'Tom',
                room: 'pauls house'
            }, {
                id: '2',
                name: 'Paul',
                room: 'Toms house'
            }, {
                id: '3',
                name: 'Meem',
                room: 'pauls house'
            } ]
        });

    it ('should add new user', () => {
        let users = new Users();
        let newUser = {
            id: '1234458687',
            name: 'testdummy',
            room: 'testroom'
        };
        let resUser = users.addUser(newUser.id, newUser.name, newUser.room);
        expect(users.users).toEqual([newUser])
    });

    it ('should return names for the room pauls house', () => {
        let userList = users.getUserList('pauls house');

        expect(userList).toEqual(['Tom', 'Meem']);
    })

    it ('should return names for the room Toms house', () => {
        let userList = users.getUserList('Toms house');

        expect(userList).toEqual(['Paul']);
    })

    it ('should remove a user', () => {
        let userList = users.removeUser('2');
        expect(userList).toBe(users.users[2]);
        expect(users.users.length).toEqual(2);
    })

    it ('should not remove a user', () => {
        let userList = users.removeUser('4');
        expect(userList).toNotExist();
        expect(users.users.length).toEqual(3);
    })

    it ('should find user', () => {
        let userList = users.getUser('3');
        expect(userList.id).toEqual(users.users[2].id)
    })

    it ('should not find user', () => {
        let userList = users.getUser('69');
        expect(userList).toNotExist();
    })
});