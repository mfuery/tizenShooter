/**
 *
 */

/*global $: false, tizen: false, navigator: false, app: true*/

var Game = {
	gameWidth: 0,
	gameHeight: 0,
	backgroundWidth: 0,
	backgroundHeight: 0,
	backgroundTop: 0,
	backgroundLeft: 0,

	resistance: 0.98, // air
	friction: 0.90, // bounce
	sideFriction: 0.95,
	frictionC: 0.002,
	repulse: 0.6,
	cdd: -0.3,

	timeout: null,
	event: null,
	animationInterval: 40,

    start: function() {
        Game.canvas = document.getElementById("renderCanvas");
        Game.engine = new BABYLON.Engine(Game.canvas, true);
        Game.scene = new BABYLON.Scene(Game.engine);
        Game.sphere = BABYLON.Mesh.CreateSphere("sphere", 16, 1, Game.scene);
        Game.light = new BABYLON.PointLight("light01", new BABYLON.Vector3(0, 3, -2), Game.scene);
        Game.camera = new BABYLON.FreeCamera("camera01", new BABYLON.Vector3(0, 3, -2), Game.scene);

        Game.camera.setTarget(new BABYLON.Vector3(0, 0, 0));
        Game.camera.attachControl(Game.canvas);

        // Render
        Game.engine.runRenderLoop(Game.render);
    },

    render: function() {
        Game.scene.render();
    }
};

$(document).ready(function () {
	"use strict";
	Game.gameWidth = screen.availWidth;

    if (!BABYLON.Engine.isSupported()) {
        console.log('You are SOL.');
    }

    $(window).on('tizenhwkey', function (e) {
		if (e.originalEvent.keyName === "back") {
			tizen.application.getCurrentApplication().exit();
		}
	});

	document.addEventListener('webkitvisibilitychange', function (event) {
		if (document.webkitVisibilityState === 'visible') {
			Game.start();
		}
	});

    Game.start();
});

$(window).resize(function () {
	'use strict';
    Game.gameWidth = screen.availWidth;
    Game.gameHeight = screen.availHeight;
});
