const { parse } = require("csv-parse");
const fs = require("fs");

const habitablePlanets = [];

function isHabitablePlanet(planet) {
  return (
    planet["koi_disposition"] === "CONFIRMED" &&
    planet["koi_insol"] > 0.36 &&
    planet["koi_insol"] < 1.11 &&
    planet["koi_prad"] < 1.6
  );
}

const parser = parse({
  comment: "#",
  columns: true,
});

fs.createReadStream("./kepler_data.csv")
  .pipe(parser)
  .on("data", (planetObj) => {
    if (isHabitablePlanet(planetObj)) {
      habitablePlanets.push(planetObj);
    }
  })
  .on("error", (err) => {
    console.log(err);
  })
  .on("end", (end) => {
    console.log(`${habitablePlanets.length} habitable planets`);
  });
