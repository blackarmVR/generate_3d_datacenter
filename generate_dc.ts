interface Hardware {
    canBeTargeted: boolean;
    cartesianPlaneHeight: number;
    cartesianPlaneWidth: number;
    cartesianXCenter: number;
    cartesianYCenter: number;
    cartesianZCenter: number;
    cartesianZRotation: number;
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
    cartesianXCenter: number;
    cartesianXSize: number;
    cartesianYCenter: number;
    cartesianYSize: number;
    cartesianZCenter: number;
    cartesianZSize: number;
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
    var cartesianXCenter: number;
    var cartesianXSize: number;
    var cartesianYCenter: number;
    var cartesianYSize: number;
    var cartesianZCenter: number;
    var cartesianZSize: number;
    var rotation: number;
    var tempRackData: Record<string,Rack> = {};
    maxRow = 2;
    maxRack = 10;
    for (countRow = 0; countRow < maxRow; countRow++){
        for (countRack = 0; countRack < maxRack; countRack++){
            if (countRow % 2 == 0){
                rotation = 0;
            }
            else {
                rotation = 2;
            }
            rackName = "rack_" + countRow + "_" + countRack;
            cartesianXCenter = (countRow * 2) - 1;
            cartesianXSize = 1;
            cartesianYCenter = 0.9;
            cartesianYSize = 1.8;
            cartesianZCenter = (countRack + 1);
            cartesianZSize = 0.98;
            tempRackData[rackName] = {
                cartesianXCenter: cartesianXCenter,
                cartesianXSize: cartesianXSize,
                cartesianYCenter: cartesianYCenter,
                cartesianYSize: cartesianYSize,
                cartesianZCenter: cartesianZCenter,
                cartesianZSize: cartesianZSize,
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
    var cartesianPlaneHeight: number;
    var cartesianPlaneWidth: number;
    var cartesianXCenter: number;
    var cartesianYCenter: number;
    var cartesianZCenter: number;
    var cartesianZRotation: number;
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
        cartesianPlaneHeight = (unitHeight * 4) - 0.004;
        cartesianPlaneWidth = planeDimensions["cartesianPlaneWidth"];
        cartesianXCenter = planeDimensions["cartesianXCenter"];
        cartesianYCenter = planeDimensions["cartesianYCenter"];
        cartesianZRotation = planeDimensions["cartesianZRotation"];
        zStart = rackData[rackName]["cartesianZCenter"] - (rackData[rackName]["cartesianZSize"] / 2) + 0.1;
        // 4 unit servers
        for (serverLoop = 0; serverLoop < 4; serverLoop++){
            name = rackData[rackName]["name"] + "_4u_" + serverLoop;
            cartesianZCenter = zStart + (unitHeight * 2) + (unitHeight * serverLoop * 4);
            tempHardwareData[name] = {
                canBeTargeted: true,
                cartesianPlaneHeight: cartesianPlaneHeight,
                cartesianPlaneWidth: cartesianPlaneWidth,
                cartesianXCenter: cartesianXCenter,
                cartesianYCenter: cartesianYCenter,
                cartesianZCenter: cartesianZCenter,
                cartesianZRotation: cartesianZRotation,
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
    var cartesianPlaneWidth: number;
    var cartesianXCenter: number;
    var cartesianYCenter: number;
    var cartesianZRotation: number;
    cartesianXCenter = 0;
    cartesianYCenter = 0;
    cartesianPlaneWidth = 1;
    cartesianZRotation = 0;
    if (rack["rotation"] % 2 == 0){
        cartesianZRotation = 1.570796;
    }
    if (rack["rotation"] == 0){
        cartesianXCenter = rack["cartesianXCenter"];
        cartesianYCenter = rack["cartesianYCenter"] - (rack["cartesianYSize"] * 0.5) - 0.002;
        cartesianPlaneWidth = rack["cartesianXSize"] * 0.8;
    }
    if (rack["rotation"] == 1){
        cartesianXCenter = rack["cartesianXCenter"] + (rack["cartesianXSize"] * 0.5) + 0.002;
        cartesianYCenter = rack["cartesianYCenter"];
        cartesianPlaneWidth = rack["cartesianYSize"] * 0.8;
    }
    if (rack["rotation"] == 2){
        cartesianXCenter = rack["cartesianXCenter"];
        cartesianYCenter = rack["cartesianYCenter"] + (rack["cartesianYSize"] * 0.5) + 0.002;
        cartesianPlaneWidth = rack["cartesianXSize"] * 0.8;
    }
    if (rack["rotation"] == 3){
        cartesianXCenter = rack["cartesianXCenter"] - (rack["cartesianXSize"] * 0.5) - 0.002;
        cartesianYCenter = rack["cartesianYCenter"];
        cartesianPlaneWidth = rack["cartesianYSize"] * 0.8;
    }
    return {
        cartesianPlaneWidth,
        cartesianXCenter,
        cartesianYCenter,
        cartesianZRotation
    }
}

var rackData: Record<string,Rack> = {};
var hardwareData: Record<string,Hardware> = {};
rackData = generateRacks();
hardwareData = generateHardware(rackData);
console.log("var rackData = " + JSON.stringify(rackData));
console.log("var hardwareData = " + JSON.stringify(hardwareData));