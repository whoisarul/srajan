"use client"

import { useEffect, useRef } from "react"

export function Plant3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size with device pixel ratio for crisp rendering
    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    ctx.scale(dpr, dpr)
    canvas.style.width = rect.width + "px"
    canvas.style.height = rect.height + "px"

    let time = 0
    let growthProgress = 0

    const animate = () => {
      time += 0.02
      growthProgress = Math.min(growthProgress + 0.008, 1)

      // Clear canvas
      ctx.clearRect(0, 0, rect.width, rect.height)

      // Save context
      ctx.save()

      // Translate to center bottom
      ctx.translate(rect.width / 2, rect.height - 30)

      // Draw soil base
      const gradient = ctx.createLinearGradient(0, 0, 0, 30)
      gradient.addColorStop(0, "#8B4513")
      gradient.addColorStop(1, "#654321")
      ctx.fillStyle = gradient
      ctx.fillRect(-100, 0, 200, 30)

      // Add soil texture
      ctx.fillStyle = "#A0522D"
      for (let i = 0; i < 20; i++) {
        const x = -90 + Math.random() * 180
        const y = 5 + Math.random() * 20
        ctx.fillRect(x, y, 2, 2)
      }

      // Draw main stem with gradient
      const stemHeight = 120 * growthProgress
      const stemGradient = ctx.createLinearGradient(-3, 0, 3, 0)
      stemGradient.addColorStop(0, "#2F5233")
      stemGradient.addColorStop(0.5, "#228B22")
      stemGradient.addColorStop(1, "#1F4A22")

      ctx.strokeStyle = stemGradient
      ctx.lineWidth = 8
      ctx.lineCap = "round"
      ctx.beginPath()
      ctx.moveTo(0, 0)
      ctx.lineTo(Math.sin(time * 0.5) * 2, -stemHeight)
      ctx.stroke()

      // Add stem segments
      if (growthProgress > 0.2) {
        ctx.strokeStyle = "#1F4A22"
        ctx.lineWidth = 1
        for (let i = 1; i < stemHeight / 15; i++) {
          const y = -i * 15
          ctx.beginPath()
          ctx.moveTo(-4, y)
          ctx.lineTo(4, y)
          ctx.stroke()
        }
      }

      if (growthProgress > 0.3) {
        // Draw leaves with 3D effect and animation
        const leafProgress = (growthProgress - 0.3) / 0.7

        // Left side leaves
        for (let i = 0; i < 4; i++) {
          const leafY = -25 - i * 20 * leafProgress
          const leafSize = (25 + i * 3) * leafProgress
          const sway = Math.sin(time * 0.8 + i * 0.5) * 4
          const rotation = -0.4 + Math.sin(time * 0.6 + i) * 0.15

          ctx.save()
          ctx.translate(-20 + sway, leafY)
          ctx.rotate(rotation)

          // Leaf shadow for 3D effect
          ctx.fillStyle = "rgba(0, 100, 0, 0.3)"
          ctx.beginPath()
          ctx.ellipse(3, 3, leafSize, leafSize * 0.6, 0, 0, Math.PI * 2)
          ctx.fill()

          // Main leaf with gradient
          const leafGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, leafSize)
          leafGradient.addColorStop(0, `hsl(${120 + i * 8}, 80%, ${55 + i * 3}%)`)
          leafGradient.addColorStop(0.7, `hsl(${115 + i * 8}, 70%, ${45 + i * 3}%)`)
          leafGradient.addColorStop(1, `hsl(${110 + i * 8}, 60%, ${35 + i * 3}%)`)

          ctx.fillStyle = leafGradient
          ctx.beginPath()
          ctx.ellipse(0, 0, leafSize, leafSize * 0.6, 0, 0, Math.PI * 2)
          ctx.fill()

          // Leaf veins
          ctx.strokeStyle = `hsl(${110 + i * 8}, 50%, ${30 + i * 3}%)`
          ctx.lineWidth = 1
          ctx.beginPath()
          ctx.moveTo(-leafSize * 0.8, 0)
          ctx.lineTo(leafSize * 0.8, 0)
          ctx.moveTo(0, -leafSize * 0.4)
          ctx.lineTo(0, leafSize * 0.4)
          ctx.stroke()

          // Leaf highlight
          ctx.fillStyle = `hsla(${125 + i * 8}, 60%, ${75 + i * 2}%, 0.6)`
          ctx.beginPath()
          ctx.ellipse(-leafSize * 0.3, -leafSize * 0.2, leafSize * 0.3, leafSize * 0.15, 0, 0, Math.PI * 2)
          ctx.fill()

          ctx.restore()
        }

        // Right side leaves
        for (let i = 0; i < 4; i++) {
          const leafY = -30 - i * 20 * leafProgress
          const leafSize = (22 + i * 3) * leafProgress
          const sway = Math.sin(time * 0.8 + i * 0.5 + 1) * 4
          const rotation = 0.4 + Math.sin(time * 0.6 + i + 1) * 0.15

          ctx.save()
          ctx.translate(20 + sway, leafY)
          ctx.rotate(rotation)

          // Leaf shadow
          ctx.fillStyle = "rgba(0, 100, 0, 0.3)"
          ctx.beginPath()
          ctx.ellipse(3, 3, leafSize, leafSize * 0.6, 0, 0, Math.PI * 2)
          ctx.fill()

          // Main leaf
          const leafGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, leafSize)
          leafGradient.addColorStop(0, `hsl(${118 + i * 6}, 75%, ${52 + i * 2}%)`)
          leafGradient.addColorStop(0.7, `hsl(${113 + i * 6}, 65%, ${42 + i * 2}%)`)
          leafGradient.addColorStop(1, `hsl(${108 + i * 6}, 55%, ${32 + i * 2}%)`)

          ctx.fillStyle = leafGradient
          ctx.beginPath()
          ctx.ellipse(0, 0, leafSize, leafSize * 0.6, 0, 0, Math.PI * 2)
          ctx.fill()

          // Leaf veins
          ctx.strokeStyle = `hsl(${108 + i * 6}, 45%, ${28 + i * 2}%)`
          ctx.lineWidth = 1
          ctx.beginPath()
          ctx.moveTo(-leafSize * 0.8, 0)
          ctx.lineTo(leafSize * 0.8, 0)
          ctx.moveTo(0, -leafSize * 0.4)
          ctx.lineTo(0, leafSize * 0.4)
          ctx.stroke()

          // Leaf highlight
          ctx.fillStyle = `hsla(${123 + i * 6}, 55%, ${72 + i}%, 0.6)`
          ctx.beginPath()
          ctx.ellipse(-leafSize * 0.3, -leafSize * 0.2, leafSize * 0.3, leafSize * 0.15, 0, 0, Math.PI * 2)
          ctx.fill()

          ctx.restore()
        }
      }

      if (growthProgress > 0.7) {
        // Draw flowers/fruits with 3D effect
        const fruitProgress = (growthProgress - 0.7) / 0.3

        for (let i = 0; i < 3; i++) {
          const fruitY = -50 - i * 25 * fruitProgress
          const fruitSize = (12 + i * 2) * fruitProgress
          const sway = Math.sin(time * 1.2 + i * 0.8) * 3

          ctx.save()
          ctx.translate(sway, fruitY)

          // Fruit shadow
          ctx.fillStyle = "rgba(139, 0, 0, 0.4)"
          ctx.beginPath()
          ctx.arc(2, 2, fruitSize, 0, Math.PI * 2)
          ctx.fill()

          // Main fruit with gradient
          const fruitGradient = ctx.createRadialGradient(-fruitSize * 0.3, -fruitSize * 0.3, 0, 0, 0, fruitSize)
          fruitGradient.addColorStop(0, "#FF7F50")
          fruitGradient.addColorStop(0.6, "#FF6347")
          fruitGradient.addColorStop(1, "#CD5C5C")

          ctx.fillStyle = fruitGradient
          ctx.beginPath()
          ctx.arc(0, 0, fruitSize, 0, Math.PI * 2)
          ctx.fill()

          // Fruit highlight
          ctx.fillStyle = "rgba(255, 255, 255, 0.4)"
          ctx.beginPath()
          ctx.arc(-fruitSize * 0.3, -fruitSize * 0.3, fruitSize * 0.3, 0, Math.PI * 2)
          ctx.fill()

          // Small stem on fruit
          ctx.strokeStyle = "#228B22"
          ctx.lineWidth = 2
          ctx.beginPath()
          ctx.moveTo(0, -fruitSize)
          ctx.lineTo(0, -fruitSize - 5)
          ctx.stroke()

          ctx.restore()
        }
      }

      // Add magical floating particles
      for (let i = 0; i < 8; i++) {
        const particleX = Math.sin(time * 1.5 + i * 0.8) * 60
        const particleY = -80 + Math.cos(time * 1.2 + i * 0.6) * 30
        const particleSize = 2 + Math.sin(time * 2 + i) * 1.5
        const opacity = 0.4 + Math.sin(time * 1.8 + i) * 0.3

        ctx.fillStyle = `hsla(${60 + i * 25}, 80%, 70%, ${opacity})`
        ctx.beginPath()
        ctx.arc(particleX, particleY, particleSize, 0, Math.PI * 2)
        ctx.fill()

        // Particle glow
        ctx.fillStyle = `hsla(${60 + i * 25}, 90%, 85%, ${opacity * 0.3})`
        ctx.beginPath()
        ctx.arc(particleX, particleY, particleSize * 2, 0, Math.PI * 2)
        ctx.fill()
      }

      // Add ground sparkles
      if (growthProgress > 0.5) {
        for (let i = 0; i < 5; i++) {
          const sparkleX = -80 + i * 40 + Math.sin(time * 2 + i) * 10
          const sparkleY = 10 + Math.cos(time * 1.5 + i) * 5
          const sparkleOpacity = 0.3 + Math.sin(time * 3 + i) * 0.2

          ctx.fillStyle = `rgba(255, 215, 0, ${sparkleOpacity})`
          ctx.beginPath()
          ctx.arc(sparkleX, sparkleY, 1.5, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      ctx.restore()

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return (
    <div className="w-full h-full flex items-center justify-center">
      <canvas
        ref={canvasRef}
        className="w-full h-full max-w-[400px] max-h-[400px]"
        style={{
          filter: "drop-shadow(0 8px 16px rgba(0,0,0,0.15))",
          background: "transparent",
        }}
      />
    </div>
  )
}
