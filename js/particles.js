/**
 * Portfolio — Particle System & Three.js Scenes
 * Galaxy background, avatar silhouette fallback, globe, skills network
 */

const ParticleSystem = (() => {
  let galaxyScene, galaxyCamera, galaxyRenderer;
  let mouseX = 0, mouseY = 0;
  let animationId = null;

  // Boot sequence logs
  const BOOT_LOGS = [
    '[OK] Loading kernel modules...',
    '[OK] Initializing neural network v3.7.2',
    '[OK] Connecting to quantum core...',
    '[OK] Rendering particle engine...',
    '[OK] Calibrating holographic display...',
    '[OK] Syncing star field database (★ 12,847 entries)',
    '[OK] Loading WebGL shaders...',
    '[OK] Establishing secure connection...',
    '[OK] Developer interface online',
    '[OK] Welcome to the portfolio.',
  ];

  /**
   * Procedural textures for round stars, nebula, and glow sprites
   */
  function createGlowTexture(colorStops, size = 64) {
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    const center = size / 2;
    const gradient = ctx.createRadialGradient(center, center, 0, center, center, center);

    colorStops.forEach(([stop, color]) => gradient.addColorStop(stop, color));
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }

  function createStarTexture(variant = 'soft') {
    const size = 128;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    const cx = size / 2;
    const cy = size / 2;

    const core = ctx.createRadialGradient(cx, cy, 0, cx, cy, size * 0.22);
    core.addColorStop(0, 'rgba(255, 255, 255, 1)');
    core.addColorStop(0.35, 'rgba(255, 255, 255, 0.55)');
    core.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = core;
    ctx.beginPath();
    ctx.arc(cx, cy, size * 0.22, 0, Math.PI * 2);
    ctx.fill();

    const halo = ctx.createRadialGradient(cx, cy, 0, cx, cy, size * 0.5);
    halo.addColorStop(0, 'rgba(180, 220, 255, 0.35)');
    halo.addColorStop(0.45, 'rgba(120, 180, 255, 0.12)');
    halo.addColorStop(1, 'rgba(120, 180, 255, 0)');
    ctx.fillStyle = halo;
    ctx.beginPath();
    ctx.arc(cx, cy, size * 0.5, 0, Math.PI * 2);
    ctx.fill();

    if (variant === 'sparkle') {
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.85)';
      ctx.lineWidth = 1.2;
      ctx.lineCap = 'round';

      for (let i = 0; i < 4; i++) {
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate((Math.PI / 4) * i);
        ctx.beginPath();
        ctx.moveTo(0, -size * 0.46);
        ctx.lineTo(0, size * 0.46);
        ctx.stroke();
        ctx.restore();
      }
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }

  function createNebulaTexture(stops) {
    return createGlowTexture(stops, 256);
  }

  function createStarLayer(count, spread, size, texture, opacity = 0.85) {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * spread;
      positions[i * 3 + 1] = (Math.random() - 0.5) * spread;
      positions[i * 3 + 2] = (Math.random() - 0.5) * spread;

      const colorChoice = Math.random();
      if (colorChoice > 0.92) {
        colors[i * 3] = 0; colors[i * 3 + 1] = 0.94; colors[i * 3 + 2] = 1;
      } else if (colorChoice > 0.84) {
        colors[i * 3] = 1; colors[i * 3 + 1] = 0; colors[i * 3 + 2] = 1;
      } else if (colorChoice > 0.78) {
        colors[i * 3] = 1; colors[i * 3 + 1] = 0.85; colors[i * 3 + 2] = 0.4;
      } else {
        colors[i * 3] = 1; colors[i * 3 + 1] = 1; colors[i * 3 + 2] = 1;
      }
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size,
      map: texture,
      vertexColors: true,
      transparent: true,
      opacity,
      sizeAttenuation: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    return new THREE.Points(geometry, material);
  }

  function createPlanet(config) {
    const group = new THREE.Group();
    const sphere = new THREE.Mesh(
      new THREE.SphereGeometry(config.radius, 32, 32),
      new THREE.MeshBasicMaterial({
        color: config.color,
        transparent: true,
        opacity: config.opacity ?? 0.75,
      })
    );
    group.add(sphere);

    const atmosphere = new THREE.Mesh(
      new THREE.SphereGeometry(config.radius * 1.12, 32, 32),
      new THREE.MeshBasicMaterial({
        color: config.glow ?? config.color,
        transparent: true,
        opacity: 0.18,
        side: THREE.BackSide,
      })
    );
    group.add(atmosphere);

    if (config.ring) {
      const ring = new THREE.Mesh(
        new THREE.RingGeometry(config.radius * 1.35, config.radius * 1.85, 64),
        new THREE.MeshBasicMaterial({
          color: config.ringColor ?? 0x88ccff,
          transparent: true,
          opacity: 0.35,
          side: THREE.DoubleSide,
        })
      );
      ring.rotation.x = Math.PI / 2.3;
      group.add(ring);
    }

    group.position.set(config.x, config.y, config.z);
    group.userData.spin = config.spin ?? 0.001;
    return group;
  }

  /**
   * Initialize the galaxy background with stars, nebula, and shooting stars
   */
  function initGalaxy() {
    const canvas = document.getElementById('galaxy-canvas');
    if (!canvas || typeof THREE === 'undefined') return;

    galaxyScene = new THREE.Scene();
    galaxyCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
    galaxyCamera.position.z = 5;

    galaxyRenderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    galaxyRenderer.setSize(window.innerWidth, window.innerHeight);
    galaxyRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const isMobile = window.innerWidth < 768;
    const softStarTexture = createStarTexture('soft');
    const sparkleStarTexture = createStarTexture('sparkle');
    const dustTexture = createGlowTexture([
      [0, 'rgba(0, 240, 255, 0.8)'],
      [0.4, 'rgba(0, 240, 255, 0.2)'],
      [1, 'rgba(0, 240, 255, 0)'],
    ], 32);

    const stars = createStarLayer(isMobile ? 3500 : 9000, 2000, isMobile ? 1.8 : 2.2, softStarTexture, 0.9);
    const brightStars = createStarLayer(isMobile ? 120 : 280, 1800, isMobile ? 3.5 : 4.5, sparkleStarTexture, 1);
    galaxyScene.add(stars);
    galaxyScene.add(brightStars);

    // Nebula clouds
    const nebulaConfigs = [
      {
        stops: [
          [0, 'rgba(136, 0, 255, 0.35)'],
          [0.35, 'rgba(0, 240, 255, 0.14)'],
          [0.75, 'rgba(10, 10, 40, 0.05)'],
          [1, 'rgba(0, 0, 0, 0)'],
        ],
        scale: 520, x: -280, y: 120, z: -650,
      },
      {
        stops: [
          [0, 'rgba(255, 0, 255, 0.28)'],
          [0.4, 'rgba(255, 136, 0, 0.12)'],
          [0.75, 'rgba(20, 10, 30, 0.04)'],
          [1, 'rgba(0, 0, 0, 0)'],
        ],
        scale: 420, x: 320, y: -80, z: -720,
      },
      {
        stops: [
          [0, 'rgba(0, 240, 255, 0.22)'],
          [0.45, 'rgba(0, 80, 120, 0.1)'],
          [0.8, 'rgba(5, 10, 25, 0.04)'],
          [1, 'rgba(0, 0, 0, 0)'],
        ],
        scale: 360, x: 40, y: 200, z: -800,
      },
    ];

    const nebulae = nebulaConfigs.map((config) => {
      const material = new THREE.SpriteMaterial({
        map: createNebulaTexture(config.stops),
        transparent: true,
        opacity: 0.22,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const sprite = new THREE.Sprite(material);
      sprite.position.set(config.x, config.y, config.z);
      sprite.scale.set(config.scale, config.scale, 1);
      galaxyScene.add(sprite);
      return sprite;
    });

    // Distant planets
    const planets = [
      createPlanet({ radius: 14, color: 0x2288aa, glow: 0x00f0ff, x: -320, y: -140, z: -420, spin: 0.0012 }),
      createPlanet({ radius: 22, color: 0x6633aa, glow: 0xff00ff, x: 360, y: 90, z: -520, spin: 0.0008, ring: true, ringColor: 0xaa88ff }),
      createPlanet({ radius: 10, color: 0xcc6633, glow: 0xff8800, x: 120, y: -210, z: -380, spin: 0.0015 }),
      createPlanet({ radius: 18, color: 0x334466, glow: 0x8899cc, x: -180, y: 160, z: -560, spin: 0.001 }),
    ];

    if (!isMobile) {
      planets.push(createPlanet({ radius: 26, color: 0x115566, glow: 0x00ff88, x: -420, y: 40, z: -680, spin: 0.0006, ring: true, ringColor: 0x44ddaa }));
    }

    planets.forEach((planet) => galaxyScene.add(planet));

    // Space dust layer
    const dustCount = isMobile ? 250 : 500;
    const dustGeometry = new THREE.BufferGeometry();
    const dustPositions = new Float32Array(dustCount * 3);

    for (let i = 0; i < dustCount; i++) {
      dustPositions[i * 3] = (Math.random() - 0.5) * 120;
      dustPositions[i * 3 + 1] = (Math.random() - 0.5) * 120;
      dustPositions[i * 3 + 2] = (Math.random() - 0.5) * 120;
    }

    dustGeometry.setAttribute('position', new THREE.BufferAttribute(dustPositions, 3));

    const dustMaterial = new THREE.PointsMaterial({
      size: 1.2,
      map: dustTexture,
      color: 0x00f0ff,
      transparent: true,
      opacity: 0.45,
      sizeAttenuation: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const dust = new THREE.Points(dustGeometry, dustMaterial);
    galaxyScene.add(dust);

    galaxyScene.fog = new THREE.FogExp2(0x0a0a1a, 0.0008);

    // Shooting stars array
    const shootingStars = [];

    function createShootingStar() {
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(6);
      const startX = Math.random() * 400 - 200;
      const startY = Math.random() * 200 + 50;
      positions[0] = startX;
      positions[1] = startY;
      positions[2] = -100;
      positions[3] = startX - 30;
      positions[4] = startY - 30;
      positions[5] = -100;

      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

      const material = new THREE.LineBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.8,
      });

      const star = new THREE.Line(geometry, material);
      star.userData.life = 1;
      galaxyScene.add(star);
      shootingStars.push(star);
    }

    document.addEventListener('mousemove', (e) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    });

    let frame = 0;

    function animateGalaxy() {
      animationId = requestAnimationFrame(animateGalaxy);
      frame++;

      stars.rotation.y += 0.0002;
      stars.rotation.x += 0.0001;
      brightStars.rotation.y += 0.00015;
      brightStars.rotation.x += 0.00008;

      galaxyCamera.position.x += (mouseX * 2 - galaxyCamera.position.x) * 0.02;
      galaxyCamera.position.y += (mouseY * 2 - galaxyCamera.position.y) * 0.02;
      galaxyCamera.lookAt(galaxyScene.position);

      dust.rotation.y -= 0.001;

      nebulae.forEach((nebula, index) => {
        nebula.material.opacity = 0.18 + Math.sin(frame * 0.004 + index) * 0.04;
        nebula.rotation += 0.00005 * (index + 1);
      });

      planets.forEach((planet) => {
        planet.rotation.y += planet.userData.spin;
      });

      if (frame % 180 === 0 && Math.random() > 0.5) {
        createShootingStar();
      }

      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const ss = shootingStars[i];
        ss.userData.life -= 0.02;
        ss.material.opacity = ss.userData.life;
        ss.position.x -= 2;
        ss.position.y -= 2;

        if (ss.userData.life <= 0) {
          galaxyScene.remove(ss);
          shootingStars.splice(i, 1);
        }
      }

      galaxyRenderer.render(galaxyScene, galaxyCamera);
    }

    animateGalaxy();

    window.addEventListener('resize', () => {
      galaxyCamera.aspect = window.innerWidth / window.innerHeight;
      galaxyCamera.updateProjectionMatrix();
      galaxyRenderer.setSize(window.innerWidth, window.innerHeight);
    });
  }

  /**
   * Developer avatar silhouette using Three.js
   */
  function initAvatar() {
    const canvas = document.getElementById('avatar-canvas');
    if (!canvas || typeof THREE === 'undefined') return;

    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Silhouette figure using geometric shapes
    const group = new THREE.Group();

    // Head
    const headGeo = new THREE.SphereGeometry(0.5, 32, 32);
    const bodyMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      wireframe: true,
      transparent: true,
      opacity: 0.6,
    });
    const head = new THREE.Mesh(headGeo, bodyMat);
    head.position.y = 1.5;
    group.add(head);

    // Body
    const bodyGeo = new THREE.CylinderGeometry(0.4, 0.6, 1.5, 8);
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    body.position.y = 0.3;
    group.add(body);

    // Arms
    const armGeo = new THREE.CylinderGeometry(0.1, 0.1, 1, 8);
    const leftArm = new THREE.Mesh(armGeo, bodyMat);
    leftArm.position.set(-0.7, 0.5, 0);
    leftArm.rotation.z = 0.5;
    group.add(leftArm);

    const rightArm = new THREE.Mesh(armGeo, bodyMat);
    rightArm.position.set(0.7, 0.5, 0);
    rightArm.rotation.z = -0.5;
    group.add(rightArm);

    // Glow ring
    const ringGeo = new THREE.TorusGeometry(1.8, 0.02, 16, 100);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xff00ff,
      transparent: true,
      opacity: 0.4,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2;
    group.add(ring);

    scene.add(group);

    // Ambient particles around avatar
    const particleCount = 200;
    const pGeo = new THREE.BufferGeometry();
    const pPositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 1.5 + Math.random() * 1;
      pPositions[i * 3] = Math.cos(angle) * radius;
      pPositions[i * 3 + 1] = (Math.random() - 0.5) * 3;
      pPositions[i * 3 + 2] = Math.sin(angle) * radius;
    }

    pGeo.setAttribute('position', new THREE.BufferAttribute(pPositions, 3));

    const pMat = new THREE.PointsMaterial({
      size: 0.05,
      color: 0x00f0ff,
      transparent: true,
      opacity: 0.6,
    });

    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    function animateAvatar() {
      requestAnimationFrame(animateAvatar);
      group.rotation.y += 0.005;
      ring.rotation.z += 0.01;
      particles.rotation.y -= 0.003;
      renderer.render(scene, camera);
    }

    animateAvatar();
  }

  function latLonToVector3(lat, lon, radius) {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);
    return new THREE.Vector3(
      -radius * Math.sin(phi) * Math.cos(theta),
      radius * Math.cos(phi),
      radius * Math.sin(phi) * Math.sin(theta)
    );
  }

  function latLonToMapXY(lat, lon, width, height) {
    return {
      x: ((lon + 180) / 360) * width,
      y: ((90 - lat) / 180) * height,
    };
  }

  function drawRegionOnMap(ctx, points, width, height, fill, stroke) {
    ctx.beginPath();
    points.forEach(([lat, lon], index) => {
      const { x, y } = latLonToMapXY(lat, lon, width, height);
      if (index === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.closePath();
    ctx.fillStyle = fill;
    ctx.fill();
    if (stroke) {
      ctx.strokeStyle = stroke;
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }
  }

  function drawNepalHighlight(ctx, width, height) {
    const nepal = [
      [30.45, 80.05],
      [30.45, 88.25],
      [26.35, 88.25],
      [26.35, 80.05],
    ];

    ctx.save();
    ctx.shadowColor = 'rgba(0, 255, 136, 0.9)';
    ctx.shadowBlur = 24;
    drawRegionOnMap(ctx, nepal, width, height, 'rgba(0, 255, 136, 0.82)', 'rgba(0, 255, 136, 1)');
    ctx.restore();

    const nepalCenter = latLonToMapXY(28.2, 84.0, width, height);
    const glow = ctx.createRadialGradient(
      nepalCenter.x, nepalCenter.y, 0,
      nepalCenter.x, nepalCenter.y, 48
    );
    glow.addColorStop(0, 'rgba(0, 255, 136, 0.5)');
    glow.addColorStop(1, 'rgba(0, 255, 136, 0)');
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(nepalCenter.x, nepalCenter.y, 48, 0, Math.PI * 2);
    ctx.fill();
  }

  function drawFallbackContinents(ctx, width, height) {
    const landFill = 'rgba(0, 240, 255, 0.35)';
    const landStroke = 'rgba(0, 240, 255, 0.6)';
    const continents = [
      [[72, -168], [72, -52], [60, -45], [30, -82], [8, -78], [8, -168]],
      [[18, -92], [18, -74], [-2, -80], [-2, -92]],
      [[72, -12], [72, 42], [36, 38], [36, -10]],
      [[38, -10], [38, 38], [12, 32], [-35, 18], [-35, -5], [12, -5]],
      [[38, -18], [38, 52], [-35, 52], [-35, -18]],
      [[75, 25], [75, 145], [10, 145], [10, 95], [22, 72], [35, 55], [55, 25]],
      [[55, 95], [55, 145], [-10, 145], [-10, 110], [22, 95]],
      [[-10, 110], [-10, 155], [-45, 155], [-45, 110]],
      [[65, -168], [65, -140], [50, -130], [50, -168]],
    ];
    continents.forEach((region) => drawRegionOnMap(ctx, region, width, height, landFill, landStroke));
  }

  function createCanvasMapTexture(mapCanvas) {
    const texture = new THREE.CanvasTexture(mapCanvas);
    texture.needsUpdate = true;
    if (THREE.sRGBEncoding) texture.encoding = THREE.sRGBEncoding;
    return texture;
  }

  /**
   * Real equirectangular world map tinted cyan + Nepal highlight.
   * Uses bundled local asset (no CDN) with canvas fallback.
   */
  function buildWorldMapTexture(onReady) {
    const width = 2048;
    const height = 1024;
    const mapCanvas = document.createElement('canvas');
    mapCanvas.width = width;
    mapCanvas.height = height;
    const ctx = mapCanvas.getContext('2d');

    const finish = (usedFallback) => {
      drawNepalHighlight(ctx, width, height);
      onReady(createCanvasMapTexture(mapCanvas), usedFallback);
    };

    const img = new Image();
    img.onload = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.drawImage(img, 0, 0, width, height);

      const imageData = ctx.getImageData(0, 0, width, height);
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const brightness = Math.max(r, g, b);
        if (brightness > 24) {
          const alpha = Math.min(255, 40 + brightness * 0.72);
          data[i] = 0;
          data[i + 1] = 240;
          data[i + 2] = 255;
          data[i + 3] = alpha;
        } else {
          data[i + 3] = 0;
        }
      }
      ctx.putImageData(imageData, 0, 0);

      ctx.strokeStyle = 'rgba(0, 240, 255, 0.08)';
      ctx.lineWidth = 1;
      for (let lat = -60; lat <= 60; lat += 30) {
        const y = latLonToMapXY(lat, 0, width, height).y;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
      for (let lon = -180; lon < 180; lon += 30) {
        const x = latLonToMapXY(0, lon, width, height).x;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      finish(false);
    };

    img.onerror = () => {
      ctx.clearRect(0, 0, width, height);
      drawFallbackContinents(ctx, width, height);
      finish(true);
    };

    img.src = 'assets/earth-topology.png';
  }

  /**
   * Interactive globe for contact section
   */
  function initGlobe() {
    const canvas = document.getElementById('globe-canvas');
    if (!canvas || typeof THREE === 'undefined') return;

    const getSize = () => ({
      width: Math.max(canvas.clientWidth, 1),
      height: Math.max(canvas.clientHeight, 1),
    });

    let { width, height } = getSize();

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 3;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(width, height, false);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.sortObjects = true;

    // Inner core sphere
    const innerGeo = new THREE.SphereGeometry(0.95, 32, 32);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0x0a0a1a,
      transparent: true,
      opacity: 0.8,
    });
    const inner = new THREE.Mesh(innerGeo, innerMat);
    scene.add(inner);

    // Wireframe globe shell (same as before)
    const globeGeo = new THREE.IcosahedronGeometry(1, 2);
    const globeMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      wireframe: true,
      transparent: true,
      opacity: 0.4,
    });
    const globe = new THREE.Mesh(globeGeo, globeMat);
    globe.renderOrder = 2;
    scene.add(globe);

    const spinGroup = new THREE.Group();
    scene.add(spinGroup);

    let nepalMarker = null;

    buildWorldMapTexture((mapTexture) => {
      const mapGeo = new THREE.SphereGeometry(0.975, 64, 48);
      const mapMat = new THREE.MeshBasicMaterial({
        map: mapTexture,
        transparent: true,
        opacity: 0.95,
      });
      const mapOverlay = new THREE.Mesh(mapGeo, mapMat);
      mapOverlay.renderOrder = 1;
      spinGroup.add(mapOverlay);

      nepalMarker = new THREE.Group();
      const markerMat = new THREE.MeshBasicMaterial({
        color: 0x00ff88,
        transparent: true,
        opacity: 0.95,
        side: THREE.DoubleSide,
      });
      nepalMarker.add(new THREE.Mesh(new THREE.RingGeometry(0.026, 0.048, 32), markerMat));
      nepalMarker.add(new THREE.Mesh(new THREE.CircleGeometry(0.02, 24), markerMat.clone()));
      const nepalPos = latLonToVector3(28.2, 84.0, 0.988);
      nepalMarker.position.copy(nepalPos);
      nepalMarker.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), nepalPos.clone().normalize());
      nepalMarker.renderOrder = 3;
      spinGroup.add(nepalMarker);
    });

    // Orbiting dots (connection points)
    const dots = [];
    for (let i = 0; i < 8; i++) {
      const dotGeo = new THREE.SphereGeometry(0.03, 8, 8);
      const dotMat = new THREE.MeshBasicMaterial({ color: 0xff00ff });
      const dot = new THREE.Mesh(dotGeo, dotMat);
      const angle = (i / 8) * Math.PI * 2;
      dot.userData.angle = angle;
      dot.userData.speed = 0.01 + Math.random() * 0.01;
      dots.push(dot);
      scene.add(dot);
    }

    let globeMouseX = 0;
    let pulse = 0;

    canvas.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      globeMouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    });

    const resizeGlobe = () => {
      const size = getSize();
      width = size.width;
      height = size.height;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };

    window.addEventListener('resize', resizeGlobe);
    if (typeof ResizeObserver !== 'undefined') {
      const ro = new ResizeObserver(resizeGlobe);
      ro.observe(canvas.parentElement || canvas);
    }

    function animateGlobe() {
      requestAnimationFrame(animateGlobe);

      inner.rotation.y += 0.003;

      globe.rotation.y += 0.003;
      globe.rotation.x += 0.001;
      globe.rotation.y += globeMouseX * 0.01;

      spinGroup.rotation.copy(globe.rotation);

      pulse += 0.05;
      if (nepalMarker) {
        const markerScale = 1 + Math.sin(pulse) * 0.12;
        nepalMarker.scale.set(markerScale, markerScale, 1);
      }

      dots.forEach((dot) => {
        dot.userData.angle += dot.userData.speed;
        dot.position.x = Math.cos(dot.userData.angle) * 1.3;
        dot.position.z = Math.sin(dot.userData.angle) * 1.3;
        dot.position.y = Math.sin(dot.userData.angle * 2) * 0.3;
      });

      renderer.render(scene, camera);
    }

    animateGlobe();
  }

  /**
   * Skill constellation canvas (2D)
   */
  function initConstellation() {
    const canvas = document.getElementById('constellation-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const dpr = Math.min(window.devicePixelRatio, 2);
    const rect = canvas.getBoundingClientRect();

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const nodes = [
      { x: 0.15, y: 0.28, label: 'HTML5', connections: [1, 2, 3] },
      { x: 0.35, y: 0.18, label: 'JavaScript', connections: [0, 2, 4] },
      { x: 0.55, y: 0.22, label: 'Vue.js', connections: [0, 1, 4] },
      { x: 0.78, y: 0.3, label: 'Python', connections: [0, 6, 7] },
      { x: 0.25, y: 0.58, label: 'Node.js', connections: [1, 2, 5] },
      { x: 0.48, y: 0.52, label: 'Express.js', connections: [4, 5, 6] },
      { x: 0.68, y: 0.62, label: 'PostgreSQL', connections: [5, 7, 8] },
      { x: 0.82, y: 0.78, label: 'ML / AI', connections: [3, 6] },
      { x: 0.42, y: 0.82, label: 'Docker', connections: [4, 5, 9] },
      { x: 0.58, y: 0.88, label: 'AWS Cloud', connections: [8, 5] },
      { x: 0.12, y: 0.72, label: 'Postman', connections: [4, 9] },
      { x: 0.88, y: 0.48, label: 'PyCharm', connections: [3, 6] },
    ];

    let animFrame = 0;

    function drawConstellation() {
      const w = rect.width;
      const h = rect.height;
      ctx.clearRect(0, 0, w, h);
      animFrame++;

      // Draw connections
      nodes.forEach((node, i) => {
        node.connections.forEach((ci) => {
          const target = nodes[ci];
          const pulse = Math.sin(animFrame * 0.02 + i) * 0.3 + 0.7;

          ctx.beginPath();
          ctx.moveTo(node.x * w, node.y * h);
          ctx.lineTo(target.x * w, target.y * h);
          ctx.strokeStyle = `rgba(0, 240, 255, ${pulse * 0.3})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        });
      });

      // Draw nodes
      nodes.forEach((node, i) => {
        const pulse = Math.sin(animFrame * 0.03 + i * 0.5) * 3 + 8;
        const x = node.x * w;
        const y = node.y * h;

        // Glow
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, pulse * 2);
        gradient.addColorStop(0, 'rgba(0, 240, 255, 0.4)');
        gradient.addColorStop(1, 'rgba(0, 240, 255, 0)');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, pulse * 2, 0, Math.PI * 2);
        ctx.fill();

        // Node
        ctx.beginPath();
        ctx.arc(x, y, pulse * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = '#00f0ff';
        ctx.fill();

        // Label
        ctx.font = '12px Share Tech Mono, monospace';
        ctx.fillStyle = '#8888aa';
        ctx.textAlign = 'center';
        ctx.fillText(node.label, x, y + pulse + 14);
      });

      requestAnimationFrame(drawConstellation);
    }

    drawConstellation();
  }

  /**
   * Skills network visualization
   */
  function initSkillsNetwork() {
    const canvas = document.getElementById('skills-network-canvas');
    const container = canvas?.parentElement;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');

    const resize = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = Math.floor(rect.width);
      canvas.height = Math.floor(rect.height);
    };

    resize();

    const skills = [
      'HTML5', 'CSS3', 'JavaScript', 'Vue.js', 'Python',
      'Node.js', 'Express.js', 'REST APIs', 'PostgreSQL', 'SQL',
      'Docker', 'AWS Cloud', 'Git', 'GitHub', 'VS Code', 'Ubuntu',
      'Jupyter Notebook', 'Postman', 'PyCharm',
      'Machine Learning', 'Artificial Intelligence', 'Data Analysis',
    ];

    const networkNodes = skills.map((skill) => ({
      label: skill,
      x: 0,
      y: 0,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: skill.length > 12 ? 22 : 18,
    }));

    const placeNodes = () => {
      const pad = 30;
      networkNodes.forEach((node) => {
        node.x = pad + Math.random() * (canvas.width - pad * 2);
        node.y = pad + Math.random() * (canvas.height - pad * 2);
      });
    };

    placeNodes();

    const clampNode = (node) => {
      const pad = node.radius + 4;
      if (node.x <= pad || node.x >= canvas.width - pad) {
        node.vx *= -1;
        node.x = Math.max(pad, Math.min(canvas.width - pad, node.x));
      }
      if (node.y <= pad || node.y >= canvas.height - pad) {
        node.vy *= -1;
        node.y = Math.max(pad, Math.min(canvas.height - pad, node.y));
      }
    };

    function drawNetwork() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.beginPath();
      ctx.rect(0, 0, canvas.width, canvas.height);
      ctx.clip();

      networkNodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;
        clampNode(node);
      });

      for (let i = 0; i < networkNodes.length; i++) {
        for (let j = i + 1; j < networkNodes.length; j++) {
          const dx = networkNodes[i].x - networkNodes[j].x;
          const dy = networkNodes[i].y - networkNodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(networkNodes[i].x, networkNodes[i].y);
            ctx.lineTo(networkNodes[j].x, networkNodes[j].y);
            ctx.strokeStyle = `rgba(0, 240, 255, ${(1 - dist / 120) * 0.3})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      networkNodes.forEach((node) => {
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(15, 15, 42, 0.85)';
        ctx.fill();
        ctx.strokeStyle = 'rgba(0, 240, 255, 0.5)';
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.font = '11px Orbitron, sans-serif';
        ctx.fillStyle = '#00f0ff';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(node.label, node.x, node.y);
      });

      ctx.restore();
      requestAnimationFrame(drawNetwork);
    }

    drawNetwork();

    window.addEventListener('resize', () => {
      resize();
      placeNodes();
    }, { passive: true });
  }

  /**
   * Boot sequence loader animation
   */
  function runBootSequence(onComplete) {
    const loader = document.getElementById('loader');
    const logsContainer = document.getElementById('boot-logs');
    const progressBar = document.getElementById('loader-progress');
    const percentText = document.getElementById('loader-percent');
    const statusText = document.getElementById('loader-status');

    const statuses = [
      'Initializing neural interface...',
      'Loading star field data...',
      'Compiling shaders...',
      'Syncing holographic layers...',
      'Almost there...',
    ];

    let progress = 0;
    let logIndex = 0;

    const logInterval = setInterval(() => {
      if (logIndex < BOOT_LOGS.length) {
        const line = document.createElement('div');
        line.className = 'log-line';
        line.textContent = BOOT_LOGS[logIndex];
        logsContainer.appendChild(line);
        logsContainer.scrollTop = logsContainer.scrollHeight;
        logIndex++;
      }
    }, 350);

    const progressInterval = setInterval(() => {
      progress += Math.random() * 8 + 2;
      if (progress >= 100) {
        progress = 100;
        clearInterval(progressInterval);
        clearInterval(logInterval);

        statusText.textContent = 'System ready. Loading portfolio...';

        setTimeout(() => {
          loader.classList.add('hidden');
          document.body.classList.add('loaded');
          if (onComplete) onComplete();
        }, 800);
      }

      progressBar.style.width = `${progress}%`;
      percentText.textContent = `${Math.floor(progress)}%`;

      const statusIdx = Math.min(
        Math.floor(progress / 25),
        statuses.length - 1
      );
      statusText.textContent = statuses[statusIdx];
    }, 200);
  }

  /**
   * Cursor trail particle canvas
   */
  let cursorTrailPaused = false;
  let clearCursorTrail = null;

  function setCursorTrailPaused(paused) {
    cursorTrailPaused = paused;
    if (paused) {
      clearCursorTrail?.();
    }
  }

  function initCursorTrail() {
    const canvas = document.getElementById('cursor-trail');
    if (!canvas || window.matchMedia('(hover: none)').matches) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const trail = [];
    const maxTrail = 24;

    clearCursorTrail = () => {
      trail.length = 0;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    document.addEventListener('mousemove', (e) => {
      if (cursorTrailPaused) return;
      trail.push({ x: e.clientX, y: e.clientY, life: 1, exhaust: true });
      if (trail.length > maxTrail) trail.shift();
    });

    document.addEventListener('click', (e) => {
      if (cursorTrailPaused) return;
      for (let i = 0; i < 14; i++) {
        const angle = (i / 14) * Math.PI * 2;
        trail.push({
          x: e.clientX,
          y: e.clientY,
          life: 1,
          vx: Math.cos(angle) * 3.5,
          vy: Math.sin(angle) * 3.5,
          burst: true,
        });
      }
    });

    function drawTrail() {
      if (cursorTrailPaused) {
        requestAnimationFrame(drawTrail);
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = trail.length - 1; i >= 0; i--) {
        const p = trail[i];
        p.life -= p.burst ? 0.045 : 0.04;

        if (p.burst) {
          p.x += p.vx;
          p.y += p.vy;
        }

        if (p.life <= 0) {
          trail.splice(i, 1);
          continue;
        }

        const alpha = p.life * (p.burst ? 0.55 : 0.45);
        const size = p.burst ? 2.5 : 1.5 + (1 - p.life) * 3;

        ctx.save();
        ctx.translate(p.x, p.y);

        if (p.exhaust && i > 0) {
          const prev = trail[i - 1];
          if (prev) {
            const angle = Math.atan2(p.y - prev.y, p.x - prev.x);
            ctx.rotate(angle);
          }
          ctx.beginPath();
          ctx.ellipse(0, 0, size * 1.6, size * 0.7, 0, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, ${120 + Math.floor(p.life * 80)}, 40, ${alpha})`;
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, size, 0, Math.PI * 2);
          ctx.fillStyle = p.burst
            ? `rgba(255, 0, 255, ${alpha})`
            : `rgba(0, 240, 255, ${alpha})`;
        }

        ctx.fill();
        ctx.restore();
      }

      requestAnimationFrame(drawTrail);
    }

    drawTrail();

    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });
  }

  /**
   * Initialize all particle systems
   */
  function init(onBootComplete) {
    runBootSequence(() => {
      initGalaxy();
      initGlobe();
      initConstellation();
      initSkillsNetwork();
      initCursorTrail();
      if (onBootComplete) onBootComplete();
    });
  }

  return { init, initGalaxy, initAvatar, initGlobe, setCursorTrailPaused };
})();

// Export for module usage
if (typeof window !== 'undefined') {
  window.ParticleSystem = ParticleSystem;
}
