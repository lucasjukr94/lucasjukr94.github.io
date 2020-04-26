var canvas = document.getElementById("renderCanvas"); // Get the canvas element
var engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine

function spinTo(camera,whichprop, targetval, speed) {
    var ease = new BABYLON.CubicEase();
    ease.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);
	BABYLON.Animation.CreateAndStartAnimation('at4', camera, whichprop, speed, 120, camera[whichprop], targetval, 0, ease);
}

var sceneGlobal;

var box1;
var box2;
var box3;
var box4;

/******* Add the create scene function ******/
var createScene = function () {

	// Create the scene space
	var scene = new BABYLON.Scene(engine);
	sceneGlobal = scene;

	// Add a camera to the scene and attach it to the canvas
	var camera = new BABYLON.FollowCamera("Camera", new BABYLON.Vector3(0,10,90), scene);
	camera.attachControl(canvas, true);

	// Add lights to the scene
	var light1 = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 1, 0), scene);

	box1 = BABYLON.MeshBuilder.CreateBox("box1", {height: 2, width: 2, depth: 2}, scene);
	box2 = BABYLON.MeshBuilder.CreateBox("box2", {height: 2, width: 2, depth: 2}, scene);
	box3 = BABYLON.MeshBuilder.CreateBox("box3", {height: 2, width: 2, depth: 2}, scene);
	box4 = BABYLON.MeshBuilder.CreateBox("box4", {height: 2, width: 2, depth: 2}, scene);

	box1.position = new BABYLON.Vector3(0,0,0);
	box2.position = new BABYLON.Vector3(2.5,0,0);
	box3.position = new BABYLON.Vector3(5,0,0);
	box4.position = new BABYLON.Vector3(7.5,0,0);
	
	box1.material = new BABYLON.StandardMaterial("matBox1", scene);
	box2.material = new BABYLON.StandardMaterial("matBox2", scene);
	box3.material = new BABYLON.StandardMaterial("matBox3", scene);
	box4.material = new BABYLON.StandardMaterial("matBox4", scene);
	
	box1.material.emissiveColor = new BABYLON.Color3(1, 1, 0);
	box2.material.emissiveColor = new BABYLON.Color3(0, 0, 1);
	box3.material.emissiveColor = new BABYLON.Color3(0, 1, 0);
	box4.material.emissiveColor = new BABYLON.Color3(1, 0, 0);

	var rect1 = BABYLON.MeshBuilder.CreateBox("rect1", {height: 45, width: 2, depth: 0.5}, scene);
	var rect2 = BABYLON.MeshBuilder.CreateBox("rect2", {height: 45, width: 2, depth: 0.5}, scene);
	var rect3 = BABYLON.MeshBuilder.CreateBox("rect3", {height: 45, width: 2, depth: 0.5}, scene);
	var rect4 = BABYLON.MeshBuilder.CreateBox("rect4", {height: 45, width: 2, depth: 0.5}, scene);

	rect1.position = new BABYLON.Vector3(0,18,-2);
	rect2.position = new BABYLON.Vector3(2.5,18,-2);
	rect3.position = new BABYLON.Vector3(5,18,-2);
	rect4.position = new BABYLON.Vector3(7.5,18,-2);

	var box5 = BABYLON.MeshBuilder.CreateBox("box5", {height: 2, width: 9.5, depth: 2}, scene);
	box5.position = new BABYLON.Vector3(3.8,-5,0);

	var cameraFocus = BABYLON.MeshBuilder.CreateBox("cameraFocus", {height: 0.1, width: 0.1, depth: 0.1}, scene);
	cameraFocus.position = new BABYLON.Vector3(0,15,0);

	camera.lockedTarget = cameraFocus;
	
    setTimeout(()=>spinTo(camera,"radius", 70, 300), 1000);

	return scene;
};
/******* End of the create scene function ******/

var index = 0;
const startY = 40;
function generateRandomFallingSphere(scene){
	var sphere = BABYLON.MeshBuilder.CreateSphere("sphere"+index, {diameter:2}, scene);
	sphere.material = new BABYLON.StandardMaterial("mat"+index, scene);
	
	var rand = Math.floor(Math.random() * 10);
	rand = rand % 4;
	if(rand == 0){//v
		sphere.position = new BABYLON.Vector3(0, startY, 0);
		sphere.material.emissiveColor = new BABYLON.Color3(1, 1, 0);
	}else if(rand == 1){//c
		sphere.position = new BABYLON.Vector3(2.5, startY, 0);
		sphere.material.emissiveColor = new BABYLON.Color3(0, 0, 1);
	}else if(rand == 2){//x
		sphere.position = new BABYLON.Vector3(5, startY, 0);
		sphere.material.emissiveColor = new BABYLON.Color3(0, 1, 0);
	}else{//z
		sphere.position = new BABYLON.Vector3(7.5, startY, 0);
		sphere.material.emissiveColor = new BABYLON.Color3(1, 0, 0);
	}
	
	scene.registerBeforeRender(function () {
		sphere.position.y -= 0.3;
		
		if(sphere.position.y < -5){
			sphere.dispose();
			combo = 0;
			$("#painel").html("Points: "+acertos+"<br/>Combo: x"+combo);
		}
		
		// verificaAcerto(sphere, rand);
		verificaAcertoIntersectsMesh(sphere, rand);
	});
}

function verificaAcertoIntersectsMesh(sphere, rand){
	if(rand == 0){//v
		if(sphere.intersectsMesh(box1, true) && keys.v){
			acertos += 1;
			combo += 1;
			sphere.dispose();
			sphere = undefined;
			$("#painel").html("Points: "+acertos+"<br/>Combo: x"+combo);
		}
	}else if(rand == 1){//c
		if(sphere.intersectsMesh(box2, true) && keys.c){
			acertos += 1;
			combo += 1;
			sphere.dispose();
			sphere = undefined;
			$("#painel").html("Points: "+acertos+"<br/>Combo: x"+combo);
		}
	}else if(rand == 2){//x
		if(sphere.intersectsMesh(box3, true) && keys.x){
			acertos += 1;
			combo += 1;
			sphere.dispose();
			sphere = undefined;
			$("#painel").html("Points: "+acertos+"<br/>Combo: x"+combo);
		}
	}else{//z
		if(sphere.intersectsMesh(box4, true) && keys.z){
			acertos += 1;
			combo += 1;
			sphere.dispose();
			sphere = undefined;
			$("#painel").html("Points: "+acertos+"<br/>Combo: x"+combo);
		}
	}
}

function verificaAcerto(sphere, rand){
	if(rand == 0){//v
		if(sphere.position.y > 2 && keys.v){
			combo = 0;
			sphere.dispose();
			$("#painel").html("Acertos: "+acertos+"<br/>Combo: x"+combo);
		}else if((sphere.position.y <= 2 && sphere.position.y >= 0) && keys.v){
			acertos += 1;
			combo += 1;
			sphere.dispose();
			$("#painel").html("Acertos: "+acertos+"<br/>Combo: x"+combo);
		}
	}else if(rand == 1){//c
		if(sphere.position.y > 2 && keys.c){
			combo = 0;
			sphere.dispose();
			$("#painel").html("Acertos: "+acertos+"<br/>Combo: x"+combo);
		}else if((sphere.position.y <= 2 && sphere.position.y >= 0) && keys.c){
			acertos += 1;
			combo += 1;
			sphere.dispose();
			$("#painel").html("Acertos: "+acertos+"<br/>Combo: x"+combo);
		}
	}else if(rand == 2){//x
		if(sphere.position.y > 2 && keys.x){
			combo = 0;
			sphere.dispose();
			$("#painel").html("Acertos: "+acertos+"<br/>Combo: x"+combo);
		}else if((sphere.position.y <= 2 && sphere.position.y >= 0) && keys.x){
			acertos += 1;
			combo += 1;
			sphere.dispose();
			$("#painel").html("Acertos: "+acertos+"<br/>Combo: x"+combo);
		}
	}else{//z
		if(sphere.position.y > 2 && keys.z){
			combo = 0;
			sphere.dispose();
			$("#painel").html("Acertos: "+acertos+"<br/>Combo: x"+combo);
		}else if((sphere.position.y <= 2 && sphere.position.y >= 0) && keys.z){
			acertos += 1;
			combo += 1;
			sphere.dispose();
			$("#painel").html("Acertos: "+acertos+"<br/>Combo: x"+combo);
		}
	}
}

var light1;
var light2;
var light3;
var light4;
function turnLightOn(scene){
	const intensity = 0.2;
	if(keys.z){
		if(light1 == undefined){
			light1 = new BABYLON.PointLight("light1", new BABYLON.Vector3(7.5, 0, 1), scene);
			light1.diffuse = new BABYLON.Color3(1, 0, 0);
			light1.intensity = intensity;
		}
	}else{
		if(light1 != undefined){
			light1.dispose();
			light1 = undefined;
		}
	}
	
	if(keys.x){
		if(light2 == undefined){
			light2 = new BABYLON.PointLight("light2", new BABYLON.Vector3(5, 0, 1), scene);
			light2.diffuse = new BABYLON.Color3(0, 1, 0);
			light2.intensity = intensity;
		}
	}else{
		if(light2 != undefined){
			light2.dispose();
			light2 = undefined;
		}
	}
	
	if(keys.c){
		if(light3 == undefined){
			light3 = new BABYLON.PointLight("light3", new BABYLON.Vector3(2.5, 0, 1), scene);
			light3.diffuse = new BABYLON.Color3(0, 0, 1);
			light3.intensity = intensity;
		}
	}else{
		if(light3 != undefined){
			light3.dispose();
			light3 = undefined;
		}
	}
	
	if(keys.v){
		if(light4 == undefined){
			light4 = new BABYLON.PointLight("light4", new BABYLON.Vector3(0, 0, 1), scene);
			light4.diffuse = new BABYLON.Color3(1, 1, 0);
			light4.intensity = intensity;
		}
	}else{
		if(light4 != undefined){
			light4.dispose();
			light4 = undefined;
		}
	}
}

var acertos = 0;
var combo = 0;
var modo = 0;
$(document).ready(function(){
	$("#start").click(function(){
		$("#divModo").hide();
		modo = $("#modo").val();
		beginGame();
	});
});

function beginGame(){
	setTimeout(function(){
		$("#contagem").html("3");
	},1000);
	setTimeout(function(){
		$("#contagem").html("2");
	},2000);
	setTimeout(function(){
		$("#contagem").html("1");
	},3000);
	setTimeout(function(){
		$("#contagem").html("GO");
		$("#painel").show("slow");
	},4000);
	setTimeout(function(){
		$("#contagem").remove();
		setInterval(function(){
			try{
				if(modo == 0){
					generateRandomFallingSphere(scene);
				}else if(modo == 1){
					generateRandomFallingSphere(scene);
					generateRandomFallingSphere(scene);
				}else if(modo == 2){
					generateRandomFallingSphere(scene);
					generateRandomFallingSphere(scene);
					generateRandomFallingSphere(scene);
				}
			}catch(e){
				console.log(e);
			}
		},300);	
	},5000);
	
	$(document).keyup(function(e){
		if(e.key == "z"){
			keys.z = false;
		}else if(e.key == "x"){
			keys.x = false;
		}else if(e.key == "c"){
			keys.c = false;
		}else if(e.key == "v"){
			keys.v = false;
		}
		turnLightOn(scene);
	});
	
	$(document).keydown(function(e){
		if(e.key == "z"){
			keys.z = true;
		}else if(e.key == "x"){
			keys.x = true;
		}else if(e.key == "c"){
			keys.c = true;
		}else if(e.key == "v"){
			keys.v = true;
		}
		turnLightOn(scene);
	});
}

var scene = createScene(); //Call the createScene function

var keys = {
	z:false,
	x:false,
	c:false,
	v:false
}

// Register a render loop to repeatedly render the scene
engine.runRenderLoop(function () {
		scene.render();
});

// Watch for browser/canvas resize events
window.addEventListener("resize", function () {
		engine.resize();
});