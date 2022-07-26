'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(() => {
  Route.post('/registro', 'UserController.store');
  Route.post('/login', 'UserController.login');
}).prefix('api/v1/usuarios');


Route.group(() => {
  Route.get('/', 'ProyectoController.index').middleware('auth')
  Route.post('/', 'ProyectoController.create').middleware('auth')
  Route.delete('/:id', 'ProyectoController.destroy').middleware('auth')
  Route.patch('/:id', 'ProyectoController.update').middleware('auth')
  Route.post('/:id/tareas', 'TareaController.create').middleware('auth')
  Route.get('/:id/tareas', 'TareaController.index').middleware('auth')
}).prefix('api/v1/proyectos')

Route.group(() => {
  Route.delete('/:id', 'TareaController.destroy').middleware('auth')
  Route.patch('/:id', 'TareaController.update').middleware('auth')
  
}).prefix('api/v1/tareas')
