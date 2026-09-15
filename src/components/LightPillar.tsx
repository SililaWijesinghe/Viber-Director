import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

interface LightPillarProps {
  topColor?: string;
  bottomColor?: string;
  intensity?: number;
  rotationSpeed?: number;
  glowAmount?: number;
  pillarWidth?: number;
  pillarHeight?: number;
  noiseIntensity?: number;
  pillarRotation?: number;
  interactive?: boolean;
  mixBlendMode?: any;
  quality?: 'low' | 'medium' | 'high';
}

export default function LightPillar({
  topColor = '#5227FF',
  bottomColor = '#FF9FFC',
  intensity = 1.0,
  rotationSpeed = 0.3,
  glowAmount = 0.005,
  pillarWidth = 3.0,
  pillarHeight = 0.4,
  noiseIntensity = 0.5,
  pillarRotation = 0,
  mixBlendMode = 'screen',
  quality = 'high'
}: LightPillarProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    camera.position.z = 1;

    let pixelRatio = 1;
    if (quality === 'high') pixelRatio = window.devicePixelRatio;
    if (quality === 'medium') pixelRatio = Math.min(window.devicePixelRatio, 1.5);
    if (quality === 'low') pixelRatio = 1;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false });
    renderer.setPixelRatio(pixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    const uniforms = {
      uTime: { value: 0 },
      uTopColor: { value: new THREE.Color(topColor) },
      uBottomColor: { value: new THREE.Color(bottomColor) },
      uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      uIntensity: { value: intensity },
      uWidth: { value: pillarWidth },
      uHeight: { value: pillarHeight },
      uNoise: { value: noiseIntensity }
    };

    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform vec3 uTopColor;
        uniform vec3 uBottomColor;
        uniform vec2 uResolution;
        uniform float uIntensity;
        uniform float uWidth;
        uniform float uHeight;
        uniform float uNoise;
        varying vec2 vUv;
        
        float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
        float noise(vec2 p) {
          vec2 i = floor(p), f = fract(p);
          vec2 u = f * f * (3.0 - 2.0 * f);
          return mix(mix(hash(i + vec2(0.0,0.0)), hash(i + vec2(1.0,0.0)), u.x),
                     mix(hash(i + vec2(0.0,1.0)), hash(i + vec2(1.0,1.0)), u.x), u.y);
        }
        
        void main() {
          vec2 uv = vUv;
          
          // Noise and movement
          float n = noise(uv * 3.0 + vec2(uTime * 0.2, -uTime * 0.5)) * uNoise;
          float xDist = abs(uv.x - 0.5 + n * 0.1);
          
          // Pillar shape
          float pillar = smoothstep(uWidth * 0.1, 0.0, xDist) * uIntensity;
          pillar *= smoothstep(0.0, uHeight, uv.y);
          
          vec3 color = mix(uBottomColor, uTopColor, uv.y);
          
          gl_FragColor = vec4(color * pillar, pillar);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    let animationId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      uniforms.uTime.value = clock.getElapsedTime() * rotationSpeed;
      renderer.render(scene, camera);
      animationId = requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      uniforms.uResolution.value.set(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
      mountRef.current?.removeChild(renderer.domElement);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [topColor, bottomColor, intensity, rotationSpeed, pillarWidth, pillarHeight, noiseIntensity, quality]);

  return (
    <div 
      ref={mountRef} 
      style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100%', 
        pointerEvents: 'none', 
        zIndex: 0, 
        mixBlendMode 
      }} 
    />
  );
}
