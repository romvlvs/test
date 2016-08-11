Polymer({
    is: 'kws-app',
    behaviors: [
        Polymer.AppLocalizeBehavior
    ],
    properties: {
        language: {
            type: String,
            value: "en"
        },
        page: String,
        availableLanguages: {
            type: Array,
            value: function() {
                return [{
                    name: "en",
                    title: "langButtonEN",
                    icon: "https://cdn3.iconfinder.com/data/icons/142-mini-country-flags-16x16px/32/flag-usa2x.png"
                }, {
                    name: "de",
                    title: "langButtonDE",
                    icon: "https://cdn3.iconfinder.com/data/icons/142-mini-country-flags-16x16px/32/flag-germany2x.png"
                }, {
                    name: "by",
                    title: "langButtonBY",
                    icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Flag_of_Bavaria_%28lozengy%29.svg/200px-Flag_of_Bavaria_%28lozengy%29.svg.png"
                }];
            }
        }
    },
    observers: [
        "_routeChanged(routeData.page, subrouteData.id)",
        "_routeChanged(routeData.page)"
    ],
    _getActivityDetails: function(aActivities, nId) {
        if (!aActivities || nId === null) {
            return;
        }
        for (var i = 0; i < aActivities.length; i++) {
            if (aActivities[i].id === nId) {
                return aActivities[i];
            }
        }
    },
    attached: function() {
        this.loadResources(this.resolveUrl('locales.json'));
    },
    _routeChanged: function(sPage, sId) {
        if (sPage === "activities" && (sId !== undefined && sId !== "")) {
            this.page = "detail";
        }
         else if (sPage === "activities" || sPage === "") {
            this.page = "activities";
        } else {
            this.routeData = {
                page: "activities"
            };
        }
    }
});
