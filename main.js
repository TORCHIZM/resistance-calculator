const RESULT_TEXT = document.getElementById("result");

const COLORS_1 = [
    "silver",
    "gold",
]

const COLORS_2 = [
    "siyah",
    "kahverengi",
    "kirmizi",
    "turuncu",
    "sari",
    "yesil",
    "mavi",
    "mor",
    "gri",
    "beyaz"
]

const COLORS_ALL = COLORS_1.concat(COLORS_2);

const TOLERANCES = {
    [COLORS_ALL[0]]: 10,
    [COLORS_ALL[1]]: 5,
    [COLORS_ALL[2]]: 1,
    [COLORS_ALL[3]]: 2,
    [COLORS_ALL[4]]: 0.5,
    [COLORS_ALL[5]]: 0.25,
    [COLORS_ALL[6]]: 0.1
}

const COLOR_CODES = {
    [COLORS_ALL[0]]: "silver",
    [COLORS_ALL[1]]: "gold",
    [COLORS_ALL[2]]: "black",
    [COLORS_ALL[3]]: "brown",
    [COLORS_ALL[4]]: "red",
    [COLORS_ALL[5]]: "orange",
    [COLORS_ALL[6]]: "yellow",
    [COLORS_ALL[7]]: "green",
    [COLORS_ALL[8]]: "blue",
    [COLORS_ALL[9]]: "purple",
    [COLORS_ALL[10]]: "gray",
    [COLORS_ALL[11]]: "white",
}

const MULTIPLIER_VALUES = {
    [0]: .01,
    [1]: .1,
    [2]: 1,
    [3]: 10,
    [4]: 100,
    [5]: 1000,
    [6]: 10000,
    [7]: 100000,
    [8]: 1000000,
    [9]: 10000000,
}

const TEMPRATURES = {
    [1] : 100,
    [2] : 50,
    [3] : 15,
    [4] : 25,
}

const COLOR_1 = document.getElementById("color-1");
const COLOR_2 = document.getElementById("color-2");
const COLOR_3 = document.getElementById("color-3");
const MULTIPLIER = document.getElementById("multiplier");
const TOLERANCE = document.getElementById("tolerance");
const TEMPRATURE = document.getElementById("temprature");

const INPUTS = [
    COLOR_1,
    COLOR_2,
    COLOR_3,
    MULTIPLIER,
    TOLERANCE,
    TEMPRATURE
]

const LINE_COLOR_1 = document.getElementById("line-color-1");
const LINE_COLOR_2 = document.getElementById("line-color-2");
const LINE_COLOR_3 = document.getElementById("line-color-3");
const LINE_MULTIPLIER = document.getElementById("line-multiplier");
const LINE_TOLERANCE = document.getElementById("line-tolerance");
const LINE_TEMPRATURE = document.getElementById("line-temprature");

const LINES = [
    LINE_COLOR_1,
    LINE_COLOR_2,
    LINE_COLOR_3,
    LINE_MULTIPLIER,
    LINE_TOLERANCE,
    LINE_TEMPRATURE
]

INPUTS.forEach(element => {
    element.onchange = (e) => {
        Calculate();
    }
});

function Calculate() {
    let Colors = [];

    INPUTS.forEach(element => {
        // if (element.value != "" && element.id.startsWith("color")) {
        if (element.value != "-1") {
            Colors.push(element.value)
        }
    });

    ColorsLength = Colors.length;

    if (Colors.length < 3 || Colors.length > 6) {
        RESULT_TEXT.innerText = "Lütfen eksik alanları doldurunuz."
        return;
    }

    let Result = "";

    Colors = GetColors(Colors);

    let i = 0;
    for (Color in Colors) {
        if (!Color.startsWith("color_")) break;

        let line = document.getElementById(`line-color-${i + 1}`);
        let colorIndex = COLORS_2[Colors[Color]];
        line.style.background = COLOR_CODES[colorIndex];

        Result += Colors[Color];
        i++
    }

    Result = Number(Result);

    let toleranceIndex = COLORS_ALL[Colors.tolerance];
    LINE_TOLERANCE.style.background = COLOR_CODES[toleranceIndex];

    let multiplierIndex = COLORS_ALL[Colors.multiplier];
    LINE_MULTIPLIER.style.background = COLOR_CODES[multiplierIndex];

    Result *= MULTIPLIER_VALUES[Colors.multiplier];
    RESULT_TEXT.innerText = `${Result} +-${TOLERANCES[toleranceIndex]}%`;

    if (Colors.temprature != undefined) {
        let tempratureIndex = COLORS_ALL[Number(Colors.temprature) + 2];
        LINE_TEMPRATURE.style.background = COLOR_CODES[tempratureIndex];
        RESULT_TEXT.innerText += ` (${TEMPRATURES[Colors.temprature]}ppm)`;
    }
}

function GetColors(c) {
    let Colors = {};

    if (COLOR_3.selectedIndex == 0) {
        let t = document.getElementById("temprature-text");
        t.style.opacity = 0.5;
        TEMPRATURE.setAttribute("disabled", "true");
    } else {
        let t = document.getElementById("temprature-text");
        t.style.opacity = 1;
        TEMPRATURE.removeAttribute("disabled");
    }

    if (TEMPRATURE.hasAttribute("disabled")) {
        Colors.color_1 = c[0];
        Colors.color_2 = c[1];
        Colors.multiplier = c[2];
        Colors.tolerance = c[3];
        
        LINE_COLOR_3.style.display = "none";
        LINE_TEMPRATURE.style.display = "none";
    } else if (c.length == 5 && !TEMPRATURE.hasAttribute("disabled")) {
        Colors.color_1 = c[0];
        Colors.color_2 = c[1];
        Colors.color_3 = c[2];
        Colors.multiplier = c[3];
        Colors.tolerance = c[4];
        
        LINE_COLOR_3.style.display = "block";
        LINE_TEMPRATURE.style.display = "none";
    } else if (c.length == 6) {
        Colors.color_1 = c[0];
        Colors.color_2 = c[1];
        Colors.color_3 = c[2];
        Colors.multiplier = c[3];
        Colors.tolerance = c[4];
        Colors.temprature = c[5];
        
        LINE_COLOR_3.style.display = "block";
        LINE_TEMPRATURE.style.display = "block";
    }
    return Colors;
}

Calculate();