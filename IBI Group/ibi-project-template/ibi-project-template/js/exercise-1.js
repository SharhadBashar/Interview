/* eslint-disable no-restricted-globals */
import _async from './async.js';

export default (gateManager, callbackFunction) => {
    _async gateManager.fetchGateIdSet((error, gateIdSet) => {
        if (error) {
            callbackFunction(error);
            return;
        }

        const closedGateIds = [];

        _async.each(Array.from(gateIdSet), (gateId, callbackFunction) => {
            gateManager.fetchGateStatus({
                gateId
            }, (error, gateStatus) => {
                if (error) {
                    callbackFunction(error);
                    return;
                }
                console.log(gateId, gateStatus);
                if (gateStatus === 'closed') {
                    closedGateIds.push(gateId);
                }

                callbackFunction();
            });
        }, error => {
            if (error) {
                callbackFunction(error);
                return;
            }

            _async.eachSeries(closedGateIds, (gateId, callbackFunction) => {
                gateManager.openGate({
                    gateId
                }, error => {
                    if (error) {
                        callbackFunction(error);
                        return;
                    }

                    setTimeout(() => {
                        callbackFunction();
                    }, 1000);
                });
            }, error => {
                if (error) {
                    callbackFunction(error);
                } else {
                    callbackFunction();
                }
            });
        });
    });
};
