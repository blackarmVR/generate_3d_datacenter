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
    errorMessage: string;
    name: string | null;
    rack_uuid: string;
    uuid: string;
}

interface Rack {
    blenderXCenter: number;
    blenderXSize: number;
    blenderYCenter: number;
    blenderYSize: number;
    blenderZCenter: number;
    blenderZSize: number;
    colorStartBlue: number;
    colorStartGreen: number;
    colorStartRed: number;
    colorLineRed: number;
    colorLineGreen: number;
    colorLineBlue: number;
    colorTargetBlue: number;
    colorTargetGreen: number;
    colorTargetRed: number;
    name: string;
    rotation: number;
    uuid: string;
}

function generateRacks(){
    var countRow: number;
    var countRack: number;
    var maxRow: number;
    var maxRack: number;
    var rackName: string;
    var blenderXCenter: number;
    var blenderXSize: number;
    var blenderYCenter: number;
    var blenderYSize: number;
    var blenderZCenter: number;
    var blenderZSize: number;
    var rotation: number;
    var tempRackData: Record<string,Rack> = {};
    maxRow = 6;
    maxRack = 20;
    for (countRow = 0; countRow < maxRow; countRow++){
        for (countRack = 0; countRack < maxRack; countRack++){
            if (countRow % 2 == 0){
                rotation = 2;
            }
            else {
                rotation = 0;
            }
            rackName = "rack_" + countRow + "_" + countRack;
            blenderXCenter = (countRack * 0.6) + 2.4;
            blenderXSize = 0.58;
            blenderYCenter = (countRow * 2.4) + 2.4;
            blenderYSize = 1.2;
            blenderZCenter = 0.9;
            blenderZSize = 1.8;
            tempRackData[rackName] = {
                blenderXCenter: blenderXCenter,
                blenderXSize: blenderXSize,
                blenderYCenter: blenderYCenter,
                blenderYSize: blenderYSize,
                blenderZCenter: blenderZCenter,
                blenderZSize: blenderZSize,
                colorStartBlue: 1.0,
                colorStartGreen: 1.0,
                colorStartRed: 1.0,
                colorLineRed: 0.5,
                colorLineGreen: 0.5,
                colorLineBlue: 0.5,
                colorTargetBlue: 0.9,
                colorTargetGreen: 0.9,
                colorTargetRed: 0.9,
                name: rackName,
                rotation: rotation,
                uuid: rackName
            }
        }
    }
    return tempRackData;
}

function generateHardware(rackData){
    var blenderPlaneHeight: number;
    var blenderPlaneWidth: number;
    var blenderXCenter: number;
    var blenderYCenter: number;
    var blenderZCenter: number;
    var blenderZRotation: number;
    var colorStartBlue: number;
    var colorStartGreen: number;
    var colorStartRed: number;
    var colorErrorBlue: number;
    var colorErrorGreen: number;
    var colorErrorRed: number;
    var colorTargetBlue: number;
    var colorTargetGreen: number;
    var colorTargetRed: number;
    var errorMessage: string;
    var name: string | null;
    var planeDimensions: Record<string,number> = {};
    var serverLoop: number;
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
        zStart = rackData[rackName]["blenderZCenter"] - (rackData[rackName]["blenderZSize"] / 2) + 0.1;
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
                errorMessage: "",
                name: name,
                rack_uuid: rackData[rackName]["name"],
                uuid: name
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

var rackData: Record<string,Rack> = {};
var hardwareData: Record<string,Hardware> = {};
rackData = generateRacks();
hardwareData = generateHardware(rackData);
console.log("var rackData = " + JSON.stringify(rackData));
console.log("var hardwareData = " + JSON.stringify(hardwareData));