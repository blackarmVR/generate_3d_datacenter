interface Hardware {
    canBeTargeted: boolean;
    blenderPlaneHeight: number;
    blenderPlaneWidth: number;
    blenderXCenter: number;
    blenderYCenter: number;
    blenderZCenter: number;
    blenderZRotation: number;
    colorStartBlue: number;
    colorStartGreen: number;
    colorStartRed: number;
    colorErrorBlue: number;
    colorErrorGreen: number;
    colorErrorRed: number;
    colorTargetBlue: number;
    colorTargetGreen: number;
    colorTargetRed: number;
    datacenter: string;
    errorMessage: string;
    name: string | null;
    rack_uuid: string;
    uuid: string;
}

/*
CREATE TABLE IF NOT EXISTS hardware (
    task_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    start_date DATE,
    due_date DATE,
    status TINYINT NOT NULL,
    priority TINYINT NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)  ENGINE=INNODB;
*/

interface Rack {
    blenderXCenter: number;
    blenderXSize: number;
    blenderYCenter: number;
    blenderYSize: number;
    blenderZCenter: number;
    blenderZSize: number;
    blenderZUnitStart: number;
    colorStartBlue: number;
    colorStartGreen: number;
    colorStartRed: number;
    colorLineRed: number;
    colorLineGreen: number;
    colorLineBlue: number;
    colorTargetBlue: number;
    colorTargetGreen: number;
    colorTargetRed: number;
    datacenter: string;
    name: string;
    rotation: number;
    uuid: string;
}

function generateRacks(datacenter: string,rowMax: number,rackMax: number){
    var countRow: number;
    var countRack: number;
    var rackName: string;
    var blenderXCenter: number;
    var blenderXSize: number;
    var blenderYCenter: number;
    var blenderYSize: number;
    var blenderZCenter: number;
    var blenderZSize: number;
    var rotation: number;
    var tempRackData: Record<string,Rack> = {};
    for (countRow = 0; countRow < rowMax; countRow++){
        for (countRack = 0; countRack < rackMax; countRack++){
            if (countRow % 2 == 0){
                rotation = 2;
            }
            else {
                rotation = 0;
            }
            rackName = "rack_" + countRow + "_" + countRack;
            blenderXCenter = (countRack * 0.62) + 0.31;
            blenderXSize = 0.6;
            blenderYCenter = (countRow * 2.4) + 0.61;
            blenderYSize = 1.2;
            blenderZCenter = 0.91;
            blenderZSize = 1.8;
            tempRackData[rackName] = {
                blenderXCenter: blenderXCenter,
                blenderXSize: blenderXSize,
                blenderYCenter: blenderYCenter,
                blenderYSize: blenderYSize,
                blenderZCenter: blenderZCenter,
                blenderZSize: blenderZSize,
                blenderZUnitStart: 0.05,
                colorStartBlue: 0.8,
                colorStartGreen: 0.8,
                colorStartRed: 0.8,
                colorLineRed: 0.2,
                colorLineGreen: 0.2,
                colorLineBlue: 0.2,
                colorTargetBlue: 0.9,
                colorTargetGreen: 0.9,
                colorTargetRed: 0.9,
                datacenter: datacenter,
                name: rackName,
                rotation: rotation,
                uuid: rackName
            }
        }
    }
    return tempRackData;
}

function generateHardware(datacenter,rackData, sledMax){
    var blenderPlaneHeight: number;
    var blenderPlaneWidth: number;
    var blenderXCenter: number;
    var blenderYCenter: number;
    var blenderZCenter: number;
    var blenderZRotation: number;
    var name: string | null;
    var planeDimensions: Record<string,number> = {};
    var rackU: number;
    var serverLoop: number;
    var sledData: Record<string,number> = {};
    var sledLoop: number;
    var tempHardwareData: Record<string,Hardware> = {};
    var unitHeight: number;
    var zStart: number;
    unitHeight = 0.0445;
    Object.keys(rackData).forEach(function(rackName){
        planeDimensions = calculateRackMounted(rackData[rackName]);
        blenderPlaneWidth = planeDimensions["blenderPlaneWidth"];
        blenderXCenter = planeDimensions["blenderXCenter"];
        blenderYCenter = planeDimensions["blenderYCenter"];
        blenderZRotation = planeDimensions["blenderZRotation"];
        zStart = rackData[rackName]["blenderZCenter"] - (rackData[rackName]["blenderZSize"] / 2) + rackData[rackName]["blenderZUnitStart"];
        // 4 unit servers
        blenderPlaneHeight = (unitHeight * 4) - 0.004;
        for (serverLoop = 0; serverLoop < 4; serverLoop++){
            name = rackData[rackName]["name"] + "_4u_" + serverLoop;
            blenderZCenter = zStart + (unitHeight * 2) + (unitHeight * serverLoop * 4);
            tempHardwareData[name] = {
                canBeTargeted: true,
                blenderPlaneHeight: blenderPlaneHeight,
                blenderPlaneWidth: blenderPlaneWidth,
                blenderXCenter: blenderXCenter,
                blenderYCenter: blenderYCenter,
                blenderZCenter: blenderZCenter,
                blenderZRotation: blenderZRotation,
                colorStartBlue: 1,
                colorStartGreen: 1,
                colorStartRed: 1,
                colorErrorBlue: 1,
                colorErrorGreen: 1,
                colorErrorRed: 1,
                colorTargetBlue: 0.9,
                colorTargetGreen: 0.9,
                colorTargetRed: 0.9,
                datacenter: datacenter,
                errorMessage: "",
                name: name,
                rack_uuid: rackData[rackName]["name"],
                uuid: name
            }
        }
        // 2 unit servers
        blenderPlaneHeight = (unitHeight * 2) - 0.004;
        for (serverLoop = 0; serverLoop < 8; serverLoop++){
            name = rackData[rackName]["name"] + "_2u_" + serverLoop;
            blenderZCenter = zStart + (unitHeight * 17) + (unitHeight * serverLoop * 2);
            tempHardwareData[name] = {
                canBeTargeted: true,
                blenderPlaneHeight: blenderPlaneHeight,
                blenderPlaneWidth: blenderPlaneWidth,
                blenderXCenter: blenderXCenter,
                blenderYCenter: blenderYCenter,
                blenderZCenter: blenderZCenter,
                blenderZRotation: blenderZRotation,
                colorStartBlue: 1,
                colorStartGreen: 1,
                colorStartRed: 1,
                colorErrorBlue: 1,
                colorErrorGreen: 1,
                colorErrorRed: 1,
                colorTargetBlue: 0.9,
                colorTargetGreen: 0.9,
                colorTargetRed: 0.9,
                datacenter: datacenter,
                errorMessage: "",
                name: name,
                rack_uuid: rackData[rackName]["name"],
                uuid: name
            }
            // sleds
            blenderPlaneHeight = (unitHeight * 2) - 0.004;
            for (sledLoop = 0; sledLoop < sledMax; sledLoop++){
                rackU = 17 + (serverLoop * 2);
                sledData = calculateChassisSled(rackData[rackName], rackU, sledLoop + 1);
                name = rackData[rackName]["name"] + "_sled_" + rackU + "_" + sledLoop;
                tempHardwareData[name] = {
                    canBeTargeted: true,
                    blenderPlaneHeight: sledData["blenderPlaneHeight"],
                    blenderPlaneWidth: sledData["blenderPlaneWidth"],
                    blenderXCenter: sledData["blenderXCenter"],
                    blenderYCenter: sledData["blenderYCenter"],
                    blenderZCenter: sledData["blenderZCenter"],
                    blenderZRotation: sledData["blenderZRotation"],
                    colorStartBlue: 1,
                    colorStartGreen: 1,
                    colorStartRed: 1,
                    colorErrorBlue: 1,
                    colorErrorGreen: 1,
                    colorErrorRed: 1,
                    colorTargetBlue: 0.9,
                    colorTargetGreen: 0.9,
                    colorTargetRed: 0.9,
                    datacenter: datacenter,
                    errorMessage: "",
                    name: name,
                    rack_uuid: rackData[rackName]["name"],
                    uuid: name
                }
            }
        }
    })
    return tempHardwareData;
}
/**
 * @function calculateRackMounted
 * @description determines the 3d position and rotate of the plane which represents hardware or empties
 * @param {string} rackSysid - the rack sys_id
 * @param {number} rackU - the unit height
 * @param {number} modelRackUnits - the vertical size of the object in units
 */
function calculateRackMounted(rack: Rack){
    var blenderPlaneWidth: number;
    var blenderXCenter: number;
    var blenderYCenter: number;
    var blenderZRotation: number;
    blenderXCenter = 0;
    blenderYCenter = 0;
    blenderPlaneWidth = 1;
    blenderZRotation = 0;
    if (rack["rotation"] % 2 == 0){
        blenderZRotation = 1.570796;
    }
    if (rack["rotation"] == 0){
        blenderXCenter = rack["blenderXCenter"];
        blenderYCenter = rack["blenderYCenter"] - (rack["blenderYSize"] * 0.5) - 0.002;
        blenderPlaneWidth = rack["blenderXSize"] * 0.8;
    }
    if (rack["rotation"] == 1){
        blenderXCenter = rack["blenderXCenter"] + (rack["blenderXSize"] * 0.5) + 0.002;
        blenderYCenter = rack["blenderYCenter"];
        blenderPlaneWidth = rack["blenderYSize"] * 0.8;
    }
    if (rack["rotation"] == 2){
        blenderXCenter = rack["blenderXCenter"];
        blenderYCenter = rack["blenderYCenter"] + (rack["blenderYSize"] * 0.5) + 0.002;
        blenderPlaneWidth = rack["blenderXSize"] * 0.8;
    }
    if (rack["rotation"] == 3){
        blenderXCenter = rack["blenderXCenter"] - (rack["blenderXSize"] * 0.5) - 0.002;
        blenderYCenter = rack["blenderYCenter"];
        blenderPlaneWidth = rack["blenderYSize"] * 0.8;
    }
    return {
        blenderPlaneWidth,
        blenderXCenter,
        blenderYCenter,
        blenderZRotation
    }
}

function calculateChassisSled(rack: Rack, rackU: number, uSlot: number){
    var blenderPlaneHeight: number;
    var blenderPlaneWidth: number;
    var rackBase: number;
    var rackMountWidth: number;
    var sledWidth: number;
    var unitHeight: number;
    var blenderXCenter: number;
    var blenderYCenter: number;
    var blenderZCenter: number;
    var blenderZRotation: number;
    unitHeight = 0.0445;
    blenderXCenter = 0;
    blenderYCenter = 0;
    blenderZCenter = 0;
    blenderPlaneWidth = 1;
    blenderPlaneHeight = 1;
    blenderZRotation = 0;
    if (rack["rotation"] % 2 == 0){
        blenderZRotation = 1.570796;
    }
    if (rack["rotation"] == 0){
        rackMountWidth = rack["blenderXSize"] * 0.8;
        sledWidth = rackMountWidth / 20;
        blenderXCenter = rack["blenderXCenter"] - (rackMountWidth * 0.5) + (sledWidth * (uSlot -1)) + (sledWidth * 0.5);
        blenderYCenter = rack["blenderYCenter"] - (rack["blenderYSize"] * 0.5) - 0.004;
        blenderPlaneWidth = sledWidth * 0.8;
    }
    if (rack["rotation"] == 1){
        rackMountWidth = rack["blenderYSize"] * 0.8;
        sledWidth = rackMountWidth / 20;
        blenderXCenter = rack["blenderXCenter"] + (rack["blenderXSize"] * 0.5) + 0.004;
        blenderYCenter = rack["blenderYCenter"] - (rackMountWidth * 0.5) + (sledWidth * (uSlot -1)) + (sledWidth * 0.5);
        blenderPlaneWidth = sledWidth * 0.8;
    }
    if (rack["rotation"] == 2){
        rackMountWidth = rack["blenderXSize"] * 0.8;
        sledWidth = rackMountWidth / 20;
        blenderXCenter = rack["blenderXCenter"] + (rackMountWidth * 0.5) - (sledWidth * (uSlot -1)) - (sledWidth * 0.5);
        blenderYCenter = rack["blenderYCenter"] + (rack["blenderYSize"] * 0.5) + 0.004;
        blenderPlaneWidth = sledWidth * 0.8;
    }
    if (rack["rotation"] == 3){
        rackMountWidth = rack["blenderYSize"] * 0.8;
        sledWidth = rackMountWidth / 20;
        blenderXCenter = rack["blenderXCenter"] - (rack["blenderXSize"] * 0.5) - 0.004;
        blenderYCenter = rack["blenderYCenter"] + (rackMountWidth * 0.5) - (sledWidth * (uSlot -1)) - (sledWidth * 0.5);
        blenderPlaneWidth = sledWidth * 0.8;
    }
    rackBase = rack["blenderZCenter"] - (rack["blenderZSize"] / 2);
    blenderZCenter = rackBase + rack["blenderZUnitStart"] + ((rackU - 1) * unitHeight) + (unitHeight * 0.5);
    blenderPlaneHeight = unitHeight * 0.8;
    return {
        blenderPlaneHeight,
        blenderPlaneWidth,
        blenderXCenter,
        blenderYCenter,
        blenderZRotation,
        blenderZCenter
    }
}


function init() {
    container = document.createElement( 'div' );
    document.body.appendChild( container );
    // @ts-ignore
    scene = new THREE.Scene();
    // @ts-ignore
    scene.background = new THREE.Color( 0x808080 );
    // camera
    // @ts-ignore
    camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 0.1, 1000 );
    camera.position.y = 1.6;
    // light
    // @ts-ignore
    scene.add(new THREE.AmbientLight(0xffffff));
    // renderer
    // @ts-ignore
    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    // @ts-ignore
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.shadowMap.enabled = true;
    renderer.xr.enabled = true;
    container.appendChild( renderer.domElement );
    // vr button
    // @ts-ignore
    document.body.appendChild( VRButton.createButton( renderer ) );
    // controllers
    controller1 = renderer.xr.getController( 0 );
    scene.add( controller1 );
    controller2 = renderer.xr.getController( 1 );
    scene.add( controller2 );
    // @ts-ignore
    const controllerModelFactory = new XRControllerModelFactory();
    // @ts-ignore
    const handModelFactory = new XRHandModelFactory().setPath( "./models/fbx/" );
    // Hand 1
    controllerGrip1 = renderer.xr.getControllerGrip( 0 );
    controllerGrip1.add( controllerModelFactory.createControllerModel( controllerGrip1 ) );
    scene.add( controllerGrip1 );
    hand1 = renderer.xr.getHand( 0 );
    hand1.add( handModelFactory.createHandModel( hand1 ) );
    scene.add( hand1 );
    // Hand 2
    controllerGrip2 = renderer.xr.getControllerGrip( 1 );
    controllerGrip2.add( controllerModelFactory.createControllerModel( controllerGrip2 ) );
    scene.add( controllerGrip2 );
    hand2 = renderer.xr.getHand( 1 );
    hand2.add( handModelFactory.createHandModel( hand2 ) );
    scene.add( hand2 );
    // lines from controllers
    // @ts-ignore
    const geometry = new THREE.BufferGeometry().setFromPoints( [ new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, 0, -1 ) ] );
    // @ts-ignore
    const line = new THREE.Line( geometry );
    line.name = 'line';
    line.scale.z = 10;
    controller1.add( line.clone() );
    controller2.add( line.clone() );
    // xyz axis
    // 1.8 meter tall axeshelper
    // @ts-ignore
    var axesHelper = new THREE.AxesHelper(0.3);
    scene.add( axesHelper );
    // resize window
    window.addEventListener( 'resize', onWindowResize );
    // Create player object
    // @ts-ignore
    player = new THREE.Object3D();
    // rotate to face between threeX and threeZ
    player.rotation.y = Math.PI * -0.75;
    player.position.x = -1;
    player.position.z = -1;
    scene.add(player);
    const playerObjects = [
        camera,
        controller1,
        controller2,
        controllerGrip1,
        controllerGrip2,
        hand1,
        hand2
    ];
    playerObjects.forEach((object) => player.add(object));
}
function buildRacks(rackData) {
    var block = {};
    Object.keys(rackData).forEach(function(rackName){
        addCuboid(rackData[rackName]);
    })
}

function addCuboid(rack){
    var edges;
    var geometry;
    var line;
    var material;
    var mesh;
    // @ts-ignore
    geometry = new THREE.BoxGeometry(rack["blenderYSize"], rack["blenderZSize"], rack["blenderXSize"]);
    // @ts-ignore
    material = new THREE.MeshStandardMaterial();
    material.color.setRGB(rack["colorStartRed"], rack["colorStartGreen"], rack["colorStartBlue"]);
    // @ts-ignore
    mesh = new THREE.Mesh(geometry, material);
    /*
    mesh.position.x = rack["blenderXCenter"];
    mesh.position.y = rack["blenderYCenter"];
    mesh.position.z = rack["blenderZCenter"];
    */
    mesh.position.x = rack["blenderYCenter"];
    mesh.position.y = rack["blenderZCenter"];
    mesh.position.z = rack["blenderXCenter"];
    mesh.name = rack["name"];
    scene.add(mesh);
    // @ts-ignore
    edges = new THREE.EdgesGeometry(geometry);
    // @ts-ignore
    material = new THREE.LineBasicMaterial();
    material.color.setRGB(rack["colorLineRed"], rack["colorLineRed"], rack["colorLineRed"]);
    // @ts-ignore
    line = new THREE.LineSegments(edges, material);
    mesh.add(line);
}

function buildHardware(hardwareData){
    var plane = {};
    Object.keys(hardwareData).forEach(function(hardwareName){
        addPlane(hardwareData[hardwareName]);
    })
}

 function addPlane(plane){
    var geometry;
    var material;
    var mesh;
    // @ts-ignore
    geometry = new THREE.PlaneGeometry(plane["blenderPlaneWidth"], plane["blenderPlaneHeight"]);
    // @ts-ignore
    material = new THREE.MeshStandardMaterial({side: THREE.DoubleSide});
    material.color.setRGB(plane["colorStartRed"],plane["colorStartGreen"],plane["colorStartBlue"]);
    // @ts-ignore
    mesh = new THREE.Mesh(geometry,material);
    mesh.position.x = plane["blenderYCenter"];
    mesh.position.y = plane["blenderZCenter"];
    mesh.position.z = plane["blenderXCenter"];
    mesh.rotation.y = plane["blenderZRotation"];
    mesh.name = plane["name"];
    scene.add(mesh);
    // @ts-ignore
    const edges = new THREE.EdgesGeometry( geometry );
    // @ts-ignore
    const line = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: 0x000000} ) );
    line.position.x = plane["blenderYCenter"];
    line.position.y = plane["blenderZCenter"];
    line.position.z = plane["blenderXCenter"];
    line.rotation.y = plane["blenderZRotation"];
    scene.add( line );
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    renderer.setAnimationLoop(render);
}

function render() {
    const session = renderer.xr.getSession();
    // check if the session exists
    if (session) {
        const sources = session.inputSources;
        // check if the session has input sources
        if (sources){
            const controllerZero = sources[0];
            // check that input source zero exists
            if (controllerZero){
                const gamepad = controllerZero.gamepad;
                // check that input source zero has a gamepad
                if (gamepad){
                    const axes = gamepad.axes;
                    // check that gamepad has axes
                    if (axes){
                        // rotate
                        if (axes[2] < -0.8 && turnEnabled == true){
                            player.rotation.y += Math.PI * 0.25;
                            turnEnabled = false;
                        }
                        if (axes[2] > 0.8 && turnEnabled == true){
                            player.rotation.y -= Math.PI * 0.25;
                            turnEnabled = false;
                        }
                        if (axes[2] > -0.2 && axes[2] < 0.2){
                            turnEnabled = true;
                        }
                        //player.rotation.y += axes[2] * -0.01;
                        // up/down
                        //if (axes.length > 5){
                        //    player.position.z = 5;
                        //}
                        /*
                        if (axes[0] != 0){
                            //player.position.z = axes[0] * 2;
                        }
                        if (axes[1] != 0){
                            //player.position.z = axes[1] * 2;
                        }
                        if (axes[2] != 0){
                            */
                            /*
                        }
                        if (axes[3] != 0){
                            //player.position.z = axes[3] * 2;
                        }
                        */
                    }
                }
            }
        }
    }
    //player.position.x = (performance.now() % 40000) / 40000 * 22;
    renderer.render(scene, camera);
}

// globals
var turnEnabled = true;
let container;
let camera, scene, renderer;
let hand1, hand2;
let controller1, controller2;
let controllerGrip1, controllerGrip2;
let player;
var rackData: Record<string,Rack> = {};
var hardwareData: Record<string,Hardware> = {};
var datacenter: string;
var rowMax: number;
var rackMax: number;
var sledMax: number;
datacenter = "test_a2sa";
rowMax = 4;
rackMax = 10;
sledMax = 4;
rackData = generateRacks(datacenter,rowMax,rackMax);
hardwareData = generateHardware(datacenter,rackData,sledMax);

init();
buildRacks(rackData);
buildHardware(hardwareData);
animate();