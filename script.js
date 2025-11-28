const names = [];
let assignments = {};
const usedGiftees = new Set();

function displayNames() {
    const nameList = document.getElementById("nameList");
    nameList.innerHTML = "";
    names.forEach((name, index) => {
        const li = document.createElement("li");
        li.textContent = `${index + 1}) ${name}`;
        if (usedGiftees.has(index)) {
            li.classList.add("crossed");
        }
        nameList.appendChild(li);
    });
}

const gifteeLinks = {
    "Grandma": "https://www.amazon.com/hz/wishlist/ls/3VDPC2Q4MMN0X?ref_=wl_share",
    "James": "https://www.amazon.com/hz/wishlist/ls/3AEAJ97V3OU6Z?ref_=wl_share",
    "Madison": "https://www.amazon.com/hz/wishlist/ls/2852535JAMP94?ref_=wl_share",
    "Dylan": "",
    "Carter": "https://www.amazon.com/registries/gl/guest-view/DNO54YHG7TZ1?ref_=cm_sw_r_apann_ggr-subnav-share_SEEY79ZVXKWZDVXEC9ZP&language=en-USk",
    "Kristy": "https://www.amazon.com/hz/wishlist/ls/1GB7ZNSY1P6M7?ref_=wl_share",
    "Noah": "https://www.amazon.com/hz/wishlist/ls/BSPKNIV53QMR?ref_=wl_share",
    "Raya": "https://www.amazon.com/hz/wishlist/ls/3M4CUCEBEXKI1?ref_=wl_share",
    "Nathan": "https://www.amazon.com/hz/wishlist/ls/2US6G3ZDP07CM?ref_=wl_share",
    "Gwen": "https://www.amazon.com/hz/wishlist/ls/I1ETWW5Y8Z9K?ref_=wl_share"
};

// Map code strings directly to their participant number (1-based)
const codes = {
    "1305": 1, // grandma
    "1818": 2, // james
    "2503": 3, // madison
    "0818": 4, // dylan
    "0919": 5, // carter
    "2013": 6, // kristy
    "0119": 7, // noah
    "1601": 8, // raya
    "0401": 9, // nathan
    "2111": 10 // gwen
};

function findGiftee() {
    const manualInput = document.getElementById("manualInput").value.trim().toUpperCase(); 

    const num = codes[manualInput]; // look up the number by code

    // If the code doesn't exist in the map, num will be undefined
    if (!num) {
        document.getElementById("gifteeResult").textContent = "Invalid Code";
        return;
    }

    const currentName = names[num - 1]; // 1-based → 0-based index
    const gifteeName = assignments[currentName];

    if (!gifteeName) {
        alert("No giftee found for this participant.");
        return;
    }

    // Look up this giftee's list URL
    const gifteeListUrl = gifteeLinks[gifteeName];

    document.getElementById("gifteeResult").textContent =
        `Your giftee is: ${gifteeName}`;

    // Only show a link if we have a URL for this giftee
    if (gifteeListUrl) {
        document.getElementById("gifteeList").innerHTML =
            `${gifteeName}'s list is found here: <a href="${gifteeListUrl}" target="_blank">Amazon</a>`;
    } else {
        document.getElementById("gifteeList").textContent =
            `${gifteeName} does not have a list link yet.`;
    }

    usedGiftees.add(num - 1);
    displayNames();
}


function loadAssignmentsFromFile() {
    fetch("names.txt")
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to load names.txt");
            }
            return response.text();
        })
        .then(content => {
            parseAssignments(content);
        })
        .catch(error => {
            alert(`Error: ${error.message}`);
        });
    
}

function parseAssignments(content) {
    const lines = content.split("\n").filter(line => line.trim() !== "");
    assignments = {};
    names.length = 0; // Clear the names array

    lines.forEach(line => {
        const [giver, receiver] = line.split("-->").map(name => name.trim());
        if (giver && receiver) {
            assignments[giver] = receiver;
            if (!names.includes(giver)) names.push(giver);
        }
    });

    displayNames();
}



