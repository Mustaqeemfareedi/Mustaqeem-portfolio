/* =========================================================
   MUSTAQEEM FAREEDI
   NEON AUTOMOTIVE ENGINEERING PORTFOLIO
   Three.js r128
========================================================= */

const THREE = window.THREE;

if (!THREE) {
  document.body.innerHTML = `
    <div style="
      min-height:100vh;
      background:#030407;
      color:white;
      display:flex;
      align-items:center;
      justify-content:center;
      font-family:Arial;
      text-align:center;
      padding:30px;
    ">
      <div>
        <h1>Three.js could not load.</h1>
        <p>Please refresh the page.</p>
      </div>
    </div>`;
  throw new Error("Three.js failed to load");
}


/* =========================================================
   LOADER
========================================================= */

window.addEventListener("load", () => {
  setTimeout(() => {
    const loader = document.getElementById("loader");

    if (loader) {
      loader.style.opacity = "0";
      loader.style.pointerEvents = "none";

      setTimeout(() => {
        loader.remove();
      }, 1000);
    }
  }, 1800);
});


/* =========================================================
   GLOBAL CURSOR
========================================================= */

const cursor = document.querySelector(".cursor");
const cursorDot = document.querySelector(".cursor-dot");

window.addEventListener("mousemove", e => {

  if (cursor) {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
  }

  if (cursorDot) {
    cursorDot.style.left = e.clientX + "px";
    cursorDot.style.top = e.clientY + "px";
  }

});


/* =========================================================
   HELPERS
========================================================= */

function makeRenderer(container, alpha = true) {

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: alpha
  });

  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  renderer.setSize(
    container.clientWidth || 500,
    container.clientHeight || 400
  );

  renderer.outputEncoding = THREE.sRGBEncoding;

  renderer.shadowMap.enabled = true;

  return renderer;
}


function resizeRenderer(renderer, camera, container) {

  const width = container.clientWidth || 500;
  const height = container.clientHeight || 400;

  renderer.setSize(width, height, false);

  camera.aspect = width / height;
  camera.updateProjectionMatrix();

}


/* =========================================================
   MATERIALS
========================================================= */

const MAT = {

  dark: new THREE.MeshStandardMaterial({
    color: 0x080b10,
    metalness: .9,
    roughness: .28
  }),

  graphite: new THREE.MeshStandardMaterial({
    color: 0x1b2028,
    metalness: .95,
    roughness: .2
  }),

  silver: new THREE.MeshStandardMaterial({
    color: 0x8995a5,
    metalness: .9,
    roughness: .2
  }),

  glass: new THREE.MeshPhysicalMaterial({
    color: 0x3d7b9c,
    transparent: true,
    opacity: .14,
    metalness: .15,
    roughness: .05,
    transmission: .25,
    side: THREE.DoubleSide
  }),

  blue: new THREE.MeshStandardMaterial({
    color: 0x167cff,
    emissive: 0x083b8a,
    emissiveIntensity: 2,
    metalness: .65,
    roughness: .2
  }),

  cyan: new THREE.MeshStandardMaterial({
    color: 0x4eeaff,
    emissive: 0x0b8ea8,
    emissiveIntensity: 2.5,
    metalness: .5,
    roughness: .2
  }),

  orange: new THREE.MeshStandardMaterial({
    color: 0xff762b,
    emissive: 0x7a2100,
    emissiveIntensity: 1.8,
    metalness: .65,
    roughness: .2
  }),

  violet: new THREE.MeshStandardMaterial({
    color: 0x754dff,
    emissive: 0x3210b0,
    emissiveIntensity: 2,
    metalness: .6,
    roughness: .2
  })
};


/* =========================================================
   EV CREATION
========================================================= */

function createWheel() {

  const group = new THREE.Group();

  const tire = new THREE.Mesh(
    new THREE.TorusGeometry(.72, .23, 16, 40),
    new THREE.MeshStandardMaterial({
      color: 0x050608,
      metalness: .15,
      roughness: .85
    })
  );

  tire.rotation.y = Math.PI / 2;

  group.add(tire);


  const rim = new THREE.Mesh(
    new THREE.CylinderGeometry(.48, .48, .16, 24),
    MAT.silver
  );

  rim.rotation.z = Math.PI / 2;

  group.add(rim);


  const hub = new THREE.Mesh(
    new THREE.CylinderGeometry(.16, .16, .22, 20),
    MAT.blue
  );

  hub.rotation.z = Math.PI / 2;

  group.add(hub);


  for (let i = 0; i < 5; i++) {

    const spoke = new THREE.Mesh(
      new THREE.BoxGeometry(.07, .05, .55),
      MAT.silver
    );

    spoke.position.z = .02;
    spoke.rotation.z = (Math.PI * 2 / 5) * i;

    group.add(spoke);
  }

  return group;
}


function createBattery() {

  const battery = new THREE.Group();

  const pack = new THREE.Mesh(
    new THREE.BoxGeometry(6.6, .34, 2.8),
    new THREE.MeshStandardMaterial({
      color: 0x111821,
      metalness: .75,
      roughness: .32
    })
  );

  battery.add(pack);


  for (let x = -2.7; x <= 2.7; x += .68) {

    const module = new THREE.Mesh(
      new THREE.BoxGeometry(.54, .09, 2.45),
      MAT.blue
    );

    module.position.set(x, .22, 0);

    battery.add(module);

  }


  const rails = [];

  [-1.25, 1.25].forEach(z => {

    const rail = new THREE.Mesh(
      new THREE.BoxGeometry(6.7, .13, .08),
      MAT.silver
    );

    rail.position.set(0, .28, z);

    battery.add(rail);

  });


  return battery;
}


function createMotor() {

  const motor = new THREE.Group();

  const body = new THREE.Mesh(
    new THREE.CylinderGeometry(.55, .55, .9, 32),
    MAT.orange
  );

  body.rotation.z = Math.PI / 2;

  motor.add(body);


  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(.55, .06, 12, 32),
    MAT.silver
  );

  ring.rotation.y = Math.PI / 2;

  motor.add(ring);


  return motor;
}


function createEV() {

  const car = new THREE.Group();


  /* BATTERY */

  const battery = createBattery();

  battery.position.y = .45;

  car.add(battery);


  /* LOWER FRAME */

  const frame = new THREE.Mesh(
    new THREE.BoxGeometry(7.2, .25, 3.1),
    MAT.graphite
  );

  frame.position.y = .72;

  car.add(frame);


  /* FRONT / REAR SUBFRAMES */

  [-2.9, 2.9].forEach(x => {

    const sub = new THREE.Mesh(
      new THREE.BoxGeometry(1.0, .5, 2.8),
      MAT.dark
    );

    sub.position.set(x, .85, 0);

    car.add(sub);

  });


  /* BODY SIDE SKIRTS */

  [-1.48, 1.48].forEach(z => {

    const side = new THREE.Mesh(
      new THREE.BoxGeometry(6.8, .45, .12),
      MAT.silver
    );

    side.position.set(0, 1.0, z);

    car.add(side);

  });


  /* CABIN */

  const cabin = new THREE.Mesh(
    new THREE.BoxGeometry(3.4, 1.1, 2.55),
    MAT.glass
  );

  cabin.position.set(.25, 1.75, 0);

  cabin.rotation.z = -.03;

  car.add(cabin);


  /* ROOF */

  const roof = new THREE.Mesh(
    new THREE.BoxGeometry(2.8, .12, 2.35),
    MAT.glass
  );

  roof.position.set(.2, 2.32, 0);

  car.add(roof);


  /* A-PILLARS */

  [-.85, .85].forEach(z => {

    const pillar = new THREE.Mesh(
      new THREE.BoxGeometry(1.15, .08, .08),
      MAT.silver
    );

    pillar.position.set(-.65, 2.0, z);

    pillar.rotation.z = -.6;

    car.add(pillar);

  });


  /* FRONT NOSE */

  const nose = new THREE.Mesh(
    new THREE.BoxGeometry(1.15, .35, 2.7),
    MAT.dark
  );

  nose.position.set(-3.3, 1.15, 0);

  car.add(nose);


  /* REAR */

  const rear = new THREE.Mesh(
    new THREE.BoxGeometry(.8, .45, 2.7),
    MAT.dark
  );

  rear.position.set(3.3, 1.15, 0);

  car.add(rear);


  /* HEADLIGHTS */

  [-.95, .95].forEach(z => {

    const light = new THREE.Mesh(
      new THREE.BoxGeometry(.18, .08, .5),
      MAT.cyan
    );

    light.position.set(-3.92, 1.35, z);

    car.add(light);

  });


  /* REAR LIGHTS */

  [-.95, .95].forEach(z => {

    const light = new THREE.Mesh(
      new THREE.BoxGeometry(.1, .1, .45),
      MAT.orange
    );

    light.position.set(3.72, 1.35, z);

    car.add(light);

  });


  /* WHEELS */

  const wheelPositions = [
    [-2.45, .72, -1.62],
    [-2.45, .72, 1.62],
    [2.45, .72, -1.62],
    [2.45, .72, 1.62]
  ];

  wheelPositions.forEach(p => {

    const wheel = createWheel();

    wheel.position.set(...p);

    car.add(wheel);

  });


  /* MOTORS */

  const frontMotor = createMotor();

  frontMotor.position.set(-2.45, .85, 0);

  car.add(frontMotor);


  const rearMotor = createMotor();

  rearMotor.position.set(2.45, .85, 0);

  car.add(rearMotor);


  /* INVERTER */

  const inverter = new THREE.Mesh(
    new THREE.BoxGeometry(1.1, .4, 1.25),
    MAT.violet
  );

  inverter.position.set(0, 1.25, 0);

  car.add(inverter);


  /* BUS BARS */

  [-.35, .35].forEach(z => {

    const bus = new THREE.Mesh(
      new THREE.BoxGeometry(5.4, .08, .06),
      MAT.orange
    );

    bus.position.set(0, 1.25, z);

    car.add(bus);

  });


  /* SUSPENSION ARMS */

  wheelPositions.forEach(p => {

    const arm = new THREE.Mesh(
      new THREE.BoxGeometry(1.0, .08, .08),
      MAT.silver
    );

    arm.position.set(p[0], .8, p[2] * .65);

    arm.rotation.y = p[2] > 0 ? .35 : -.35;

    car.add(arm);

  });


  return car;
}


/* =========================================================
   EV HERO SCENE
========================================================= */

function initEV() {

  const container = document.getElementById("ev-container");

  if (!container) return;

  container.innerHTML = "";

  const scene = new THREE.Scene();

  scene.fog = new THREE.FogExp2(0x030407, .035);


  const camera = new THREE.PerspectiveCamera(
    35,
    container.clientWidth / container.clientHeight,
    .1,
    100
  );

  camera.position.set(8, 5.2, 10);


  const renderer = makeRenderer(container);

  container.appendChild(renderer.domElement);


  /* LIGHTS */

  const ambient = new THREE.AmbientLight(0x8aa8ff, .45);

  scene.add(ambient);


  const key = new THREE.DirectionalLight(0x8dc5ff, 2.4);

  key.position.set(-5, 8, 8);

  scene.add(key);


  const rim = new THREE.PointLight(0x674dff, 5, 15);

  rim.position.set(4, 3, -5);

  scene.add(rim);


  const orangeLight = new THREE.PointLight(0xff6425, 3, 10);

  orangeLight.position.set(3, 1, 3);

  scene.add(orangeLight);


  /* CAR */

  const car = createEV();

  scene.add(car);

  car.rotation.y = -.35;


  /* GROUND */

  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(30, 30),
    new THREE.MeshBasicMaterial({
      color: 0x020306,
      transparent: true,
      opacity: .7
    })
  );

  ground.rotation.x = -Math.PI / 2;

  ground.position.y = -.02;

  scene.add(ground);


  /* ENERGY RING */

  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(4.4, .015, 8, 120),
    MAT.cyan
  );

  ring.rotation.x = Math.PI / 2;

  ring.position.y = .05;

  scene.add(ring);


  /* GRID */

  const grid = new THREE.GridHelper(
    20,
    30,
    0x12325a,
    0x071326
  );

  grid.position.y = -.01;

  scene.add(grid);


  /* PARTICLES */

  const particleGeometry = new THREE.BufferGeometry();

  const count = 500;

  const positions = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {

    positions[i * 3] = (Math.random() - .5) * 18;

    positions[i * 3 + 1] = Math.random() * 7;

    positions[i * 3 + 2] = (Math.random() - .5) * 14;

  }

  particleGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(positions, 3)
  );

  const particles = new THREE.Points(
    particleGeometry,
    new THREE.PointsMaterial({
      color: 0x55cfff,
      size: .025,
      transparent: true,
      opacity: .7
    })
  );

  scene.add(particles);


  /* MOUSE */

  let mouseX = 0;
  let mouseY = 0;

  container.addEventListener("mousemove", e => {

    const rect = container.getBoundingClientRect();

    mouseX =
      ((e.clientX - rect.left) / rect.width - .5) * 2;

    mouseY =
      ((e.clientY - rect.top) / rect.height - .5) * 2;

  });


  function animate() {

    requestAnimationFrame(animate);

    car.rotation.y +=
      (-.35 + mouseX * .25 - car.rotation.y) * .025;

    car.position.y =
      Math.sin(Date.now() * .001) * .035;

    ring.rotation.z += .0015;

    particles.rotation.y += .00025;

    camera.position.x +=
      (8 + mouseX * 1.3 - camera.position.x) * .025;

    camera.position.y +=
      (5.2 - mouseY * .6 - camera.position.y) * .025;

    camera.lookAt(0, 1, 0);

    renderer.render(scene, camera);

  }

  animate();


  window.addEventListener("resize", () => {
    resizeRenderer(renderer, camera, container);
  });

}


/* =========================================================
   BATTERY SCENE
========================================================= */

function initBattery() {

  const container = document.getElementById("battery-scene");

  if (!container) return;

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    35,
    container.clientWidth / container.clientHeight,
    .1,
    100
  );

  camera.position.set(5, 4, 7);

  const renderer = makeRenderer(container);

  container.appendChild(renderer.domElement);


  scene.add(new THREE.AmbientLight(0x668cff, .7));

  const light = new THREE.PointLight(0x55eaff, 5);

  light.position.set(2, 4, 4);

  scene.add(light);


  const battery = createBattery();

  battery.scale.set(1.05, 1.05, 1.05);

  scene.add(battery);


  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(3, .015, 8, 100),
    MAT.cyan
  );

  ring.rotation.x = Math.PI / 2;

  ring.position.y = -.3;

  scene.add(ring);


  function animate() {

    requestAnimationFrame(animate);

    battery.rotation.y += .003;

    ring.rotation.z -= .002;

    renderer.render(scene, camera);

  }

  animate();


  window.addEventListener("resize", () => {
    resizeRenderer(renderer, camera, container);
  });

}


/* =========================================================
   GENERIC TECH SCENE
========================================================= */

function createTechScene(id, type) {

  const container = document.getElementById(id);

  if (!container) return;

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    40,
    container.clientWidth / container.clientHeight,
    .1,
    100
  );

  camera.position.set(3.8, 2.8, 5);

  const renderer = makeRenderer(container);

  container.appendChild(renderer.domElement);


  scene.add(
    new THREE.AmbientLight(0x789aff, .6)
  );


  const light = new THREE.PointLight(
    type === "orange" ? 0xff6b25 : 0x4e9dff,
    4
  );

  light.position.set(2, 4, 3);

  scene.add(light);


  const group = new THREE.Group();

  scene.add(group);


  if (type === "chip") {

    const board = new THREE.Mesh(
      new THREE.BoxGeometry(3, .12, 2),
      MAT.dark
    );

    group.add(board);


    for (let x = -1.1; x <= 1.1; x += .55) {

      for (let z = -.65; z <= .65; z += .55) {

        const chip = new THREE.Mesh(
          new THREE.BoxGeometry(.32, .15, .32),
          MAT.blue
        );

        chip.position.set(x, .15, z);

        group.add(chip);

      }

    }

    for (let i = 0; i < 8; i++) {

      const trace = new THREE.Mesh(
        new THREE.BoxGeometry(1.8, .025, .025),
        MAT.cyan
      );

      trace.position.set(
        0,
        .1,
        -.9 + i * .25
      );

      group.add(trace);

    }

  }


  if (type === "power") {

    const coil = new THREE.Mesh(
      new THREE.TorusGeometry(1, .22, 12, 40),
      MAT.orange
    );

    coil.rotation.x = Math.PI / 2;

    group.add(coil);


    const core = new THREE.Mesh(
      new THREE.CylinderGeometry(.55, .55, 1.3, 24),
      MAT.graphite
    );

    group.add(core);

  }


  if (type === "control") {

    for (let i = 0; i < 5; i++) {

      const box = new THREE.Mesh(
        new THREE.BoxGeometry(2.6 - i * .3, .18, .18),
        i % 2 ? MAT.blue : MAT.violet
      );

      box.position.y = i * .35 - .6;

      group.add(box);

    }

  }


  if (type === "software") {

    const nodes = [];

    for (let i = 0; i < 14; i++) {

      const node = new THREE.Mesh(
        new THREE.SphereGeometry(.12, 12, 12),
        MAT.cyan
      );

      node.position.set(
        (Math.random() - .5) * 3,
        (Math.random() - .5) * 2,
        (Math.random() - .5) * 2
      );

      group.add(node);

      nodes.push(node);

    }

  }


  function animate() {

    requestAnimationFrame(animate);

    group.rotation.y += .006;

    group.rotation.x =
      Math.sin(Date.now() * .0007) * .1;

    renderer.render(scene, camera);

  }

  animate();


  window.addEventListener("resize", () => {
    resizeRenderer(renderer, camera, container);
  });

}


/* =========================================================
   PROJECT SCENE
========================================================= */

function projectScene(id, type) {

  const container = document.getElementById(id);

  if (!container) return;

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    40,
    container.clientWidth / container.clientHeight,
    .1,
    100
  );

  camera.position.set(5, 3, 6);

  const renderer = makeRenderer(container);

  container.appendChild(renderer.domElement);


  scene.add(
    new THREE.AmbientLight(0x668cff, .8)
  );


  const light = new THREE.PointLight(0x55cfff, 5);

  light.position.set(3, 5, 4);

  scene.add(light);


  const group = new THREE.Group();

  scene.add(group);


  if (type === "ev") {

    const ev = createEV();

    ev.scale.set(.65, .65, .65);

    group.add(ev);

  }


  if (type === "solar") {

    for (let x = -2; x <= 2; x++) {

      for (let z = -1; z <= 1; z++) {

        const panel = new THREE.Mesh(
          new THREE.BoxGeometry(.85, .06, .85),
          MAT.blue
        );

        panel.position.set(x * .9, 0, z * .9);

        group.add(panel);

      }

    }

  }


  if (type === "ml") {

    for (let i = 0; i < 25; i++) {

      const sphere = new THREE.Mesh(
        new THREE.SphereGeometry(.1, 12, 12),
        MAT.violet
      );

      sphere.position.set(
        (Math.random() - .5) * 3,
        (Math.random() - .5) * 2,
        (Math.random() - .5) * 2
      );

      group.add(sphere);

    }

  }


  if (type === "gps") {

    const earth = new THREE.Mesh(
      new THREE.SphereGeometry(1.5, 32, 32),
      new THREE.MeshStandardMaterial({
        color: 0x123c78,
        emissive: 0x071a44,
        emissiveIntensity: 1,
        wireframe: true
      })
    );

    group.add(earth);


    for (let i = 0; i < 5; i++) {

      const satellite = new THREE.Mesh(
        new THREE.BoxGeometry(.2, .08, .08),
        MAT.orange
      );

      const angle = i * 1.25;

      satellite.position.set(
        Math.cos(angle) * 2.3,
        Math.sin(angle * 1.7) * 1.2,
        Math.sin(angle) * 2.3
      );

      group.add(satellite);

    }

  }


  function animate() {

    requestAnimationFrame(animate);

    group.rotation.y += .005;

    renderer.render(scene, camera);

  }

  animate();


  window.addEventListener("resize", () => {
    resizeRenderer(renderer, camera, container);
  });

}


/* =========================================================
   INITIALIZE EVERYTHING
========================================================= */

initEV();

initBattery();

createTechScene("chip-scene", "chip");
createTechScene("power-scene", "power");
createTechScene("control-scene", "control");
createTechScene("software-scene", "software");

projectScene("ev-project", "ev");
projectScene("solar-project", "solar");
projectScene("ml-project", "ml");
projectScene("gps-project", "gps");


/* =========================================================
   SCROLL EFFECT
========================================================= */

window.addEventListener("scroll", () => {

  const scrollY = window.scrollY;

  const hero = document.querySelector(".hero-copy");

  if (hero && scrollY < window.innerHeight) {

    hero.style.transform =
      `translateY(${scrollY * .12}px)`;

    hero.style.opacity =
      Math.max(.25, 1 - scrollY / 800);

  }

});
