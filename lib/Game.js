const inquirer = require("inquirer");
const Enemy = require("./Enemy");
const Player = require("./Player");

function Game() {
    this.roundNumber = 0;
    this.isPlayerTurn = false;
    this.enemies = [];
    this.currentEnemy;
    this.player;
}

Game.prototype.battle = function() {

    if (this.isPlayerTurn) {
        inquirer
            .prompt({
                type: "list",
                message: "What would you like to do?",
                name: "action",
                choices: ["Attack", "Use Potion"]

            })
            .then(({action}) => {
                if (action === "Use Potion") {
                    if (!this.player.getInventory()) {
                        console.log("You don't have any potions!");
                        return;
                    }
                    else {
                        inquirer.prompt({
                            type: "list",
                            message: "Which potion would you like to use?",
                            name: "action",
                            choices: this.player.getInventory().map((item, index) => `${index + 1}: ${item.name}`)
                        })
                        .then(({ action }) => {
                            const potionDetails = action.split(': ');

                            this.player.usePotion(potionDetails[0] - 1);
                            console.log(`You used a ${potionDetails[1]} potion.`);
                        });
                    }
                }
                else {
                    const damage = this.player.getAttackValue();
                    this.currentEnemy.reduceHealth(damage);

                    console.log(`You dealt ${damage} damage to the ${this.currentEnemy.name}!`);
                    console.log(this.currentEnemy.getHealth());
                }
            });
    }
    else {
        const damage = this.currentEnemy.getAttackValue()
        this.player.reduceHealth(damage);

        console.log(`The ${this.currentEnemy.name} attacked you and dealt ${damage} damage.`);
        console.log(`Your health is now ${this.player.getHealth()}`);
    }
}

Game.prototype.startNewBattle = function() {
    if (this.player.agility > this.currentEnemy.agility) {
        this.isPlayerTurn = true;
    }
    else {
        this.isPlayerTurn = false;
    }

    console.log("Your stats are:");
    console.table(this.player.getStats());
    console.log(this.currentEnemy.getDescription());

    this.battle();
};

Game.prototype.initializeGame = function() {
    this.enemies.push(new Enemy("goblin", "sword"));
    this.enemies.push(new Enemy("orc", "mace"));
    this.enemies.push(new Enemy("skeleton", "axe"));

    this.currentEnemy = this.enemies[0];

    inquirer
        .prompt({
            type: "text",
            name: "name",
            message: "What is your name?"
        })
        .then(({name}) => {
            this.player = new Player(name);
            this.startNewBattle();
        });
}

module.exports = Game;