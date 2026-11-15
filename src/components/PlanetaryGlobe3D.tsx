import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { SentinelMission } from '../data/sentinelsData';
import { getLunarTextures, getMarsTextures, isSoftwareGl } from '../utils/spaceTextures3D';

interface PlanetaryGlobe3DProps {
  region: 'moon' | 'mars' | 'deep-space';
  missions: SentinelMission[];
  selectedMissionId: string;
  rotationYDeg: number;
  tiltXDeg: number;
  zoom: number;
  onProjectedPinsChange?: (coords: Record<string, { x: number; y: number; visible: boolean }>) => void;
}

const _pinVec = new THREE.Vector3();
const _normalVec = new THREE.Vector3();
const _camDir = new THREE.Vector3();

/**
 * Converts mission mapX/mapY (percentage on front hemisphere) into a 3D point on the sphere of radius R
 */
function getMission3DPoint(mission: SentinelMission, radius: number): THREE.Vector3 {
  // Convert mapPosition.x (20..80) -> longitude (-58°..+58°), mapPosition.y (20..80) -> latitude (+48°..-48°)
  const lonRad = (((mission.mapPosition.x - 50) / 38) * 58 * Math.PI) / 180;
  const latRad = (((50 - mission.mapPosition.y) / 38) * 48 * Math.PI) / 180;

  const x = radius * Math.cos(latRad) * Math.sin(lonRad);
  const y = radius * Math.sin(latRad);
  const z = radius * Math.cos(latRad) * Math.cos(lonRad);
  return new THREE.Vector3(x, y, z);
}

export const PlanetaryGlobe3D: React.FC<PlanetaryGlobe3DProps> = ({
  region,
  missions,
  selectedMissionId,
  rotationYDeg,
  tiltXDeg,
  zoom,
  onProjectedPinsChange
}) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const requestRenderRef = useRef<(() => void) | null>(null);
  const stateRef = useRef({ rotationYDeg, tiltXDeg, zoom, selectedMissionId });
  const cbRef = useRef(onProjectedPinsChange);

  useEffect(() => {
    cbRef.current = onProjectedPinsChange;
  }, [onProjectedPinsChange]);

  useEffect(() => {
    stateRef.current = { rotationYDeg, tiltXDeg, zoom, selectedMissionId };
    requestRenderRef.current?.();
  }, [rotationYDeg, tiltXDeg, zoom, selectedMissionId]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = Math.max(320, container.clientWidth || 640);
    const height = Math.max(320, container.clientHeight || 480);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#060911');

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 120);
    camera.position.set(0, 0.2, 6.2);
    camera.lookAt(0, 0, 0);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: !isSoftwareGl,
        powerPreference: 'high-performance'
      });
    } catch {
      return;
    }

    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.setSize(width, height);

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Lighting for realistic planetary relief & terminator shadow
    const ambient = new THREE.HemisphereLight('#93C5FD', '#0F172A', 0.55);
    scene.add(ambient);

    const sunLight = new THREE.DirectionalLight('#FFFBEB', 2.85);
    sunLight.position.set(6.5, 3.2, 5.5);
    scene.add(sunLight);

    const rimLight = new THREE.DirectionalLight(
      region === 'mars' ? '#F97316' : '#38BDF8',
      1.15
    );
    rimLight.position.set(-5.5, -2.5, -4.0);
    scene.add(rimLight);

    // Background 3D Starfield
    const starCount = 420;
    const starPositions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      const r = 20 + Math.random() * 25;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      starPositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      starPositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      starPositions[i * 3 + 2] = -Math.abs(r * Math.cos(phi)) - 5;
    }
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    const starMat = new THREE.PointsMaterial({
      color: new THREE.Color('#F1F5F9'),
      size: 0.11,
      transparent: true,
      opacity: 0.85
    });
    const stars = new THREE.Points(starGeo, starMat);
    scene.add(stars);

    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    const maxAniso = renderer.capabilities.getMaxAnisotropy();
    const pinLocalPositions: Record<string, THREE.Vector3> = {};
    const pinBeaconMeshes: Record<string, THREE.Mesh> = {};

    const GLOBE_RADIUS = 1.62;

    if (region === 'moon' || region === 'mars') {
      const textures =
        region === 'moon' ? getLunarTextures(maxAniso) : getMarsTextures(maxAniso);

      const sphereGeo = new THREE.SphereGeometry(GLOBE_RADIUS, 64, 64);
      const sphereMat = new THREE.MeshStandardMaterial({
        map: textures.colorMap,
        bumpMap: textures.bumpMap,
        bumpScale: region === 'moon' ? 0.065 : 0.055,
        roughness: region === 'moon' ? 0.88 : 0.78,
        metalness: 0.04
      });

      const globeMesh = new THREE.Mesh(sphereGeo, sphereMat);
      // Align texture center toward camera
      globeMesh.rotation.y = -Math.PI / 2;
      globeGroup.add(globeMesh);

      // Subtle atmospheric halo for Mars (or lunar selenographic orbital ring for Moon)
      const haloGeo = new THREE.SphereGeometry(GLOBE_RADIUS * 1.035, 48, 48);
      const haloMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(region === 'mars' ? '#EA580C' : '#94A3B8'),
        transparent: true,
        opacity: region === 'mars' ? 0.14 : 0.07,
        side: THREE.BackSide
      });
      const haloMesh = new THREE.Mesh(haloGeo, haloMat);
      globeGroup.add(haloMesh);

      // Orbital equatorial telemetry ring
      const eqRingGeo = new THREE.RingGeometry(GLOBE_RADIUS * 1.18, GLOBE_RADIUS * 1.195, 72);
      const eqRingMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(region === 'mars' ? '#FB923C' : '#38BDF8'),
        transparent: true,
        opacity: 0.26,
        side: THREE.DoubleSide
      });
      const eqRing = new THREE.Mesh(eqRingGeo, eqRingMat);
      eqRing.rotation.x = Math.PI / 2.2;
      globeGroup.add(eqRing);

      // Add 3D surface landing site markers
      missions.forEach((m) => {
        const pos = getMission3DPoint(m, GLOBE_RADIUS * 1.015);
        pinLocalPositions[m.id] = pos;

        const beacon = new THREE.Mesh(
          new THREE.SphereGeometry(0.055, 16, 16),
          new THREE.MeshBasicMaterial({
            color: new THREE.Color('#D2F366')
          })
        );
        beacon.position.copy(pos);
        globeGroup.add(beacon);
        pinBeaconMeshes[m.id] = beacon;
      });
    } else {
      // Deep Space & Asteroids 3D Heliocentric & Interstellar System Map
      const sunMesh = new THREE.Mesh(
        new THREE.SphereGeometry(0.42, 32, 32),
        new THREE.MeshBasicMaterial({ color: new THREE.Color('#FDE047') })
      );
      globeGroup.add(sunMesh);

      const orbitRadii = [0.85, 1.35, 1.95, 2.55];
      orbitRadii.forEach((r, idx) => {
        const ring = new THREE.Mesh(
          new THREE.RingGeometry(r, r + 0.02, 72),
          new THREE.MeshBasicMaterial({
            color: new THREE.Color(idx === 1 ? '#D2F366' : '#38BDF8'),
            transparent: true,
            opacity: idx === 1 ? 0.45 : 0.25,
            side: THREE.DoubleSide
          })
        );
        ring.rotation.x = Math.PI / 2.5;
        globeGroup.add(ring);
      });

      // Miniature 3D Jupiter & Ringed Saturn on outer orbits
      const jup = new THREE.Mesh(
        new THREE.SphereGeometry(0.22, 24, 24),
        new THREE.MeshStandardMaterial({ color: new THREE.Color('#F59E0B'), roughness: 0.6 })
      );
      jup.position.set(-1.35, 0.35, 0.65);
      globeGroup.add(jup);

      const sat = new THREE.Mesh(
        new THREE.SphereGeometry(0.19, 24, 24),
        new THREE.MeshStandardMaterial({ color: new THREE.Color('#EAB308'), roughness: 0.6 })
      );
      sat.position.set(1.75, 0.45, -0.45);
      globeGroup.add(sat);

      const satRing = new THREE.Mesh(
        new THREE.RingGeometry(0.25, 0.42, 32),
        new THREE.MeshBasicMaterial({
          color: new THREE.Color('#FDE68A'),
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.75
        })
      );
      satRing.position.copy(sat.position);
      satRing.rotation.x = 1.1;
      globeGroup.add(satRing);

      missions.forEach((m) => {
        const x = ((m.mapPosition.x - 50) / 36) * 2.1;
        const y = ((50 - m.mapPosition.y) / 36) * 1.45;
        const z = 0.35;
        const pos = new THREE.Vector3(x, y, z);
        pinLocalPositions[m.id] = pos;

        const beacon = new THREE.Mesh(
          new THREE.SphereGeometry(0.06, 16, 16),
          new THREE.MeshBasicMaterial({ color: new THREE.Color('#D2F366') })
        );
        beacon.position.copy(pos);
        globeGroup.add(beacon);
        pinBeaconMeshes[m.id] = beacon;
      });
    }

    if (!isSoftwareGl) {
      renderer.compile(scene, camera);
    }

    let currentRotY = (stateRef.current.rotationYDeg * Math.PI) / 180;
    let currentTiltX = (stateRef.current.tiltXDeg * Math.PI) / 180;
    let currentZoom = stateRef.current.zoom;

    let frameId = 0;
    let renderBusy = false;
    let renderDirty = false;
    let unmounted = false;
    let isVisible = true;

    function updateProjectedPins() {
      if (!cbRef.current) return;
      globeGroup.updateMatrixWorld(true);
      _camDir.copy(camera.position).normalize();

      const out: Record<string, { x: number; y: number; visible: boolean }> = {};
      for (const [id, localPos] of Object.entries(pinLocalPositions)) {
        _pinVec.copy(localPos);
        globeGroup.localToWorld(_pinVec);

        _normalVec.copy(_pinVec).normalize();
        const isFrontFacing = region === 'deep-space' ? true : _normalVec.dot(_camDir) > -0.15;

        _pinVec.project(camera);
        const sx = Math.max(10, Math.min(90, ((_pinVec.x + 1) / 2) * 100));
        const sy = Math.max(12, Math.min(88, ((-_pinVec.y + 1) / 2) * 100));

        out[id] = {
          x: Number(sx.toFixed(1)),
          y: Number(sy.toFixed(1)),
          visible: isFrontFacing
        };
      }
      cbRef.current(out);
    }

    function requestRender() {
      if (unmounted || !isVisible) return;
      if (renderBusy) {
        renderDirty = true;
        return;
      }
      renderBusy = true;
      frameId = requestAnimationFrame(() => {
        if (unmounted) return;
        renderDirty = false;

        const targetY = (stateRef.current.rotationYDeg * Math.PI) / 180;
        const targetX = (stateRef.current.tiltXDeg * Math.PI) / 180;
        const targetZ = stateRef.current.zoom;

        currentRotY = THREE.MathUtils.lerp(currentRotY, targetY, 0.22);
        currentTiltX = THREE.MathUtils.lerp(currentTiltX, targetX, 0.22);
        currentZoom = THREE.MathUtils.lerp(currentZoom, targetZ, 0.22);
        if (
          Math.abs(currentRotY - targetY) > 0.001 ||
          Math.abs(currentTiltX - targetX) > 0.001 ||
          Math.abs(currentZoom - targetZ) > 0.001
        ) {
          renderDirty = true;
        }

        globeGroup.rotation.y = currentRotY;
        globeGroup.rotation.x = currentTiltX;

        const dist = 6.1 / Math.max(0.8, Math.min(2.2, currentZoom));
        camera.position.set(0, 0.15, dist);
        camera.lookAt(0, 0, 0);

        // Highlight active beacon
        for (const [id, mesh] of Object.entries(pinBeaconMeshes)) {
          const isSelected = id === stateRef.current.selectedMissionId;
          mesh.scale.setScalar(isSelected ? 1.65 : 1.0);
        }

        renderer.render(scene, camera);
        updateProjectedPins();

        renderBusy = false;
        if (renderDirty && !unmounted && isVisible) {
          requestRender();
        }
      });
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        isVisible = entry ? entry.isIntersecting : true;
        if (isVisible && !unmounted) {
          requestRender();
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    requestRenderRef.current = requestRender;
    requestRender();

    const handleResize = () => {
      if (!container || unmounted) return;
      const w = Math.max(300, container.clientWidth);
      const h = Math.max(300, container.clientHeight);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      requestRender();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      unmounted = true;
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(frameId);
      clearTimeout(frameId);
      starGeo.dispose();
      starMat.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
    };
  }, [region, missions]);

  return <div ref={mountRef} className="w-full h-full" />;
};
