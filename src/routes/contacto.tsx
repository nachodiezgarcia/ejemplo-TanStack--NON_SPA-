import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/contacto')({
  component: () => (
    <div>
      <h1 className="titulo-grande">Contacta con nosotros</h1>
      <p>Bienvenido al Club de Remo La Cala.</p>
    </div>
  ),
})