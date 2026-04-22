# Acme Services - Engagement Management Solution 

## Descripción del Proyecto
Esta solución fue desarrollada para **Acme Services** con el objetivo de centralizar la gestión de consultorías (Engagements). La arquitectura permite conectar cuentas, oportunidades y proyectos, ofreciendo visibilidad en tiempo real de métricas financieras y automatización de procesos.

## Stack Tecnológico
- **LWC (Lightning Web Components):** Interfaz dinámica para el resumen de métricas.
- **Apex:** Controller optimizado con *Wrapper Classes* para la agregación de datos.
- **Record-Triggered Flows:** Automatización proactiva de tareas de seguimiento.
- **SOQL:** Consultas eficientes para relaciones Lookup.
- **Reports & Dashboards:** Visualización de la salud del pipeline.

## Funcionalidades Clave

### 1. Resumen de Engagement (LWC + Apex)
Se implementó un componente visual que muestra el **Total de Horas Logueadas** y el **Presupuesto Total** de todas las Oportunidades vinculadas.
> **Nota técnica:** Se utilizó una *Wrapper Class* en Apex para empaquetar múltiples métricas en una sola llamada al servidor, optimizando el rendimiento.

### 2. Automatización de Tareas (Flow)
Cada vez que una **Opportunity** asociada alcanza la etapa de `Negotiation/Review`, el sistema crea automáticamente una tarea de seguimiento ("Prepare proposal") asignada al Engagement.
> **Best Practice:** Se optó por un flujo declarativo en lugar de un Trigger para facilitar el mantenimiento futuro por parte de administradores.

### 3. Modelo de Datos Relacional
Se creó el objeto personalizado `Engagement__c` con relaciones Lookup hacia:
- **Account:** Para identificar al cliente.
- **Opportunity:** Para rastrear el origen financiero del proyecto.

## Reportes
Se configuró un reporte de **Engagement Pipeline** agrupado por `Status`, permitiendo a los directivos visualizar la carga de trabajo actual mediante gráficos integrados.
