/* =========================================================
   MUSTAQEEM FAREEDI — 3D ENGINEERING PORTFOLIO
   ========================================================= */

const THREE = window.THREE;


/* =========================================================
   LOADER
   ========================================================= */

let loaderProgress = 0;

const loaderNumber = document.querySelector(".loader-number");
const loaderLine = document.querySelector(".loader-line");

const loaderTimer = setInterval(() => {

  loaderProgress += Math.floor(Math.random() * 8) + 2;

  if (loaderProgress >= 100) {
    loaderProgress = 100;
    clearInterval(loaderTimer);

    setTimeout(() => {
      const loader = document.getElementById("loader");

      loader.style.transition = "opacity .8s ease";
      loader.style.opacity = "0";

      setTimeout(() => {
        loader.remove();
      }, 800);

    }, 350);
  }

  loaderNumber.textContent =
    String(loaderProgress).padStart(2, "0") + "%";

  loaderLine.style.width = loaderProgress + "%";

}, 70);


/* =========================================================
   CURSOR
   ========================================================= */

const cursorDot = document.querySelector(".cursor-dot");
const cursorRing = document.querySelector(".cursor-ring");

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

let ringX = mouseX;
let ringY = mouseY;

window.addEventListener("mousemove", (e) => {

  mouseX = e.clientX;
  mouseY = e.clientY;

  cursorDot.style.left = mouseX + "px";
  cursorDot.style.top = mouseY + "px";

});

function animateCursor() {

  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;

  cursorRing.style.left = ringX + "px";
  cursorRing.style.top = ringY + "px";

  requestAnimationFrame(animateCursor);
}

animateCursor();


document.querySelectorAll("a, .skill-row, .project-card").forEach(el => {

  el.addEventListener("mouseenter", () => {
    cursorRing.classList.add("active");
  });

  el.addEventListener("mouseleave", () => {
    cursorRing.classList.remove("active");
  });

});


/* =========================================================
   THREE.JS HELPERS
   ========================================================= */

const AMBER = 0xc8752b;
const SILVER = 0xbfc0bb;
const DARK = 0x080808;
const GRAPHITE = 0x171717;

function createRenderer(container, alpha = true) {

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha
  });

  renderer.setPixelRatio(
    Math.min(window.devicePixelRatio, 2)
  );

  renderer.setSize(
    container.clientWidth,
    container.clientHeight
  );

  renderer.shadowMap.enabled = true;

  renderer.outputEncoding = THREE.sRGBEncoding;

  container.appendChild(renderer.domElement);

  return renderer;
}


function resizeRenderer(renderer, camera, container) {

  const width = container.clientWidth;
  const height = container.clientHeight;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  renderer.setSize(width, height);
}


/* =========================================================
   MAIN EV WORLD
   ========================================================= */

const evContainer = document.getElementById("ev-container");

let evScene;
let evCamera;
let evRenderer;
let evGroup;

if (evContainer) {

  evScene = new THREE.Scene();

  evCamera = new THREE.PerspectiveCamera(
    38,
    evContainer.clientWidth / evContainer.clientHeight,
    0.1,
    1000
  );

  evCamera.position.set(7, 4.3, 9);

  evRenderer = createRenderer(evContainer);

  /* LIGHT */

  const ambient = new THREE.AmbientLight(
    0xffffff,
    1.5
  );

  evScene.add(ambient);

  const keyLight = new THREE.DirectionalLight(
    0xffffff,
    2
  );

  keyLight.position.set(6, 8, 6);

  evScene.add(keyLight);

  const orangeLight = new THREE.PointLight(
    AMBER,
    3,
    20
  );

  orangeLight.position.set(0, 2, 3);

  evScene.add(orangeLight);


  /* GROUP */

  evGroup = new THREE.Group();

  evScene.add(evGroup);


  /* GROUND */

  const grid = new THREE.GridHelper(
    20,
    40,
    0x343434,
    0x171717
  );

  grid.position.y = -1.45;

  evScene.add(grid);


  /* =====================================================
     BATTERY SKATEBOARD
     ===================================================== */

  const batteryMaterial = new THREE.MeshStandardMaterial({
    color: 0x3b3b3b,
    metalness: .8,
    roughness: .35,
    transparent: true,
    opacity: .88
  });

  const battery = new THREE.Mesh(
    new THREE.BoxGeometry(6.2, .48, 3.15),
    batteryMaterial
  );

  battery.position.y = -.85;

  evGroup.add(battery);


  /* BATTERY MODULES */

  const moduleMaterial = new THREE.MeshStandardMaterial({
    color: 0x72726e,
    metalness: .9,
    roughness: .3
  });

  for (let x = -2.3; x <= 2.3; x += .92) {

    for (let z = -1.05; z <= 1.05; z += .7) {

      const cell = new THREE.Mesh(
        new THREE.BoxGeometry(.75, .16, .55),
        moduleMaterial
      );

      cell.position.set(
        x,
        -.57,
        z
      );

      evGroup.add(cell);

    }
  }


  /* =====================================================
     BODY FRAME
     ===================================================== */

  const bodyMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xb5b6b0,
    transparent: true,
    opacity: .13,
    roughness: .15,
    metalness: .5,
    side: THREE.DoubleSide
  });

  const body = new THREE.Mesh(
    new THREE.BoxGeometry(6.8, 1.65, 3.45),
    bodyMaterial
  );

  body.position.y = .05;

  evGroup.add(body);


  /* BODY WIREFRAME */

  const bodyEdges = new THREE.EdgesGeometry(
    new THREE.BoxGeometry(6.8, 1.65, 3.45)
  );

  const bodyLines = new THREE.LineSegments(
    bodyEdges,
    new THREE.LineBasicMaterial({
      color: 0xbfc0bb,
      transparent: true,
      opacity: .7
    })
  );

  bodyLines.position.y = .05;

  evGroup.add(bodyLines);


  /* ROOF / CABIN */

  const cabinGeometry = new THREE.BoxGeometry(
    3.8,
    1.25,
    2.7
  );

  const cabin = new THREE.Mesh(
    cabinGeometry,
    new THREE.MeshPhysicalMaterial({
      color: 0x9d9e9a,
      transparent: true,
      opacity: .09,
      roughness: .1,
      metalness: .6
    })
  );

  cabin.position.set(
    .25,
    1.15,
    0
  );

  evGroup.add(cabin);


  const cabinEdges = new THREE.LineSegments(
    new THREE.EdgesGeometry(cabinGeometry),
    new THREE.LineBasicMaterial({
      color: 0xc9cac5,
      transparent: true,
      opacity: .55
    })
  );

  cabinEdges.position.copy(cabin.position);

  evGroup.add(cabinEdges);


  /* =====================================================
     WHEELS
     ===================================================== */

  const wheelPositions = [
    [-2.5, -.65, -1.78],
    [2.5, -.65, -1.78],
    [-2.5, -.65, 1.78],
    [2.5, -.65, 1.78]
  ];

  wheelPositions.forEach(position => {

    const wheel = new THREE.Mesh(
      new THREE.CylinderGeometry(
        .82,
        .82,
        .38,
        32
      ),
      new THREE.MeshStandardMaterial({
        color: 0x101010,
        metalness: .85,
        roughness: .32
      })
    );

    wheel.rotation.x = Math.PI / 2;

    wheel.position.set(...position);

    evGroup.add(wheel);


    /* BRAKE DISC */

    const disc = new THREE.Mesh(
      new THREE.CylinderGeometry(
        .47,
        .47,
        .08,
        32
      ),
      new THREE.MeshStandardMaterial({
        color: AMBER,
        metalness: .85,
        roughness: .25
      })
    );

    disc.rotation.x = Math.PI / 2;

    disc.position.set(
      position[0],
      position[1],
      position[2] - .22
    );

    evGroup.add(disc);

  });


  /* =====================================================
     DUAL MOTORS
     ===================================================== */

  function createMotor(x) {

    const motor = new THREE.Mesh(
      new THREE.CylinderGeometry(
        .48,
        .48,
        .8,
        32
      ),
      new THREE.MeshStandardMaterial({
        color: 0x555651,
        metalness: 1,
        roughness: .25
      })
    );

    motor.rotation.z = Math.PI / 2;

    motor.position.set(
      x,
      -.15,
      0
    );

    evGroup.add(motor);


    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(
        .48,
        .055,
        10,
        32
      ),
      new THREE.MeshBasicMaterial({
        color: AMBER
      })
    );

    ring.rotation.y = Math.PI / 2;

    ring.position.copy(motor.position);

    evGroup.add(ring);
  }

  createMotor(-2.35);
  createMotor(2.35);


  /* =====================================================
     POWER ELECTRONICS
     ===================================================== */

  const inverter = new THREE.Mesh(
    new THREE.BoxGeometry(
      1.25,
      .42,
      .85
    ),
    new THREE.MeshStandardMaterial({
      color: 0x777873,
      metalness: .85,
      roughness: .3
    })
  );

  inverter.position.set(
    0,
    .15,
    0
  );

  evGroup.add(inverter);


  /* ORANGE BUSBAR */

  const busMaterial = new THREE.MeshBasicMaterial({
    color: AMBER
  });

  const busbar = new THREE.Mesh(
    new THREE.BoxGeometry(
      4.6,
      .06,
      .06
    ),
    busMaterial
  );

  busbar.position.set(
    0,
    -.4,
    0
  );

  evGroup.add(busbar);


  /* =====================================================
     SUSPENSION ARMS
     ===================================================== */

  function createSuspension(x, z) {

    const geometry = new THREE.CylinderGeometry(
      .045,
      .045,
      1.3,
      8
    );

    const arm = new THREE.Mesh(
      geometry,
      new THREE.MeshStandardMaterial({
        color: SILVER,
        metalness: 1,
        roughness: .25
      })
    );

    arm.rotation.z = Math.PI / 2.7;

    arm.position.set(
      x,
      -.65,
      z
    );

    evGroup.add(arm);
  }

  createSuspension(-2.5, -1.25);
  createSuspension(-2.5, 1.25);
  createSuspension(2.5, -1.25);
  createSuspension(2.5, 1.25);


  /* =====================================================
     TECHNICAL ORANGE ENERGY FLOW
     ===================================================== */

  const flowMaterial = new THREE.MeshBasicMaterial({
    color: AMBER,
    transparent: true,
    opacity: .7
  });

  const flowGeometry = new THREE.TorusGeometry(
    1.15,
    .018,
    8,
    64
  );

  const flow1 = new THREE.Mesh(
    flowGeometry,
    flowMaterial
  );

  flow1.rotation.x = Math.PI / 2;

  flow1.position.y = -.25;

  evGroup.add(flow1);


  /* =====================================================
     MOUSE PARALLAX
     ===================================================== */

  let targetRotX = 0;
  let targetRotY = 0;

  evContainer.addEventListener(
    "mousemove",
    e => {

      const rect = evContainer.getBoundingClientRect();

      const x =
        (e.clientX - rect.left) / rect.width;

      const y =
        (e.clientY - rect.top) / rect.height;

      targetRotY = (x - .5) * .6;
      targetRotX = (y - .5) * .25;

    }
  );


  evContainer.addEventListener(
    "mouseleave",
    () => {
      targetRotX = 0;
      targetRotY = 0;
    }
  );


  /* =====================================================
     ANIMATION
     ===================================================== */

  function animateEV(time) {

    requestAnimationFrame(animateEV);

    evGroup.rotation.y +=
      (targetRotY - evGroup.rotation.y) * .035;

    evGroup.rotation.x +=
      (targetRotX - evGroup.rotation.x) * .035;

    evGroup.position.y =
      Math.sin(time * .0007) * .08;

    flow1.rotation.z += .012;

    evRenderer.render(
      evScene,
      evCamera
    );
  }

  animateEV(0);


  window.addEventListener("resize", () => {
    resizeRenderer(
      evRenderer,
      evCamera,
      evContainer
    );
  });

}


/* =========================================================
   MINI BATTERY SCENE
   ========================================================= */

function createBatteryScene() {

  const container =
    document.getElementById("battery-scene");

  if (!container) return;

  const scene = new THREE.Scene();

  const camera =
    new THREE.PerspectiveCamera(
      40,
      container.clientWidth / container.clientHeight,
      .1,
      100
    );

  camera.position.set(
    5,
    4,
    6
  );

  const renderer =
    createRenderer(container);


  scene.add(
    new THREE.AmbientLight(
      0xffffff,
      1.8
    )
  );


  const light =
    new THREE.PointLight(
      AMBER,
      3,
      15
    );

  light.position.set(
    2,
    3,
    3
  );

  scene.add(light);


  const group = new THREE.Group();

  scene.add(group);


  /* PACK */

  const pack = new THREE.Mesh(
    new THREE.BoxGeometry(
      4.4,
      .35,
      2.3
    ),
    new THREE.MeshStandardMaterial({
      color: 0x4c4d49,
      metalness: .9,
      roughness: .3
    })
  );

  group.add(pack);


  /* MODULES */

  for (
    let x = -1.6;
    x <= 1.6;
    x += .8
  ) {

    for (
      let z = -.7;
      z <= .7;
      z += .7
    ) {

      const module = new THREE.Mesh(
        new THREE.BoxGeometry(
          .62,
          .13,
          .5
        ),
        new THREE.MeshStandardMaterial({
          color: 0x8b8c87,
          metalness: .8,
          roughness: .3
        })
      );

      module.position.set(
        x,
        .24,
        z
      );

      group.add(module);
    }
  }


  /* GLOW */

  const glow =
    new THREE.Mesh(
      new THREE.RingGeometry(
        1.7,
        1.75,
        64
      ),
      new THREE.MeshBasicMaterial({
        color: AMBER,
        transparent: true,
        opacity: .55,
        side: THREE.DoubleSide
      })
    );

  glow.rotation.x =
    Math.PI / 2;

  glow.position.y =
    -.2;

  group.add(glow);


  function animate() {

    requestAnimationFrame(animate);

    group.rotation.y += .006;

    renderer.render(
      scene,
      camera
    );
  }

  animate();


  window.addEventListener(
    "resize",
    () => resizeRenderer(
      renderer,
      camera,
      container
    )
  );
}

createBatteryScene();


/* =========================================================
   3D CHIP / EMBEDDED SYSTEM
   ========================================================= */

function createChipScene() {

  const container =
    document.getElementById("chip-scene");

  if (!container) return;

  const scene =
    new THREE.Scene();

  const camera =
    new THREE.PerspectiveCamera(
      40,
      container.clientWidth / container.clientHeight,
      .1,
      100
    );

  camera.position.set(
    5,
    4,
    6
  );

  const renderer =
    createRenderer(container);


  scene.add(
    new THREE.AmbientLight(
      0xffffff,
      1.8
    )
  );


  const orange =
    new THREE.PointLight(
      AMBER,
      3,
      15
    );

  orange.position.set(
    2,
    3,
    2
  );

  scene.add(orange);


  const chipGroup =
    new THREE.Group();

  scene.add(chipGroup);


  const chip =
    new THREE.Mesh(
      new THREE.BoxGeometry(
        3,
        .35,
        3
      ),
      new THREE.MeshStandardMaterial({
        color: 0x272825,
        metalness: .7,
        roughness: .35
      })
    );

  chipGroup.add(chip);


  /* CHIP CORE */

  const core =
    new THREE.Mesh(
      new THREE.BoxGeometry(
        1.3,
        .22,
        1.3
      ),
      new THREE.MeshStandardMaterial({
        color: 0x8b8c87,
        metalness: .9,
        roughness: .25
      })
    );

  core.position.y =
    .3;

  chipGroup.add(core);


  /* PINS */

  const pinMaterial =
    new THREE.MeshStandardMaterial({
      color: AMBER,
      metalness: 1,
      roughness: .2
    });


  for (
    let i = -1.1;
    i <= 1.1;
    i += .35
  ) {

    const pin1 =
      new THREE.Mesh(
        new THREE.BoxGeometry(
          .07,
          .12,
          .5
        ),
        pinMaterial
      );

    pin1.position.set(
      i,
      .1,
      1.7
    );

    chipGroup.add(pin1);


    const pin2 =
      pin1.clone();

    pin2.position.z =
      -1.7;

    chipGroup.add(pin2);


    const pin3 =
      new THREE.Mesh(
        new THREE.BoxGeometry(
          .5,
          .12,
          .07
        ),
        pinMaterial
      );

    pin3.position.set(
      1.7,
      .1,
      i
    );

    chipGroup.add(pin3);


    const pin4 =
      pin3.clone();

    pin4.position.x =
      -1.7;

    chipGroup.add(pin4);
  }


  /* CIRCUIT ORBITS */

  for (let i = 0; i < 3; i++) {

    const orbit =
      new THREE.Mesh(
        new THREE.TorusGeometry(
          1.8 + i * .45,
          .012,
          8,
          64
        ),
        new THREE.MeshBasicMaterial({
          color: i === 1 ? AMBER : 0x777873,
          transparent: true,
          opacity: .5
        })
      );

    orbit.rotation.x =
      Math.PI / 2;

    chipGroup.add(orbit);
  }


  function animate(time) {

    requestAnimationFrame(animate);

    chipGroup.rotation.y =
      time * .00025;

    chipGroup.rotation.x =
      Math.sin(time * .0005) * .08;

    renderer.render(
      scene,
      camera
    );
  }

  animate(0);


  window.addEventListener(
    "resize",
    () => resizeRenderer(
      renderer,
      camera,
      container
    )
  );
}

createChipScene();


/* =========================================================
   PROJECT 01 — EV ENERGY
   ========================================================= */

function createEVProjectScene() {

  const container =
    document.getElementById("ev-project-scene");

  if (!container) return;

  const scene =
    new THREE.Scene();

  const camera =
    new THREE.PerspectiveCamera(
      40,
      container.clientWidth / container.clientHeight,
      .1,
      100
    );

  camera.position.set(
    5,
    3,
    6
  );

  const renderer =
    createRenderer(container);


  scene.add(
    new THREE.AmbientLight(
      0xffffff,
      1.7
    )
  );


  const light =
    new THREE.PointLight(
      AMBER,
      4,
      15
    );

  light.position.set(
    2,
    3,
    3
  );

  scene.add(light);


  const group =
    new THREE.Group();

  scene.add(group);


  /* CHARGING STATION */

  const station =
    new THREE.Mesh(
      new THREE.BoxGeometry(
        .9,
        2.6,
        .6
      ),
      new THREE.MeshStandardMaterial({
        color: 0x444541,
        metalness: .8,
        roughness: .3
      })
    );

  station.position.set(
    -2.7,
    .3,
    0
  );

  group.add(station);


  /* SCREEN */

  const screen =
    new THREE.Mesh(
      new THREE.BoxGeometry(
        .55,
        .7,
        .03
      ),
      new THREE.MeshBasicMaterial({
        color: AMBER
      })
    );

  screen.position.set(
    -2.7,
    .65,
    -.32
  );

  group.add(screen);


  /* BATTERY */

  const battery =
    new THREE.Mesh(
      new THREE.BoxGeometry(
        2.6,
        .45,
        1.5
      ),
      new THREE.MeshStandardMaterial({
        color: 0x60615c,
        metalness: .9,
        roughness: .3
      })
    );

  battery.position.set(
    .5,
    -.7,
    0
  );

  group.add(battery);


  /* ENERGY RINGS */

  for (let i = 0; i < 3; i++) {

    const ring =
      new THREE.Mesh(
        new THREE.TorusGeometry(
          .75 + i * .22,
          .018,
          8,
          48
        ),
        new THREE.MeshBasicMaterial({
          color: AMBER,
          transparent: true,
          opacity: .6
        })
      );

    ring.rotation.y =
      Math.PI / 2;

    ring.position.set(
      -1.4,
      0,
      0
    );

    group.add(ring);
  }


  function animate(time) {

    requestAnimationFrame(animate);

    group.rotation.y =
      Math.sin(time * .0004) * .3;

    renderer.render(
      scene,
      camera
    );
  }

  animate(0);


  window.addEventListener(
    "resize",
    () => resizeRenderer(
      renderer,
      camera,
      container
    )
  );
}

createEVProjectScene();


/* =========================================================
   PROJECT 02 — SOLAR
   ========================================================= */

function createSolarScene() {

  const container =
    document.getElementById("solar-project-scene");

  if (!container) return;

  const scene =
    new THREE.Scene();

  const camera =
    new THREE.PerspectiveCamera(
      40,
      container.clientWidth / container.clientHeight,
      .1,
      100
    );

  camera.position.set(
    4,
    3,
    6
  );

  const renderer =
    createRenderer(container);


  scene.add(
    new THREE.AmbientLight(
      0xffffff,
      1.8
    )
  );


  const orange =
    new THREE.PointLight(
      AMBER,
      4,
      15
    );

  orange.position.set(
    2,
    4,
    3
  );

  scene.add(orange);


  const group =
    new THREE.Group();

  scene.add(group);


  /* SOLAR PANEL */

  const panel =
    new THREE.Mesh(
      new THREE.BoxGeometry(
        4,
        .12,
        2.6
      ),
      new THREE.MeshStandardMaterial({
        color: 0x383936,
        metalness: .7,
        roughness: .3
      })
    );

  panel.rotation.x =
    -.3;

  group.add(panel);


  /* SOLAR CELLS */

  for (
    let x = -1.5;
    x <= 1.5;
    x += .5
  ) {

    for (
      let z = -.9;
      z <= .9;
      z += .45
    ) {

      const cell =
        new THREE.Mesh(
          new THREE.BoxGeometry(
            .42,
            .025,
            .37
          ),
          new THREE.MeshBasicMaterial({
            color: 0x777873
          })
        );

      cell.position.set(
        x,
        .08,
        z
      );

      cell.rotation.x =
        -.3;

      group.add(cell);
    }
  }


  /* CLEANING ARM */

  const arm =
    new THREE.Mesh(
      new THREE.BoxGeometry(
        .08,
        .08,
        3
      ),
      new THREE.MeshStandardMaterial({
        color: AMBER,
        metalness: 1
      })
    );

  arm.position.set(
    0,
    .3,
    0
  );

  arm.rotation.x =
    -.3;

  group.add(arm);


  function animate(time) {

    requestAnimationFrame(animate);

    group.rotation.y =
      time * .00025;

    renderer.render(
      scene,
      camera
    );
  }

  animate(0);


  window.addEventListener(
    "resize",
    () => resizeRenderer(
      renderer,
      camera,
      container
    )
  );
}

createSolarScene();


/* =========================================================
   PROJECT 03 — MACHINE LEARNING
   ========================================================= */

function createMLScene() {

  const container =
    document.getElementById("ml-project-scene");

  if (!container) return;

  const scene =
    new THREE.Scene();

  const camera =
    new THREE.PerspectiveCamera(
      40,
      container.clientWidth / container.clientHeight,
      .1,
      100
    );

  camera.position.set(
    0,
    0,
    8
  );

  const renderer =
    createRenderer(container);


  scene.add(
    new THREE.AmbientLight(
      0xffffff,
      2
    )
  );


  const group =
    new THREE.Group();

  scene.add(group);


  const nodes = [];


  for (let layer = 0; layer < 4; layer++) {

    const count =
      layer === 0 || layer === 3 ? 4 : 5;

    for (let i = 0; i < count; i++) {

      const node =
        new THREE.Mesh(
          new THREE.SphereGeometry(
            .13,
            16,
            16
          ),
          new THREE.MeshBasicMaterial({
            color:
              layer === 3
                ? AMBER
                : 0xb7b8b3
          })
        );

      node.position.set(
        (layer - 1.5) * 1.5,
        (i - (count - 1) / 2) * .75,
        0
      );

      group.add(node);

      nodes.push(node);
    }
  }


  /* CONNECTIONS */

  const lineMaterial =
    new THREE.LineBasicMaterial({
      color: 0x777873,
      transparent: true,
      opacity: .35
    });


  for (let layer = 0; layer < 3; layer++) {

    const current =
      nodes.filter(n =>
        Math.abs(
          n.position.x -
          (layer - 1.5) * 1.5
        ) < .1
      );

    const next =
      nodes.filter(n =>
        Math.abs(
          n.position.x -
          (layer + 1 - 1.5) * 1.5
        ) < .1
      );


    current.forEach(a => {

      next.forEach(b => {

        const points = [
          a.position.clone(),
          b.position.clone()
        ];

        const geometry =
          new THREE.BufferGeometry()
            .setFromPoints(points);

        group.add(
          new THREE.Line(
            geometry,
            lineMaterial
          )
        );

      });

    });
  }


  function animate(time) {

    requestAnimationFrame(animate);

    group.rotation.y =
      Math.sin(time * .0004) * .25;

    renderer.render(
      scene,
      camera
    );
  }

  animate(0);


  window.addEventListener(
    "resize",
    () => resizeRenderer(
      renderer,
      camera,
      container
    )
  );
}

createMLScene();


/* =========================================================
   PROJECT 04 — GPS
   ========================================================= */

function createGPSScene() {

  const container =
    document.getElementById("gps-project-scene");

  if (!container) return;

  const scene =
    new THREE.Scene();

  const camera =
    new THREE.PerspectiveCamera(
      40,
      container.clientWidth / container.clientHeight,
      .1,
      100
    );

  camera.position.set(
    4,
    3,
    7
  );

  const renderer =
    createRenderer(container);


  scene.add(
    new THREE.AmbientLight(
      0xffffff,
      1.8
    )
  );


  const orange =
    new THREE.PointLight(
      AMBER,
      4,
      15
    );

  orange.position.set(
    3,
    4,
    3
  );

  scene.add(orange);


  const group =
    new THREE.Group();

  scene.add(group);


  /* EARTH */

  const earth =
    new THREE.Mesh(
      new THREE.SphereGeometry(
        1.65,
        32,
        32
      ),
      new THREE.MeshStandardMaterial({
        color: 0x383936,
        metalness: .4,
        roughness: .8,
        wireframe: true
      })
    );

  group.add(earth);


  /* SATELLITES */

  for (let i = 0; i < 4; i++) {

    const satellite =
      new THREE.Mesh(
        new THREE.BoxGeometry(
          .35,
          .18,
          .18
        ),
        new THREE.MeshStandardMaterial({
          color:
            i === 0
              ? AMBER
              : 0x9b9c97,
          metalness: .8
        })
      );

    const angle =
      i * Math.PI / 2;

    satellite.position.set(
      Math.cos(angle) * 3,
      Math.sin(angle * 1.3) * 1.5,
      Math.sin(angle) * 3
    );

    group.add(satellite);
  }


  /* ORBIT */

  const orbit =
    new THREE.Mesh(
      new THREE.TorusGeometry(
        3,
        .015,
        8,
        80
      ),
      new THREE.MeshBasicMaterial({
        color: AMBER,
        transparent: true,
        opacity: .55
      })
    );

  orbit.rotation.x =
    .7;

  group.add(orbit);


  function animate(time) {

    requestAnimationFrame(animate);

    group.rotation.y =
      time * .00025;

    renderer.render(
      scene,
      camera
    );
  }

  animate(0);


  window.addEventListener(
    "resize",
    () => resizeRenderer(
      renderer,
      camera,
      container
    )
  );
}

createGPSScene();


/* =========================================================
   SCROLL REVEALS
   ========================================================= */

const revealElements =
  document.querySelectorAll(
    ".section-header, .project-card, .timeline-item, .about-copy, .skills-list"
  );


const observer =
  new IntersectionObserver(
    entries => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          entry.target.style.opacity = "1";
          entry.target.style.transform =
            "translateY(0)";

          observer.unobserve(
            entry.target
          );
        }

      });

    },
    {
      threshold: .12
    }
  );


revealElements.forEach(el => {

  el.style.opacity = "0";

  el.style.transform =
    "translateY(50px)";

  el.style.transition =
    "opacity 1s ease, transform 1s cubic-bezier(.2,.7,.2,1)";

  observer.observe(el);

});


/* =========================================================
   PROJECT 3D TILT
   ========================================================= */

document.querySelectorAll(
  ".project-visual, .visual-card, .skills-visual"
).forEach(card => {

  card.addEventListener(
    "mousemove",
    e => {

      const rect =
        card.getBoundingClientRect();

      const x =
        (e.clientX - rect.left) /
        rect.width -
        .5;

      const y =
        (e.clientY - rect.top) /
        rect.height -
        .5;

      card.style.transform =
        `perspective(1200px)
         rotateX(${y * -2}deg)
         rotateY(${x * 2}deg)`;

    }
  );


  card.addEventListener(
    "mouseleave",
    () => {

      card.style.transform =
        "perspective(1200px) rotateX(0) rotateY(0)";

    }
  );

});


/* =========================================================
   GLOBAL MOUSE DEPTH
   ========================================================= */

window.addEventListener(
  "mousemove",
  e => {

    const px =
      (e.clientX / window.innerWidth - .5);

    const py =
      (e.clientY / window.innerHeight - .5);


    document.querySelectorAll(
      ".technical-label"
    ).forEach((label, index) => {

      const depth =
        (index + 1) * 5;

      label.style.transform =
        `translate(
          ${px * depth}px,
          ${py * depth}px
        )`;

    });

  }
);


/* =========================================================
   ACTIVE NAV
   ========================================================= */

const sections =
  document.querySelectorAll(
    "section[id]"
  );

const navLinks =
  document.querySelectorAll(
    ".nav-links a"
  );


window.addEventListener(
  "scroll",
  () => {

    let current = "";

    sections.forEach(section => {

      const top =
        section.offsetTop - 300;

      if (
        window.scrollY >= top
      ) {
        current =
          section.getAttribute("id");
      }

    });


    navLinks.forEach(link => {

      link.style.color =
        link.getAttribute("href") === "#" + current
          ? "#e59a55"
          : "";

    });

  }
);


/* =========================================================
   SMOOTH IMAGE-FREE DEPTH EFFECT
   ========================================================= */

window.addEventListener(
  "scroll",
  () => {

    const scroll =
      window.scrollY;

    const hero =
      document.querySelector(".hero-copy");

    if (hero) {

      hero.style.transform =
        `translateY(calc(-50% + ${scroll * .12}px))`;

      hero.style.opacity =
        Math.max(
          0,
          1 - scroll / 700
        );

    }

  },
  { passive: true }
);
