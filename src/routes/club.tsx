import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/club')({
  component: () => (
    <div>
      <h2 className="titulo-grande">Nuestra Historia</h2>
      <p>Somos vikingos desde 2002...</p>
    </div>
  ),
})