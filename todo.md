# Tercer PreEntrega: Modificaciones en el Sistema

## Arquitectura y Prácticas Profesionales

- [ ] Profesionalizar el servidor aplicando una arquitectura profesional.
- [ ] Utilizar prácticas como patrones de diseño, mailing, variables de entorno, etc.

## Capa de Persistencia

- [ ] Modificar la capa de persistencia para aplicar los conceptos de Factory (opcional), DAO y DTO.
- [ ] Implementar un DAO seleccionado por un parámetro en línea de comandos devuelto por una Factory para que la capa de negocio opere con él.

## Patrón Repository

- [ ] Aplicar el patrón Repository para trabajar con el DAO en la lógica de negocio.

## Ruta `/current` en `api/session`

- [ ] Modificar la ruta `/current` para evitar enviar información sensible.
- [ ] Enviar un DTO del usuario con la información necesaria.

## Middleware de Autorización

- [ ] Crear un middleware que trabaje en conjunto con la estrategia "current" para hacer un sistema de autorización.
- [ ] Restringir el acceso a ciertos endpoints:
  - [ ] Solo el administrador puede crear, actualizar y eliminar productos.
  - [ ] Solo el usuario puede enviar mensajes al chat.
  - [ ] Solo el usuario puede agregar productos a su carrito.

## Modelo `Ticket`

- [ ] Crear un modelo `Ticket` con los siguientes campos:
  - [ ] Id (autogenerado por mongo)
  - [ ] code: String (autogenerado y único)
  - [ ] purchase_datetime: Fecha y hora exacta de la compra (created_at)
  - [ ] amount: Número total de la compra.
  - [ ] purchaser: Correo del usuario asociado al carrito.

## Ruta `/carts/:cid/purchase` en el Router de Carts

- [ ] Implementar la ruta `/carts/:cid/purchase` para finalizar el proceso de compra de un carrito.
- [ ] Verificar el stock del producto al momento de finalizar la compra.
- [ ] Restar el stock del producto si hay suficiente cantidad.
- [ ] No agregar el producto al proceso de compra si no hay suficiente stock.

## Servicio de Tickets

- [ ] Utilizar el servicio de Tickets para generar un ticket con los datos de la compra.
- [ ] En caso de una compra no completada, devolver un arreglo con los ids de los productos que no pudieron procesarse.
- [ ] Filtrar el carrito del usuario para contener solo los productos que no pudieron comprarse.

### Opcional: Enviar ticket por correo al usario

- [ ] usar Node Email enviar con html un bonito correo
