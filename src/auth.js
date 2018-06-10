export class Role {
    static  ASISTENTE_DEPARTAMENTO = 'ASISTENTE_DEPARTAMENTO';
    static  ASISTENTE_SECCION = 'ASISTENTE_SECCION';
    static  JEFE_DEPARTAMENTO = 'JEFE_DEPARTAMENTO';
    static  COORDINADOR = 'COORDINADOR';
}

export function currentRole() {
    try {
        const user = JSON.parse(atob(localStorage.getItem('u')));

        if (!user || !user.hasOwnProperty('tipo_usuario')) {
            return null;
        }

        switch (user.tipo_usuario) {
            case 5:
                return Role.ASISTENTE_SECCION;
            case 4:
                return Role.ASISTENTE_DEPARTAMENTO;
            case 3:
                return Role.JEFE_DEPARTAMENTO;
            case 2:
                return Role.COORDINADOR;
        }
    } catch (e) {
        console.error('Error al obtener los roles');
        return null;
    }

}

