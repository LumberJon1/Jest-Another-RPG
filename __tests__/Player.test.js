const Player = require("../lib/Player");
const Potion = require("../lib/Potion");

jest.mock("../lib/Potion");

test("Creates a player object", function() {
    const player = new Player("Dave");

    expect(player.name).toBe("Dave");
    expect(player.health).toEqual(expect.any(Number));
    expect(player.strength).toEqual(expect.any(Number));
    expect(player.agility).toEqual(expect.any(Number));

    expect(player.inventory).toEqual(
        expect.arrayContaining([expect.any(Object)])
    );
});

test("Gets player's stats as an object", () => {
    const player = new Player("Dan");

    expect(player.getStats()).toHaveProperty("potions");
    expect(player.getStats()).toHaveProperty("health");
    expect(player.getStats()).toHaveProperty("strength");
    expect(player.getStats()).toHaveProperty("agility");
});

test("Gets inventory from player or returns false", () => {
    const player = new Player("Julio");

    expect(player.getInventory()).toEqual(expect.any(Array));

    player.inventory = [];

    expect(player.getInventory()).toEqual(false);
});

test("Gets player health value", function() {
    const player = new Player("Saruman");

    expect(player.getHealth()).toEqual(expect.stringContaining(player.health.toString()));
});

test("Checks whether the player is alive", function() {
    const player = new Player("Gandalf");

    expect(player.isAlive()).toBeTruthy();

    player.health = 0;

    expect(player.isAlive()).toBeFalsy();
});

test("Subtracts from player's health", () => {
    const player = new Player("Aragorn");
    const oldHealth = player.health;

    player.reduceHealth(5);

    expect(player.health).toEqual(oldHealth - 5);

    player.reduceHealth(9999);

    expect(player.health).toBe(0);
});

test("Gets the player's attack value", function() {
    const player = new Player("Gollum");
    player.strength = 10;

    expect(player.getAttackValue()).toBeGreaterThanOrEqual(5);
    expect(player.getAttackValue()).toBeLessThanOrEqual(15);
});

test("Adds a potion to the inventory", function() {
    const player = new Player("Frodo");
    const oldCount = player.inventory.length;

    player.addPotion(new Potion());

    expect(player.inventory.length).toBeGreaterThan(oldCount);
});

test("Removes a potion from the player's inventory", () => {
    const player = new Player("Bilbo");
    player.inventory = [new Potion(), new Potion(), new Potion()];
    const oldCount = player.inventory.length;

    player.usePotion(1);

    expect(player.inventory.length).toBeLessThan(oldCount);
});

