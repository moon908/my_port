"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export default function EarthGlobe() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth || 500;
    const height = container.clientHeight || 500;

    // Scene
    const scene = new THREE.Scene();

    // Earth Group (holds Earth and Satellite for offset positioning)
    const earthGroup = new THREE.Group();
    scene.add(earthGroup);

    // Initial position calculations based on responsive breakpoint
    let earthX = 0;
    let earthY = 0;
    if (width >= 1024) {
      earthX = 0;
      earthY = 0;
    } else {
      earthX = 0;
      earthY = -1.2;
    }

    earthGroup.position.set(earthX, earthY, 0);

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(earthX, earthY, 11.0);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = false;
    controls.target.set(earthX, earthY, 0);

    let prevEarthX = earthX;
    let prevEarthY = earthY;

    // Ambient Light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);

    // Sun Light (Directional) - Neutral white sunlight
    const sunLight = new THREE.DirectionalLight(0xffffff, 1.8);
    sunLight.position.set(5, 3, 5);
    scene.add(sunLight);

    // Soft sky blue fill light from the opposite side to prevent absolute black shadows
    const fillLight = new THREE.DirectionalLight(0xe0f2fe, 0.4);
    fillLight.position.set(-5, -2, -5);
    scene.add(fillLight);

    // Texture Loading
    const textureLoader = new THREE.TextureLoader();
    let earth: THREE.Mesh;
    let atmosphere: THREE.Mesh;
    let starField: THREE.Points;
    let satelliteGroup: THREE.Group;

    earthTextureLoad();

    function earthTextureLoad() {
      textureLoader.load(
        "/earthmap.jpg",
        (texture) => {
          setIsLoading(false);
          // Earth geometry and material
          const geometry = new THREE.SphereGeometry(3, 64, 64);
          const material = new THREE.MeshPhongMaterial({
            map: texture,
            shininess: 15,
            specular: new THREE.Color(0x333333),
          });

          earth = new THREE.Mesh(geometry, material);
          earthGroup.add(earth);

          // No atmospheric glow mesh (clean globe look)

          // Create a miniature satellite
          satelliteGroup = new THREE.Group();

          // Core body (cylinder)
          const coreGeom = new THREE.CylinderGeometry(0.06, 0.06, 0.16, 8);
          const coreMat = new THREE.MeshPhongMaterial({
            color: 0xcccccc,
            shininess: 100,
            specular: new THREE.Color(0xffffff),
          });
          const core = new THREE.Mesh(coreGeom, coreMat);
          core.rotation.x = Math.PI / 2; // Lie along the cylinder axis
          satelliteGroup.add(core);

          // Solar panel left
          const panelGeom = new THREE.BoxGeometry(0.35, 0.08, 0.01);
          const panelMat = new THREE.MeshPhongMaterial({
            color: 0x00d2ff, // Glowing cyan solar panel
            emissive: 0x002233,
            shininess: 40,
          });
          const panelLeft = new THREE.Mesh(panelGeom, panelMat);
          panelLeft.position.x = -0.25;
          satelliteGroup.add(panelLeft);

          // Solar panel right
          const panelRight = new THREE.Mesh(panelGeom, panelMat);
          panelRight.position.x = 0.25;
          satelliteGroup.add(panelRight);

          earthGroup.add(satelliteGroup);

          // No second satellite mesh
        },
        undefined,
        (err) => {
          console.error("Error loading Earth texture, creating fallback grid globe.", err);
          createFallbackGlobe();
        }
      );
    }

    function createFallbackGlobe() {
      setIsLoading(false);
      const geometry = new THREE.SphereGeometry(3, 32, 32);
      const material = new THREE.MeshBasicMaterial({
        color: 0x3b82f6,
        wireframe: true,
      });
      earth = new THREE.Mesh(geometry, material);
      earthGroup.add(earth);
    }

    // Starfield Particle System
    const starsGeometry = new THREE.BufferGeometry();
    const starsCount = 1000;
    const starsPositions = new Float32Array(starsCount * 3);

    for (let i = 0; i < starsCount * 3; i += 3) {
      const radius = 25 + Math.random() * 25;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      starsPositions[i] = radius * Math.sin(phi) * Math.cos(theta);
      starsPositions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
      starsPositions[i + 2] = radius * Math.cos(phi);
    }

    starsGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(starsPositions, 3)
    );

    const starsMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.075,
      transparent: true,
      opacity: 1.0,
      sizeAttenuation: true,
    });

    starField = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(starField);

    // Animation loop
    let animationFrameId: number;
    let orbitAngle = 0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Rotate Earth
      if (earth) {
        earth.rotation.y += 0.0012;
      }

      // Orbit satellite
      if (satelliteGroup) {
        orbitAngle += 0.008; // speed of orbit
        const orbitRadius = 4.2;
        const tilt = 0.4; // 23 degree orbit tilt

        satelliteGroup.position.x = Math.cos(orbitAngle) * orbitRadius;
        satelliteGroup.position.z = Math.sin(orbitAngle) * orbitRadius;
        satelliteGroup.position.y = Math.sin(orbitAngle) * orbitRadius * Math.sin(tilt);

        // Point satellite core towards Earth
        satelliteGroup.lookAt(0, 0, 0);
      }

      // Second satellite removed

      // Slow rotate starfield for depth
      if (starField) {
        starField.rotation.y += 0.0001;
        starField.rotation.x += 0.00005;
      }

      // No atmosphere or starfield rotations needed

      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;

      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(newWidth, newHeight);

      // Recalculate target offsets dynamically
      let newEarthX = 0;
      let newEarthY = 0;
      if (newWidth >= 1024) {
        newEarthX = 0;
        newEarthY = 0;
      } else {
        newEarthX = 0;
        newEarthY = -1.2;
      }

      if (newEarthX !== prevEarthX || newEarthY !== prevEarthY) {
        const dx = newEarthX - prevEarthX;
        const dy = newEarthY - prevEarthY;

        earthGroup.position.set(newEarthX, newEarthY, 0);
        camera.position.x += dx;
        camera.position.y += dy;
        controls.target.set(newEarthX, newEarthY, 0);

        prevEarthX = newEarthX;
        prevEarthY = newEarthY;
      }
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      controls.dispose();

      // Traverse scene to dispose geometries and materials
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh || object instanceof THREE.Points) {
          if (object.geometry) object.geometry.dispose();
          if (object.material) {
            if (Array.isArray(object.material)) {
              object.material.forEach((mat) => mat.dispose());
            } else {
              object.material.dispose();
            }
          }
        }
      });

      renderer.dispose();
      try {
        renderer.forceContextLoss();
      } catch (e) {
        // Safe catch for context loss error if context was already lost
      }

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/20 backdrop-blur-sm z-10 transition-opacity duration-300">
          <div className="w-12 h-12 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
          <span className="mt-4 text-xs font-mono text-zinc-400 tracking-wider">
            INITIALIZING 3D WORLD...
          </span>
        </div>
      )}
      <div ref={containerRef} className="w-full h-full absolute inset-0 cursor-grab active:cursor-grabbing" />
    </div>
  );
}
