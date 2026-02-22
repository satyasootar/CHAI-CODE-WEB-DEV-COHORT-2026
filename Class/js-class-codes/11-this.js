console.log(this);

function ranveerOnGlobalStage() {
  return typeof this;  // Retuns object 
}

console.log(ranveerOnGlobalStage());

function ranveerWithNoScript() {
  "use strict"
  return this; //returns undefined . Its an interview question
}
console.log(ranveerWithNoScript());


function ranveerWithScript() {
  return this;   // Returns global object
}
console.log(ranveerWithScript()); 


// Interview question aasked in hotstar
const bollywoodFilm = {
  name: "Bajirao Mastani",
  lead: "Ranveer",

  introduce() {
    return `${this.lead} performs in ${this.name}`;
  },
};
const bollywoodFilm2 = {
  name: "Dhurandhar",
  lead: "Ranveer",

  introduce() {
    return `${this.lead} performs in ${this.name}`;
  },
};

console.log(bollywoodFilm.introduce());
console.log(bollywoodFilm2.introduce());

const filmDirector = {
  name: "Sanjay Leela Bhansali",
  cast: ["Ranveer", "Deepika", "Priyanka"],

  announceCast() {
    this.cast.forEach((actor) => {
      console.log(`${this.name} introduces ${actor}`);
    });
  },
};

filmDirector.announceCast();

const filmSet = {
  crew: "Spot boys",
  prepareProps() {
    console.log(`Outer this.crew: ${this.crew}`); // Outer this.crew: Spot boys

    function arrangeChairs() {
      console.log(`Inner this.crew: ${this.crew}`); // Inner this.crew: undefined
    }
    arrangeChairs();

    const arrangeLights = () => {
      console.log(`Arrow this.crew: ${this.crew}`); // 
    };
    arrangeLights();
  },
};

filmSet.prepareProps();

// Detached Methods

const actor = {
  name: "Ranveer",
  bow() {
    return `${this.name} takes a bow`;
  },
};
console.log(actor.bow());
const detachedBow = actor.bow;

console.log(detachedBow());

const myfunctionOne = function () {
  console.log(this);
};

const myfunctionTwo = () => {
  console.log(this);
};

myfunctionOne();
myfunctionTwo();
