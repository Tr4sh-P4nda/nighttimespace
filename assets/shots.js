var images = ["assets/glow.png","assets/tube.png","assets/lit.png"];	//add path if nessessary
var frame = 0;
var repeats = 0;
var shots_1 = new THREE.Group;
var shots_2 = new THREE.Group;
var shots_3 = new THREE.Group;
var color1 = new THREE.Color;
var color2 = new THREE.Color;
var color3 = new THREE.Color;
var shotsAudio = new NativeComponent('n-sound', {
	src: "assets/shots.ogg",
	volume: 0.5,
	minDistance: 1,
	maxDistance: 50,
	rolloff: "cosine"
}).addTo(shots_2);

firebase.initializeApp({databaseURL: "https://shots-24faf.firebaseio.com/"});

altspace.getSpace().then(function(space){
	shotDB = firebase.database().ref(space.sid);
	altspace.getUser().then(function(user){
		isMod = user.isModerator;
	});
});

function shotsSet(){
	var color0 = new THREE.Color(0, 0, 0);
	this.color1 = color1;
	this.color2 = color2;
	this.color3 = color3;
	this.sign1 = shots_1;
	this.sign2 = shots_2;
	this.sign3 = shots_3;
	
	UltimateLoader.loadImagesOnPlane = true;
	UltimateLoader.imageSize = 1;
	UltimateLoader.multiload(images, function(plane){
		plane[0].material.transparent = true;
		plane[1].material.transparent = true;
		plane[2].material.transparent = true;
		plane[1].position.z = 0.03;
		plane[2].position.z = 0.03;
		glow_1 = plane[0];
		tube_1 = plane[1];	
		lit_1 = plane[2];
		glow_2 = plane[0].clone();
		glow_2.material = plane[0].material.clone();
		glow_3 = plane[0].clone();
		glow_3.material = plane[0].material.clone();
		tube_2 = plane[1].clone();
		tube_2.material = plane[1].material.clone();
		tube_3 = plane[1].clone();
		tube_3.material = plane[1].material.clone();
		lit_2 = plane[2].clone();
		lit_2.material = plane[2].material.clone();
		lit_3 = plane[2].clone();
		lit_3.material = plane[2].material.clone();
		lit_1.material.color = color1;
		lit_2.material.color = color2;
		lit_3.material.color = color3;
		glow_1.material.color = color1;
		glow_2.material.color = color2;
		glow_3.material.color = color3;
		tube_1.visible = false;
		tube_2.visible = false;
		tube_3.visible = false;
		shots_1.add(glow_1, tube_1, lit_1)
		shots_2.add(glow_2, tube_2, lit_2);
		shots_3.add(glow_3, tube_3, lit_3);
		
		function turnOff(){
			shotDB.set("stop")
		};
		
		shotDB.on("value", function(snapshot){
			value = snapshot.val(); 
			if(!value)return;
			if(value == "playWithSound"){
				doShots();
				shotsAudio.call("play");
				setTimeout(turnOff, 8000);
			};
			if(value == "play"){
				doShots();
				setTimeout(turnOff, 8000);
			};
		});

		shots_1.addEventListener("cursorup", function(){
			shotDB.once("value", function(val){
				value = val.val();}
			);
			if(!value || value == "stop"){
				if(isMod){
					shotDB.set("playWithSound");
				}else{
					shotDB.set("play");
				};
			};
		});
		shots_2.addEventListener("cursorup", function(){
			shotDB.once("value", function(val){
				value = val.val();}
			);
			if(!value || value == "stop"){
				if(isMod){
					shotDB.set("playWithSound");
				}else{
					shotDB.set("play");
				};
			};
		});
		shots_3.addEventListener("cursorup", function(){
			shotDB.once("value", function(val){
				value = val.val();}
			);
			if(!value || value == "stop"){
				if(isMod){
					shotDB.set("playWithSound");
				}else{
					shotDB.set("play");
				};
			};
		});

		function doShots(){
			timer = Date.now();
			if(frame == 0){
				loopstart = Date.now();
				frame=1;
			};
			if(frame == 1){
				glow_1.material.color = color1;
				glow_2.material.color = color0;
				glow_3.material.color = color0;
				onOrOff = [0, 1, 1, 1, 0, 0];
				if(timer >= loopstart+380)frame=2;
			}else if(frame == 2){
				glow_1.material.color = color0;
				glow_2.material.color = color0;
				glow_3.material.color = color0;
				onOrOff = [1, 1, 1, 0, 0, 0];
				if(timer >= loopstart+480)frame=3;
			}else if(frame == 3){
				glow_2.material.color = color2;
				onOrOff = [1, 0, 1, 0, 1, 0];
				if(timer >= loopstart+850)frame=4;
			}else if(frame == 4){
				glow_1.material.color = color0;
				glow_2.material.color = color0;
				glow_3.material.color = color0;
				onOrOff = [1, 1, 1, 0, 0, 0];
				if(timer >= loopstart+950)frame=5;
			}else if(frame == 5){
				glow_3.material.color = color3;
				onOrOff = [1, 1, 0, 0, 0, 1];
				if(timer >= loopstart+1200)frame=6;
			}else if(frame == 6){
				glow_1.material.color = color0;
				glow_2.material.color = color0;
				glow_3.material.color = color0;
				onOrOff = [1, 1, 1, 0, 0, 0];
				if(timer >= loopstart+1300)frame=7;
			}else if(frame == 7){
				glow_1.material.color = color1;
				glow_2.material.color = color2;
				glow_3.material.color = color3;
				onOrOff = [0, 0, 0, 1, 1, 1];
				if(timer >= loopstart+1552)frame=8;
			}else if(frame == 8){
				glow_1.material.color = color0;
				glow_2.material.color = color0;
				glow_3.material.color = color0;
				onOrOff = [1, 1, 1, 0, 0, 0];
				if(timer >= loopstart+1652)frame=9;
			}else if(frame == 9){
				glow_1.material.color = color1;
				glow_2.material.color = color2;
				glow_3.material.color = color3;
				onOrOff = [0, 0, 0, 1, 1, 1];
				if(timer >= loopstart+1767)frame=10;
			}else if(frame == 10){
				glow_1.material.color = color0;
				glow_2.material.color = color0;
				glow_3.material.color = color0;
				onOrOff = [1, 1, 1, 0, 0, 0];
				if(timer >= loopstart+1867)frame=11;
			}else if(frame == 11){frame=0;
				repeats++;
			};
			if(repeats < 3)requestAnimationFrame(doShots);
			
			else{
				glow_1.material.color = color1;
				glow_2.material.color = color2;
				glow_3.material.color = color3;
				onOrOff = [0, 0, 0, 1, 1, 1];
				repeats = 0;
			};
			tube_1.visible = onOrOff[0];
			tube_2.visible = onOrOff[1];
			tube_3.visible = onOrOff[2];
			lit_1.visible = onOrOff[3];
			lit_2.visible = onOrOff[4];
			lit_3.visible = onOrOff[5];
			
			if(repeats == 0)return;
		};
	});
};