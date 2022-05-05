/**
 * Representan la estructura de una peticion
 */
export type Request = {
  command: string,
  args: string[],
}


/**
 * Representan la estructura de una respuesta
 */
export type Response = {
  status: boolean,
  message: string,
}