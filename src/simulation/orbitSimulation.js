function updateOrbits(data, objects, angle) {

    data.planets.forEach((planetData) => {

        const planet = objects[planetData.id];

        const planetAngle =
            angle * planetData.orbitSpeed / 0.005;

        planet.position.x =
            Math.cos(planetAngle) *
            planetData.orbitDistance;

        planet.position.z =
            Math.sin(planetAngle) *
            planetData.orbitDistance;

        planet.rotation.y += 0.01;


        if (planetData.moons) {

            planetData.moons.forEach((moonData) => {

                const moon = objects[moonData.id];

                const moonAngle =
                    angle * moonData.orbitSpeed / 0.005;

                moon.position.x =
                    Math.cos(moonAngle) *
                    moonData.orbitDistance;

                moon.position.z =
                    Math.sin(moonAngle) *
                    moonData.orbitDistance;

                moon.rotation.y += 0.01;

            });

        }

    });


    objects.sun.rotation.y += 0.005;
}


export { updateOrbits };