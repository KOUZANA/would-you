const particles = Array.from({ length: 34 }, (_, index) => ({
  left: `${(index * 37) % 100}%`,
  delay: `${-((index * 17) % 190) / 10}s`,
  duration: `${12 + ((index * 7) % 100) / 10}s`,
  size: `${5 + ((index * 11) % 12)}px`,
  drift: `${((index * 29) % 121) - 60}px`,
  style: index % 3,
  accent: index % 9 === 0,
}))

function ParticleBackground() {
  return (
    <div className="particle-background" aria-hidden="true">
      {particles.map((particle, index) => (
        <span
          className={`particle particle--${particle.style}${particle.accent ? ' particle--accent' : ''}`}
          key={index}
          style={{
            '--particle-left': particle.left,
            '--particle-delay': particle.delay,
            '--particle-duration': particle.duration,
            '--particle-size': particle.size,
            '--particle-drift': particle.drift,
          }}
        />
      ))}
    </div>
  )
}

export default ParticleBackground
