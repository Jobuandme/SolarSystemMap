const solarSystem = {
    sun: {
        name: "Sun",
        type: "star",
        radius: 1,
        color: 0xffaa00
    },

    planets: [
        {
            id: "mercury",
            name: "Mercury",
            type: "planet",
            radius: 0.12,
            orbitDistance: 1.5,
            orbitSpeed: 0.02,
            color: 0x888888
        },

        {
            id: "venus",
            name: "Venus",
            type: "planet",
            radius: 0.2,
            orbitDistance: 2.3,
            orbitSpeed: 0.015,
            color: 0xd9a441
        },

        {
            id: "earth",
            name: "Earth",
            type: "planet",
            radius: 0.3,
            orbitDistance: 4,
            orbitSpeed: 0.005,
            color: 0x2266cc,

            moons: [
                {
                    id: "moon",
                    name: "Moon",
                    type: "moon",
                    radius: 0.08,
                    orbitDistance: 0.7,
                    orbitSpeed: 0.02,
                    color: 0xaaaaaa
                }
            ]
        },

        {
            id: "mars",
            name: "Mars",
            type: "planet",
            radius: 0.22,
            orbitDistance: 5.2,
            orbitSpeed: 0.004,
            color: 0xb84a32
        },

        {
            id: "jupiter",
            name: "Jupiter",
            type: "planet",
            radius: 0.65,
            orbitDistance: 7,
            orbitSpeed: 0.002,
            color: 0xc99b6d
        },

        {
            id: "saturn",
            name: "Saturn",
            type: "planet",
            radius: 0.55,
            orbitDistance: 9,
            orbitSpeed: 0.0015,
            color: 0xd6c08a
        },

        {
            id: "uranus",
            name: "Uranus",
            type: "planet",
            radius: 0.4,
            orbitDistance: 11,
            orbitSpeed: 0.001,
            color: 0x78c7d4
        },

        {
            id: "neptune",
            name: "Neptune",
            type: "planet",
            radius: 0.38,
            orbitDistance: 13,
            orbitSpeed: 0.0008,
            color: 0x4169c1
        }
    ]
};

export default solarSystem;