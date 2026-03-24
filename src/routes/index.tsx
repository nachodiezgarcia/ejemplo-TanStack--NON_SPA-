import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: () => (
    <div>
      <h1 className="titulo-grande">PASIÓN Y TRADICIÓN</h1>
      <p>Bienvenido al Club de Remo La Cala.</p>
    </div>
  ),
})