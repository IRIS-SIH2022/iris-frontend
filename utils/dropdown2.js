export const primaryTypes = [
  "DRUG SMUGGLING, POSSESION, SALE OR USE OF DRUGS",
  "THE GAMBLING ACT",
  "ROBBERY, THEFT, BURGLARY, DACOITY",
  "CULPABLE HOMICIDE AND GREVIOUS HURT",
  "ROAD ACCIDENTS",
  "ABDUCTION OR KIDNAPPING",
  "ARMS/EXPLOSIVE - RELATED ACTS",
  "ASSAULT",
  "RAPE",
  "THE MINES AND MINERALS (DEVELOPMENT AND REGULATION) ACT",
  "FIRST DEGREE MURDER",
  "ENVIRONMENT AND POLLUTION - RELATED ACTS",
  "CHILD ABUSE",
  "EXTORTION AND BLACKMAIL",
  "HUMAN TRAFFICKING",
  "THE IMMORAL TRAFFIC (PREVENTION) ACT",
];

export const acts = [
  "PROHIBITION ACT (STATE)",
  "THE GAMBLING ACT",
  "IPC Section 378 - THEFT",
  "THE EXCISE ACT",
  "THE NARCOTIC DRUGS & PSYCHOTROPIC SUBSTANCES ACT",
  "IPC Section 304 - CULPABLE HOMICIDE NOT AMOUNTING TO MURDER",
  "IPC Section 304A - DEATHS DUE TO NEGLIGENCE RELATING TO ROAD ACCIDENTS",
  "IPC Section 455 - BURGLARY",
  "IPC Section 279 - RASH DRIVING ON PUBLIC WAY",
  "IPC Sections 359 to 374 - KIDNAPPING AND ABDUCTION",
  "THE ARMS ACT",
  "IPC Section 354D - STALKING",
  "IPC Section 354 - ASSAULT ON WOMEN WITH INTENT TO OUTRAGE HER MODESTY",
  "IPC Section 366 - KIDNAPPING AND ABDUCTION OF WOMEN TO COMPEL HER FOR MARRIAGE",
  "IPC Section 375 - RAPE",
  "IPC Section 320 - GRIEVOUS HURT",
  "THE MINES AND MINERALS (DEVELOPMENT AND REGULATION) ACT",
  "IPC Section 300 - MURDER",
  "IPC Section 354B - ASSAULT OR USE OF CRIMINAL FORCE ON WOMEN WITH INTENT TO DISROBE",
  "THE CIGARETTE AND OTHER TOBACCO PRODUCTS ACT",
  "IPC Section 354A - SEXUAL HARASSMENT",
  "THE PROTECTION OF CHILDREN FROM SEXUAL OFFENCES ACT",
  "THE FOREST ACT & THE FOREST CONSERVATION ACT",
  "THE EXPLOSIVE SUBSTANCES ACT",
  "IPC Section 392 - ROBBERY",
  "THE EXPLOSIVES ACT",
  "IPC Sections 383 & 503 - EXTORTION AND BLACKMAIL",
  "IPC Section 391 - DACOITY",
  "IPC Section 366A - PROCURATION OF MINOR GIRL",
  "IPC Section 370 & 370A - HUMAN TRAFFICKING",
  "IPC Section 354C - VOYEURISM",
  "NOISE POLLUTION ACTS",
  "THE JUVENILE JUSTICE (CARE AND PROTECTION OF CHILDREN) ACT",
  "THE PROHIBITION OF CHILD MARRIAGE ACT",
  "IPC Section 364 - KIDNAPPING AND ABDUCTION IN ORDER TO MURDER",
  "THE AIR & THE WATER (PREVENTION & CONTROL OF POLLUTION) ACT",
  "THE IMMORAL TRAFFIC (PREVENTION) ACT",
  "IPC Section 364A - KIDNAPPING FOR RANSOM",
  "THE CHILD LABOUR (PROHIBITION & REGULATION) ACT",
  "THE WILDLIFE PROTECTION ACT",
  "THE ENVIRONMENTAL (PROTECTION) ACT",
  "THE NATIONAL GREEN TRIBUNAL ACT",
  "THE PRE-NATAL DIAGNOSTIC TECHNIQUES (REG AND PREV OF MISUSE) ACT",
  "THE MEDICAL TERMINATION OF PREGNANCY ACT",
  "IPC Section 372 - SELLING OF MINORS FOR PROSTITUTION",
];

export const stations = [
  { KAPASHERA: 1 },
  { "VASANT KUNJ SOUTH": 2 },
  { "VASANT KUNJ NORTH": 3 },
  { "VASANT VIHAR": 4 },
  { "R.K. PURAM": 5 },
  { "SOUTH CAMPUS": 6 },
  { "PP SUBROTO PARK": 7 },
  { "DELHI CANTT.": 8 },
  { SAGARPUR: 9 },
  { "PALAM VILLAGE": 10 },
  { "JAFARPUR KALAN": 11 },
  { CHHAWALA: 12 },
  { "BABA HARIDAS NAGAR": 13 },
  { NAJAFGARH: 14 },
  { "PS. UTTAM NAGAR": 15 },
  { "PP SEC.3 DWK": 16 },
  { "DWARKA NORTH": 17 },
  { BINDAPUR: 18 },
  { DABRI: 19 },
  { "PP SEC.1 DWK": 20 },
  { "DWARKA SOUTH": 21 },
  { "DWARKA SEC.23": 22 },
];

function addDropDown(selectorID, dataSet) {
  let allDropDowns = document.getElementsByClassName(`${selectorID}DropDown`);

  for (let i = 0; i < allDropDowns.length; i++) {
    let element = allDropDowns[i];
    if (!element) return;

    for (let i = 0; i < dataSet.length; i++) {
      let option = document.createElement("option");
      option.value = dataSet[i];
      option.text = dataSet[i];
      element.appendChild(option);
    }
  }
}

function addStationsDropdown(stations) {
  let element = document.getElementById("stations");
  if (!element) return;
  for (let i = 0; i < stations.length; i++) {
    let option = document.createElement("option");
    option.value = Object.values(stations[i])[0];
    option.text = Object.keys(stations[i])[0];
    element.appendChild(option);
  }
}

setTimeout(() => {
  addDropDown("primaryTypes", primaryTypes);
  addDropDown("acts", acts);
  addStationsDropdown(stations);
}, 2000);
