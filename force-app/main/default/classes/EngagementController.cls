public with sharing class EngagementController {

    @AuraEnabled(cacheable=true)
    public static EngagementSummary getEngagementSummary(Id engagementId) {
        try {
            Integer completedTasks = [SELECT count() FROM Task WHERE WhatId = :engagementId AND Status = 'Completed'];
            Integer upcomingEvents = [SELECT count() FROM Event WHERE WhatId = :engagementId AND StartDateTime >= :DateTime.now()];
            Engagement__c eng = [SELECT Related_Opportunity__r.Amount FROM Engagement__c WHERE Id = :engagementId LIMIT 1];
            Decimal oppAmount = (eng.Related_Opportunity__r != null) ? eng.Related_Opportunity__r.Amount : 0;

            return new EngagementSummary(completedTasks, upcomingEvents, oppAmount);
        } catch (Exception e) {
            throw new AuraHandledException('Error retrieving engagement data: ' + e.getMessage());
        }
    }

    public class EngagementSummary {
        @AuraEnabled public Integer completedTasks;
        @AuraEnabled public Integer upcomingEvents;
        @AuraEnabled public Decimal opportunityAmount;

        public EngagementSummary(Integer ct, Integer ue, Decimal amt) {
            this.completedTasks = ct;
            this.upcomingEvents = ue;
            this.opportunityAmount = amt;
        }
    }
}