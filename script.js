/* =========================================================
   MUSTAQEEM FAREEDI — FUTURISTIC EEE PORTFOLIO
   3D ENGINEERING WORLD
========================================================= */

const THREE = window.THREE;

/* =========================================================
   LOADER
========================================================= */

window.addEventListener("load", () => {
    setTimeout(() => {
        const loader = document.getElementById("loader");

        if (loader) {
            loader.classList.add("hidden");
        }
    }, 1200);
});


/* =========================================================
   THREE.JS SETUP
========================================================= */

const container = document.getElementById("three-container");

if (container && THREE) {

    const scene = new THREE.Scene();

    scene.background = new THREE.Color(0x030609);

    scene.fog = new THREE.FogExp2(
        0x030609,
        0.055
    );


    /* -----------------------------------------------------
       CAMERA
    ----------------------------------------------------- */

    const camera = new THREE.PerspectiveCamera(
        42,
        container.clientWidth / container.clientHeight,
        0.1,
        1000
    );

    camera.position.set(
        8,
        4.5,
        11
    );


    /* -----------------------------------------------------
       RENDERER
    ----------------------------------------------------- */

    const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
    });

    renderer.setPixelRatio(
        Math.min(window.devicePixelRatio, 2)
    );

    renderer.setSize(
        container.clientWidth,
        container.clientHeight
    );

    renderer.outputEncoding =
        THREE.sRGBEncoding;

    container.appendChild(renderer.domElement);


    /* =====================================================
       LIGHTING
    ===================================================== */

    const ambientLight =
        new THREE.AmbientLight(
            0x7aa9a5,
            0.35
        );

    scene.add(ambientLight);


    const cyanLight =
        new THREE.PointLight(
            0x5dffe9,
            5,
            30
        );

    cyanLight.position.set(
        2,
        5,
        4
    );

    scene.add(cyanLight);


    const blueLight =
        new THREE.PointLight(
            0x287dff,
            3,
            25
        );

    blueLight.position.set(
        -6,
        1,
        -4
    );

    scene.add(blueLight);


    /* =====================================================
       MAIN ENGINEERING PLATFORM
    ===================================================== */

    const world = new THREE.Group();

    scene.add(world);


    const platformGeometry =
        new THREE.CylinderGeometry(
            5.2,
            5.2,
            0.18,
            96
        );

    const platformMaterial =
        new THREE.MeshStandardMaterial({
            color: 0x071115,
            metalness: 0.85,
            roughness: 0.35
        });

    const platform =
        new THREE.Mesh(
            platformGeometry,
            platformMaterial
        );

    platform.position.y = -2.4;

    world.add(platform);


    /* =====================================================
       PLATFORM RINGS
    ===================================================== */

    function createRing(radius, y, opacity) {

        const geometry =
            new THREE.RingGeometry(
                radius - 0.012,
                radius,
                128
            );

        const material =
            new THREE.MeshBasicMaterial({
                color: 0x5dffe9,
                transparent: true,
                opacity: opacity,
                side: THREE.DoubleSide
            });

        const ring =
            new THREE.Mesh(
                geometry,
                material
            );

        ring.rotation.x =
            -Math.PI / 2;

        ring.position.y = y;

        world.add(ring);

        return ring;
    }


    const ring1 =
        createRing(5.0, -2.29, 0.35);

    const ring2 =
        createRing(3.8, -2.27, 0.20);

    const ring3 =
        createRing(2.6, -2.25, 0.15);


    /* =====================================================
       CENTRAL POWER CORE
    ===================================================== */

    const coreGroup =
        new THREE.Group();

    coreGroup.position.set(
        0,
        0,
        0
    );

    world.add(coreGroup);


    const coreGeometry =
        new THREE.IcosahedronGeometry(
            1.15,
            2
        );

    const coreMaterial =
        new THREE.MeshStandardMaterial({
            color: 0x0b272b,
            emissive: 0x5dffe9,
            emissiveIntensity: 0.5,
            metalness: 0.7,
            roughness: 0.2,
            wireframe: false
        });

    const core =
        new THREE.Mesh(
            coreGeometry,
            coreMaterial
        );

    coreGroup.add(core);


    /* Core wireframe */

    const coreWire =
        new THREE.Mesh(
            new THREE.IcosahedronGeometry(
                1.3,
                2
            ),
            new THREE.MeshBasicMaterial({
                color: 0x5dffe9,
                wireframe: true,
                transparent: true,
                opacity: 0.18
            })
        );

    coreGroup.add(coreWire);


    /* =====================================================
       ENERGY CORE RINGS
    ===================================================== */

    for (let i = 0; i < 3; i++) {

        const geometry =
            new THREE.TorusGeometry(
                1.55 + i * 0.35,
                0.012,
                8,
                100
            );

        const material =
            new THREE.MeshBasicMaterial({
                color: 0x5dffe9,
                transparent: true,
                opacity: 0.45 - i * 0.1
            });

        const ring =
            new THREE.Mesh(
                geometry,
                material
            );

        ring.rotation.x =
            Math.PI / 2;

        ring.rotation.z =
            i * 0.8;

        coreGroup.add(ring);

        ring.userData.speed =
            0.002 + i * 0.001;
    }


    /* =====================================================
       BATTERY MODULE
    ===================================================== */

    function createBattery(
        x,
        y,
        z,
        scale = 1
    ) {

        const group =
            new THREE.Group();

        group.position.set(
            x,
            y,
            z
        );

        group.scale.setScalar(scale);

        world.add(group);


        const body =
            new THREE.Mesh(
                new THREE.BoxGeometry(
                    2.5,
                    1.2,
                    1.4
                ),
                new THREE.MeshStandardMaterial({
                    color: 0x0a171c,
                    metalness: 0.8,
                    roughness: 0.3
                })
            );

        group.add(body);


        const edge =
            new THREE.LineSegments(
                new THREE.EdgesGeometry(
                    body.geometry
                ),
                new THREE.LineBasicMaterial({
                    color: 0x5dffe9,
                    transparent: true,
                    opacity: 0.45
                })
            );

        group.add(edge);


        /* Battery cells */

        for (let i = 0; i < 6; i++) {

            const cell =
                new THREE.Mesh(
                    new THREE.BoxGeometry(
                        0.27,
                        0.65,
                        0.75
                    ),
                    new THREE.MeshBasicMaterial({
                        color:
                            i < 5
                                ? 0x5dffe9
                                : 0x153237
                    })
                );

            cell.position.x =
                -0.8 + i * 0.32;

            cell.position.y =
                0.02;

            cell.position.z =
                0.72;

            group.add(cell);
        }


        /* Battery terminal */

        const terminal =
            new THREE.Mesh(
                new THREE.BoxGeometry(
                    0.45,
                    0.12,
                    0.25
                ),
                new THREE.MeshBasicMaterial({
                    color: 0x5dffe9
                })
            );

        terminal.position.set(
            0,
            0.7,
            0
        );

        group.add(terminal);


        return group;
    }


    const battery =
        createBattery(
            -4.0,
            -0.8,
            0.3,
            0.9
        );


    /* =====================================================
       MOTOR
    ===================================================== */

    const motorGroup =
        new THREE.Group();

    motorGroup.position.set(
        3.6,
        -0.2,
        0.3
    );

    world.add(motorGroup);


    const motorBody =
        new THREE.Mesh(
            new THREE.CylinderGeometry(
                1.05,
                1.05,
                1.8,
                48
            ),
            new THREE.MeshStandardMaterial({
                color: 0x0b171b,
                metalness: 0.9,
                roughness: 0.25
            })
        );

    motorBody.rotation.z =
        Math.PI / 2;

    motorGroup.add(motorBody);


    const motorWire =
        new THREE.Mesh(
            new THREE.CylinderGeometry(
                1.12,
                1.12,
                1.84,
                32,
                1,
                true
            ),
            new THREE.MeshBasicMaterial({
                color: 0x5dffe9,
                wireframe: true,
                transparent: true,
                opacity: 0.2
            })
        );

    motorWire.rotation.z =
        Math.PI / 2;

    motorGroup.add(motorWire);


    /* Motor rotor */

    const rotor =
        new THREE.Mesh(
            new THREE.CylinderGeometry(
                0.5,
                0.5,
                2.0,
                32
            ),
            new THREE.MeshStandardMaterial({
                color: 0x253b40,
                metalness: 1,
                roughness: 0.2
            })
        );

    rotor.rotation.z =
        Math.PI / 2;

    motorGroup.add(rotor);


    /* =====================================================
       INVERTER / POWER ELECTRONICS
    ===================================================== */

    const inverterGroup =
        new THREE.Group();

    inverterGroup.position.set(
        0,
        -0.1,
        -3
    );

    world.add(inverterGroup);


    const inverter =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                2.1,
                1.2,
                1.5
            ),
            new THREE.MeshStandardMaterial({
                color: 0x091519,
                metalness: 0.75,
                roughness: 0.25
            })
        );

    inverterGroup.add(inverter);


    const inverterLines =
        new THREE.LineSegments(
            new THREE.EdgesGeometry(
                inverter.geometry
            ),
            new THREE.LineBasicMaterial({
                color: 0x5dffe9,
                transparent: true,
                opacity: 0.4
            })
        );

    inverterGroup.add(inverterLines);


    /* Power electronics chips */

    for (let i = 0; i < 4; i++) {

        const chip =
            new THREE.Mesh(
                new THREE.BoxGeometry(
                    0.25,
                    0.1,
                    0.25
                ),
                new THREE.MeshBasicMaterial({
                    color: 0x5dffe9
                })
            );

        chip.position.set(
            -0.6 + i * 0.4,
            0.65,
            0
        );

        inverterGroup.add(chip);
    }


    /* =====================================================
       SOLAR PANEL
    ===================================================== */

    const solarGroup =
        new THREE.Group();

    solarGroup.position.set(
        -1.8,
        2.1,
        0
    );

    solarGroup.rotation.z =
        -0.2;

    solarGroup.rotation.x =
        -0.25;

    world.add(solarGroup);


    const solarBase =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                3.8,
                0.12,
                2.3
            ),
            new THREE.MeshStandardMaterial({
                color: 0x081114,
                metalness: 0.8,
                roughness: 0.3
            })
        );

    solarGroup.add(solarBase);


    /* Solar cells */

    for (let x = 0; x < 6; x++) {

        for (let z = 0; z < 4; z++) {

            const cell =
                new THREE.Mesh(
                    new THREE.BoxGeometry(
                        0.53,
                        0.025,
                        0.45
                    ),
                    new THREE.MeshBasicMaterial({
                        color: 0x102e38
                    })
                );

            cell.position.x =
                -1.32 + x * 0.53;

            cell.position.y =
                0.075;

            cell.position.z =
                -0.67 + z * 0.45;

            solarGroup.add(cell);
        }
    }


    /* =====================================================
       ENGINEERING CONNECTIONS
    ===================================================== */

    function createConnection(
        start,
        end
    ) {

        const points = [
            new THREE.Vector3(
                start.x,
                start.y,
                start.z
            ),

            new THREE.Vector3(
                (start.x + end.x) / 2,
                start.y + 0.5,
                (start.z + end.z) / 2
            ),

            new THREE.Vector3(
                end.x,
                end.y,
                end.z
            )
        ];


        const curve =
            new THREE.CatmullRomCurve3(
                points
            );


        const geometry =
            new THREE.BufferGeometry()
                .setFromPoints(
                    curve.getPoints(50)
                );


        const material =
            new THREE.LineBasicMaterial({
                color: 0x5dffe9,
                transparent: true,
                opacity: 0.38
            });


        const line =
            new THREE.Line(
                geometry,
                material
            );

        world.add(line);

        return line;
    }


    const connection1 =
        createConnection(
            new THREE.Vector3(
                -4,
                -0.8,
                0.3
            ),

            new THREE.Vector3(
                0,
                -0.1,
                -3
            )
        );


    const connection2 =
        createConnection(
            new THREE.Vector3(
                1,
                -0.1,
                -3
            ),

            new THREE.Vector3(
                3.6,
                -0.2,
                0.3
            )
        );


    const connection3 =
        createConnection(
            new THREE.Vector3(
                -1.8,
                2.1,
                0
            ),

            new THREE.Vector3(
                0,
                -0.1,
                -3
            )
        );


    /* =====================================================
       ENERGY PARTICLES
    ===================================================== */

    const particleGroup =
        new THREE.Group();

    world.add(particleGroup);


    function createEnergyParticles(
        count,
        color
    ) {

        for (let i = 0; i < count; i++) {

            const geometry =
                new THREE.SphereGeometry(
                    0.035,
                    8,
                    8
                );

            const material =
                new THREE.MeshBasicMaterial({
                    color: color
                });

            const particle =
                new THREE.Mesh(
                    geometry,
                    material
                );


            particle.position.set(
                (Math.random() - .5) * 8,
                (Math.random() - .5) * 3,
                (Math.random() - .5) * 5
            );


            particle.userData.speed =
                0.003 + Math.random() * 0.008;

            particle.userData.offset =
                Math.random() * Math.PI * 2;

            particleGroup.add(
                particle
            );
        }
    }


    createEnergyParticles(
        80,
        0x5dffe9
    );


    /* =====================================================
       BACKGROUND PARTICLES
    ===================================================== */

    const starsGeometry =
        new THREE.BufferGeometry();

    const starPositions = [];


    for (let i = 0; i < 700; i++) {

        starPositions.push(
            (Math.random() - .5) * 35,
            (Math.random() - .5) * 22,
            (Math.random() - .5) * 30
        );
    }


    starsGeometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(
            starPositions,
            3
        )
    );


    const starsMaterial =
        new THREE.PointsMaterial({
            color: 0x55777b,
            size: 0.025,
            transparent: true,
            opacity: 0.65
        });


    const stars =
        new THREE.Points(
            starsGeometry,
            starsMaterial
        );

    scene.add(stars);


    /* =====================================================
       ORBIT CONTROLS
    ===================================================== */

    const controls =
        new THREE.OrbitControls(
            camera,
            renderer.domElement
        );

    controls.enableDamping = true;

    controls.dampingFactor = 0.04;

    controls.enablePan = false;

    controls.minDistance = 7;

    controls.maxDistance = 18;

    controls.minPolarAngle =
        Math.PI * 0.28;

    controls.maxPolarAngle =
        Math.PI * 0.68;

    controls.target.set(
        0,
        0,
        0
    );


    /* =====================================================
       MOUSE INTERACTION
    ===================================================== */

    let mouseX = 0;
    let mouseY = 0;

    window.addEventListener(
        "mousemove",
        (event) => {

            mouseX =
                (event.clientX /
                    window.innerWidth) -
                0.5;

            mouseY =
                (event.clientY /
                    window.innerHeight) -
                0.5;
        }
    );


    /* =====================================================
       ANIMATION
    ===================================================== */

    const clock =
        new THREE.Clock();


    function animate() {

        requestAnimationFrame(
            animate
        );


        const elapsed =
            clock.getElapsedTime();


        /* Core */

        core.rotation.y =
            elapsed * 0.18;

        core.rotation.x =
            Math.sin(elapsed * 0.4) * 0.15;


        coreWire.rotation.y =
            -elapsed * 0.12;


        coreGroup.position.y =
            Math.sin(elapsed * 1.2) * 0.08;


        /* Rings */

        coreGroup.children.forEach(
            (child) => {

                if (
                    child.userData &&
                    child.userData.speed
                ) {

                    child.rotation.z +=
                        child.userData.speed;
                }
            }
        );


        /* Motor */

        rotor.rotation.x =
            elapsed * 3.5;


        motorWire.rotation.x =
            -elapsed * 0.8;


        /* Solar panel */

        solarGroup.rotation.y =
            Math.sin(elapsed * 0.4) * 0.04;


        /* Platform */

        ring1.rotation.z =
            elapsed * 0.035;

        ring2.rotation.z =
            -elapsed * 0.055;

        ring3.rotation.z =
            elapsed * 0.08;


        /* Stars */

        stars.rotation.y =
            elapsed * 0.008;


        /* Energy particles */

        particleGroup.children.forEach(
            (particle, index) => {

                particle.position.y +=
                    particle.userData.speed;

                particle.position.x +=
                    Math.sin(
                        elapsed +
                        particle.userData.offset
                    ) * 0.0008;


                if (
                    particle.position.y > 4
                ) {

                    particle.position.y = -3;
                }
            }
        );


        /* Mouse movement */

        world.rotation.y +=
            (mouseX * 0.08 -
                world.rotation.y) * 0.01;

        world.rotation.x +=
            (-mouseY * 0.035 -
                world.rotation.x) * 0.01;


        controls.update();


        renderer.render(
            scene,
            camera
        );
    }


    animate();


    /* =====================================================
       RESIZE
    ===================================================== */

    window.addEventListener(
        "resize",
        () => {

            const width =
                container.clientWidth;

            const height =
                container.clientHeight;


            camera.aspect =
                width / height;

            camera.updateProjectionMatrix();


            renderer.setSize(
                width,
                height
            );
        }
    );
}


/* =========================================================
   SMOOTH NAVIGATION
========================================================= */

document
    .querySelectorAll(
        'a[href^="#"]'
    )
    .forEach(
        (link) => {

            link.addEventListener(
                "click",
                function (event) {

                    const target =
                        document.querySelector(
                            this.getAttribute(
                                "href"
                            )
                        );

                    if (target) {

                        event.preventDefault();

                        target.scrollIntoView({
                            behavior: "smooth"
                        });
                    }
                }
            );
        }
    );


/* =========================================================
   SIMPLE SCROLL REVEAL
========================================================= */

const revealElements =
    document.querySelectorAll(
        ".section, .project, .system-card, .timeline-item"
    );


const observer =
    new IntersectionObserver(
        (entries) => {

            entries.forEach(
                (entry) => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.style.opacity =
                            "1";

                        entry.target.style.transform =
                            "translateY(0)";

                        observer.unobserve(
                            entry.target
                        );
                    }
                }
            );
        },
        {
            threshold: 0.08
        }
    );


revealElements.forEach(
    (element) => {

        element.style.opacity = "0";

        element.style.transform =
            "translateY(25px)";

        element.style.transition =
            "opacity .8s ease, transform .8s ease";

        observer.observe(
            element
        );
    }
);
