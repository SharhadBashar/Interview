import _exercise1 from './exercise-1.js';
import _GateManager from './gate-manager.js';

_exercise1(_GateManager({
    gateStatusById: {
        east: 'open',
        north: 'closed',
        northWest: 'closed',
        southEast: 'closed',
        southWest: 'closed'
    }
}));
