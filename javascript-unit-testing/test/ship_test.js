var expect = require('chai').expect;

describe("check for ship", function () {
    var checkForShip = require("../game_logic/ship_methods").checkForShip;
    var player;
    before(function(){
        player = {
            ships: [
                {
                    locations:
                        [[0, 0],[0, 1]]
                },
                {
                    locations:
                        [[1, 0],[1, 1]]
                },
                {
                    locations:
                        [[1, 0],[1, 1],[2,0],[2,1],[2,2],[2,3]]
                }
            ]
        }
    })
    it("should correctly report no ship at a given player's coordinate", function () {
      
        expect(checkForShip(player, [9, 9])).to.be.false;
    });
    it("should correctly report  ship at a given  coordinate", function () {
    
        expect(checkForShip(player, [0, 0])).to.deep.equal(player.ships[0]);
    });
    it("should handle ships located at more than one coordinate", function () {
     
        expect(checkForShip(player, [0, 1])).to.deep.equal(player.ships[0]);
        expect(checkForShip(player, [0, 0])).to.deep.equal(player.ships[0]);
        expect(checkForShip(player, [9, 9])).to.be.false;

    });
    it("should handle multiple ships", function () {
   
        expect(checkForShip(player, [0, 1])).to.deep.equal(player.ships[0]);
        expect(checkForShip(player, [0, 0])).to.deep.equal(player.ships[0]);
        expect(checkForShip(player, [1, 0])).to.deep.equal(player.ships[1]);
        expect(checkForShip(player, [1, 1])).to.deep.equal(player.ships[1]);
        expect(checkForShip(player, [2, 3])).to.deep.equal(player.ships[2]);
        expect(checkForShip(player, [9, 9])).to.be.false;

    });
})

describe("check damage ship",function(){
    var damageShip = require("../game_logic/ship_methods").damageShip;
    it("should register damage at given ship at given location",function(){
        var ship={
            location:[[0,0]],
            damage:[]
        }
        damageShip(ship,[0,0])
        expect(ship.damage).to.not.be.empty;
        expect(ship.damage[0]).to.deep.equal([0,0]);

    })
});

describe('fire' , function(){
    var fire=require("../game_logic/ship_methods").fire;
    var player;
// befor each test suite firing player will be overridden with these below value and do not change the state of our application
    beforeEach(function(){
        player={
            ships:[
                {locations:[[0,0]],
                damage:[]
                 }
            ]
        }
    });
    after(function(){
        console.log('entire test suite completed testing')
    })
    afterEach(function(){
        console.log('1 unit test  is completed')
    })
    it('should record damage on a given player ship at a given coordinate', function(){

        fire(player,[0,0]);
        expect(player.ships[0].damage[0]).to.deep.equal([0,0])
    });

    it('should not record damage if no ship at a given coordinate', function(){
     
        fire(player,[9,9]);
        expect(player.ships[0].damage).to.be.empty;
    })
})
//CASE1-placing order and save that order to db
//1.1 Confirmation email of that order  {Sinon.js to be explored}
//1.2 While placing order you are calling external service which is checking if item is in stock or not.

//CASE2-Deal with Time basis for order ex. order status etc.