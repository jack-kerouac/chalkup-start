'use strict';

angular.module('chalkupStartApp')
    .factory('feedbackService', function LoadingIndicator() {
        return {
            openFeedbackPanel: function() {
                UserVoice.push(['show', { mode: 'contact' }]);
            }
        };
    });
