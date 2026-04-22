import { LightningElement, api, wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { createRecord } from 'lightning/uiRecordApi';
import getEngagementSummary from '@salesforce/apex/EngagementController.getEngagementSummary';
import { refreshApex } from '@salesforce/apex';

export default class EngagementSummary extends LightningElement {
    @api recordId; // Recibe el ID del registro actual automáticamente

    // Inyectamos el método de Apex de forma reactiva
    @wire(getEngagementSummary, { engagementId: '$recordId' })
    summary;

    // Lógica para el botón "Quick Follow-Up Call"
    handleFollowUp() {
        // Calculamos la fecha de mañana (tomorrow)
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);

        // Definimos los campos de la Tarea (Task)
        const fields = {
            Subject: 'Follow-up on Engagement',
            Status: 'Not Started',
            Priority: 'Normal',
            Type: 'Call',
            ActivityDate: tomorrow.toISOString().split('T')[0],
            WhatId: this.recordId // Relacionamos la tarea con este Engagement
        };

        const recordInput = { apiName: 'Task', fields };

        // Usamos el estándar UI API para crear el registro (No Apex)
        createRecord(recordInput)
            .then(() => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Follow-up Task created!',
                        variant: 'success'
                    })
                );
                // Refrescamos los datos del componente para ver el cambio
                return refreshApex(this.summary);
            })
            .catch(error => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error creating task',
                        message: error.body.message,
                        variant: 'error'
                    })
                );
            });
    }
}