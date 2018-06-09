# Habilitar el SSH Tunnel 

- Descargar, instalar y abrir PuTTY [link](https://the.earth.li/~sgtatham/putty/latest/w64/putty-64bit-0.70-installer.msi)

- ingresar los datos de la sesion, hacer click en *Default Settings* y luego en *Save*

![](https://raw.githubusercontent.com/eduardo0099/interfaz-gestion-docente/develop/ssh_tunnel/resources/1.PNG)

- Ir a Connections > SSH > Tunnels

![](https://raw.githubusercontent.com/eduardo0099/interfaz-gestion-docente/develop/ssh_tunnel/resources/2.PNG)

- En *Source Port* colocar **8080** y en *Destination* **127.0.0.1:8080**, hacer click en Add

![](https://raw.githubusercontent.com/eduardo0099/interfaz-gestion-docente/develop/ssh_tunnel/resources/3.PNG)

- Deberia quedar asi

![](https://raw.githubusercontent.com/eduardo0099/interfaz-gestion-docente/develop/ssh_tunnel/resources/4.PNG)

- Ir a Connection  > SSH

![](https://raw.githubusercontent.com/eduardo0099/interfaz-gestion-docente/develop/ssh_tunnel/resources/5.PNG)

- Marcar la opcion *Don't start a shell or command at all* 

- Ir a Session, volver a seleccionar *Default Settings* y hacer click en *Save*

- Hacer click en *Open*, debe aparecer la siguiente ventana (La primera vez que se haga esto saldra un modal con yes/no/cancel, hacer click en yes)

![](https://raw.githubusercontent.com/eduardo0099/interfaz-gestion-docente/develop/ssh_tunnel/resources/7.PNG)

- Copiar y pegar la contrase;a (En putty se pega presionando click derecho), la ventana deberia quedar asi:

![](https://raw.githubusercontent.com/eduardo0099/interfaz-gestion-docente/develop/ssh_tunnel/resources/8.PNG)

- Probar que la conexion este bien yendo a http://localhost:8080/general/cicloActual

Nota: esta ventana es la que mantiene viva la conexion con el puerto 8080 del servidor, si la cierran se va la conexion, para volver a establecerla, solo deben abrir putty, hacer click en *Default Settings* luego en *load* y por ultimo en *Open* e ingresar el password
