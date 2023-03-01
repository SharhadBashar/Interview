import _Error from 'isotropic-error';
import _later from 'isotropic-later';
import _make from 'isotropic-make';
import _Pubsub from 'isotropic-pubsub';

export default _make(_Pubsub, {
    closeGate ({
        gateId
    }) {
        return this._simulateRequestResponse(() => this._closeGate({
            gateId
        }));
    },
    fetchGateIdSet () {
        return this._simulateRequestResponse(() => this._fetchGateIdSet());
    },
    fetchGateStatus ({
        gateId
    }) {
        return this._simulateRequestResponse(() => this._fetchGateStatus({
            gateId
        }));
    },
    openGate ({
        gateId
    }) {
        return this._simulateRequestResponse(() => this._openGate({
            gateId
        }));
    },
    _closeGate ({
        gateId
    }) {
        switch (this._gateStatusById[gateId]) {
            case 'closed':
            case 'closing':
            case 'opening':
                throw _Error({
                    details: {
                        gateId
                    },
                    message: '409 Can not close gate at this time'
                });
            case 'open':
                break;
            default:
                throw _Error({
                    details: {
                        gateId
                    },
                    message: '404 Gate not found'
                });
        }

        if (this._isClosingOrOpening) {
            throw _Error({
                details: {
                    gateId
                },
                message: '409 Can not close gate at this time'
            });
        }

        return new Promise(resolve => {
            this._after('gateClosed', event => {
                if (event.data.gateId === gateId) {
                    event.unsubscribe();
                    resolve();
                }
            });

            this._publish('gateClosing', {
                gateId
            });
        });
    },
    get _delay () {
        return Math.random() * 144;
    },
    _eventGateClosed ({
        data: {
            gateId
        }
    }) {
        this._gateStatusById[gateId] = 'closed';

        this._log(`gate ${gateId} closed`);

        _later(this._cooldownDuration, () => {
            this._publish('ready');
        });
    },
    _eventGateClosing ({
        data: {
            gateId
        }
    }) {
        this._gateStatusById[gateId] = 'closing';
        this._isClosingOrOpening = true;

        this._log(`gate ${gateId} closing`);

        _later(this._delay + this._closeDuration, () => {
            this._publish('gateClosed', {
                gateId
            });
        });
    },
    _eventGateOpen ({
        data: {
            gateId
        }
    }) {
        this._gateStatusById[gateId] = 'open';

        this._log(`gate ${gateId} open`);

        _later(this._cooldownDuration, () => {
            this._publish('ready');
        });
    },
    _eventGateOpening ({
        data: {
            gateId
        }
    }) {
        this._gateStatusById[gateId] = 'opening';
        this._isClosingOrOpening = true;

        this._log(`gate ${gateId} opening`);

        _later(this._delay + this._openDuration, () => {
            this._publish('gateOpen', {
                gateId
            });
        });
    },
    _eventReady () {
        this._isClosingOrOpening = false;

        this._log('gate manager ready');
    },
    _fetchGateIdSet () {
        this._log(`gate ids: ${Array.from(this._gateIdSet).join(', ')}`);

        return new Set(this._gateIdSet);
    },
    _fetchGateStatus ({
        gateId
    }) {
        const gateStatus = this._gateStatusById[gateId];

        if (!gateStatus) {
            throw _Error({
                details: {
                    gateId
                },
                message: '404 Gate not found'
            });
        }

        this._log(`gate ${gateId} is ${gateStatus}`);

        return gateStatus;
    },
    _init ({
        closeDuration = 377,
        cooldownDuration = 987,
        gateStatusById = {},
        openDuration = 610
    } = {}) {
        Reflect.apply(_Pubsub.prototype._init, this, []);

        this._closeDuration = closeDuration;
        this._cooldownDuration = cooldownDuration;
        this._gateIdSet = new Set(Object.keys(gateStatusById));
        this._gateStatusById = gateStatusById;
        this._initTime = Date.now();
        this._isClosingOrOpening = false;
        this._openDuration = openDuration;

        return this._validateStatus();
    },
    _log (message) {
        console.log(Date.now() - this._initTime, message);
    },
    _openGate ({
        gateId
    }) {
        switch (this._gateStatusById[gateId]) {
            case 'closed':
                break;
            case 'closing':
            case 'open':
            case 'opening':
                throw _Error({
                    details: {
                        gateId
                    },
                    message: '409 Can not open gate at this time'
                });
            default:
                throw _Error({
                    details: {
                        gateId
                    },
                    message: '404 Gate not found'
                });
        }

        if (this._isClosingOrOpening) {
            throw _Error({
                details: {
                    gateId
                },
                message: '409 Can not open gate at this time'
            });
        }

        return new Promise(resolve => {
            this._after('gateOpen', event => {
                if (event.data.gateId === gateId) {
                    event.unsubscribe();
                    resolve();
                }
            });

            this._publish('gateOpening', {
                gateId
            });
        });
    },
    _simulateRequestResponse (handleFunction) {
        return new Promise((resolve, reject) => {
            _later(this._delay, async () => {
                try {
                    const returnValue = await handleFunction();

                    _later(this._delay, () => {
                        resolve(returnValue);
                    });
                } catch (error) {
                    _later(this._delay, () => {
                        reject(_Error({
                            error
                        }));
                    });
                }
            });
        });
    },
    _validateStatus () {
        let isClosingOrOpening = false;

        for (const gateId of this._gateIdSet) {
            const gateStatus = this._gateStatusById[gateId];

            switch (gateStatus) {
                case 'closed':
                case 'open':
                    break;
                case 'closing':
                case 'opening':
                    if (isClosingOrOpening) {
                        throw _Error({
                            details: {
                                gateId
                            },
                            message: 'Multiple gates can not be closed or opened at the same time'
                        });
                    }

                    isClosingOrOpening = true;
                    break;
                default:
                    throw _Error({
                        details: {
                            gateId,
                            gateStatus
                        },
                        message: 'Gate has invalid status'
                    });
            }
        }

        this._isClosingOrOpening = isClosingOrOpening;
        this._publish('ready');
        return this;
    }
}, {
    _events: {
        gateClosed: {
            allowPublicPublish: false,
            allowPublicSubscription: false,
            allowPublicUnsubscription: false,
            defaultFunction: '_eventGateClosed'
        },
        gateClosing: {
            allowPublicPublish: false,
            allowPublicSubscription: false,
            allowPublicUnsubscription: false,
            defaultFunction: '_eventGateClosing'
        },
        gateOpen: {
            allowPublicPublish: false,
            allowPublicSubscription: false,
            allowPublicUnsubscription: false,
            defaultFunction: '_eventGateOpen'
        },
        gateOpening: {
            allowPublicPublish: false,
            allowPublicSubscription: false,
            allowPublicUnsubscription: false,
            defaultFunction: '_eventGateOpening'
        },
        ready: {
            allowPublicPublish: false,
            allowPublicSubscription: false,
            allowPublicUnsubscription: false,
            defaultFunction: '_eventReady'
        }
    }
});
