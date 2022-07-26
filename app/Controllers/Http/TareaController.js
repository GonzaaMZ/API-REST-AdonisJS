"use strict";
const Proyecto = use("App/Models/Proyecto");
const Tarea = use("App/Models/Tarea");
const AuthorizationService = use("App/Services/AuthService");
const RecursoNoEncontrado = use('App/Exceptions/RecursoNoEncontradoException')

class TareaController {
  async index({ auth, request, params }) {
    const user = await auth.getUser();
    const { id } = params;
    const proyecto = await Proyecto.find(id);
    AuthorizationService.verificarPermiso(proyecto, user);
    return await proyecto.tareas().fetch();
  }

  async create({ request, params, auth }) {
    const user = await auth.getUser();
    const { descripcion } = request.all();
    const { id } = params;
    const proyecto = await Proyecto.find(id);

    AuthorizationService.verificarPermiso(proyecto, user);

    const tarea = new Tarea();
    tarea.fill({
      descripcion,
    });
    await proyecto.tareas().save(tarea);
    return tarea;
  }

  async destroy({auth, response, params}){
    const user = await auth.getUser();
    const {id} = params;
    const tarea = await Tarea.find(id);
    if(!tarea){
        throw new RecursoNoEncontrado();
    }
    const proyecto = await tarea.proyecto().fetch();
    AuthorizationService.verificarPermiso(proyecto, user);
    await tarea.delete();
    return tarea;
} 
async update({auth, params, request}){
    const user = await auth.getUser();
    const {id} = params;
    const {descripcion, completada} = request.all()
    const tarea = await Tarea.find(id);
    if(!tarea){
        throw new RecursoNoEncontrado();
    }
    const proyecto = await tarea.proyecto().fetch();
    AuthorizationService.verificarPermiso(proyecto, user);
    tarea.merge({descripcion, completada});
    await tarea.save();
    return tarea;
}
}

module.exports = TareaController;
