// types.ts
export interface WindowQuery {
    coatingNumber: number;
    glassPanelNumber: number;
    year: number;
    uValue?: number;
}

export interface CalculationResult {
    calculatedUValue: number;
    recycling: {
        value: number;
        color: string;
    };
    reuseGlass: {
        value: number;
        color: string;
    };
    reuseSashes: {
        value: number;
        color: string;
    };
    reuseWindow: {
        value: number;
        color: string;
    };
}

// constants.ts
export const CONSTANTS = {
    HIGH: 3,
    MEDIUM: 2,
    LOW: 1,
    YEAR_LIMITS: [1990, 2010, 2025],
    U_VALUE_LIMITS: [0.7, 1.2, 1.8],
};

// windowCalculator.ts
export class WindowOpportunitiesCalculator {
    private getStatusColor(value: number): string {
        switch (value) {
            case CONSTANTS.HIGH:
                return 'green';
            case CONSTANTS.MEDIUM:
                return 'orange';
            case CONSTANTS.LOW:
                return 'red';
            default:
                return 'grey';
        }
    }

    private calculateUValue(query: WindowQuery): number {
        const { year, glassPanelNumber } = query;
        const [YEAR_LIMIT_1, YEAR_LIMIT_2] = CONSTANTS.YEAR_LIMITS;

        if (year > YEAR_LIMIT_2 && glassPanelNumber === 3) {
            return 0.4;
        } else if (year > YEAR_LIMIT_2 && glassPanelNumber === 2) {
            return 1.0;
        } else if (year > YEAR_LIMIT_1 && year < YEAR_LIMIT_2 && glassPanelNumber === 3) {
            return 0.8;
        } else if (year > YEAR_LIMIT_1 && year < YEAR_LIMIT_2 && glassPanelNumber === 2) {
            return 1.1;
        } else if (year < YEAR_LIMIT_1 && glassPanelNumber === 3) {
            return 1.9;
        } else if (year < YEAR_LIMIT_1 && glassPanelNumber === 2) {
            return 2.7;
        }
        return query.uValue || 1.5;
    }

    private calculateRecycling(coatingNumber: number): number {
        switch (coatingNumber) {
            case 0:
                return CONSTANTS.HIGH;
            case 1:
                return CONSTANTS.MEDIUM;
            case 2:
                return CONSTANTS.LOW;
            default:
                throw new Error('Invalid coating number');
        }
    }

    private calculateReuseGlass(glassPanelNumber: number, uValue: number): number {
        const [LIMIT_1, LIMIT_2, LIMIT_3] = CONSTANTS.U_VALUE_LIMITS;

        if (glassPanelNumber === 3 && uValue < LIMIT_1) {
            return CONSTANTS.HIGH;
        } else if (glassPanelNumber === 2 && uValue < LIMIT_2) {
            return CONSTANTS.HIGH;
        } else if (glassPanelNumber === 3 && uValue < LIMIT_2 && uValue > LIMIT_1) {
            return CONSTANTS.MEDIUM;
        } else if (glassPanelNumber === 2 && uValue < LIMIT_2 && uValue > LIMIT_1) {
            return CONSTANTS.MEDIUM;
        } else if (glassPanelNumber === 3 && uValue > LIMIT_2) {
            return CONSTANTS.LOW;
        } else if (glassPanelNumber === 2 && uValue > LIMIT_3) {
            return CONSTANTS.LOW;
        }
        return CONSTANTS.LOW;
    }

    private calculateReuseSashes(glassPanelNumber: number, uValue: number): number {
        // Same logic as calculateReuseGlass
        return this.calculateReuseGlass(glassPanelNumber, uValue);
    }

    private calculateReuseWindow(year: number, uValue: number): number {
        const [YEAR_LIMIT_1, YEAR_LIMIT_2, YEAR_LIMIT_3] = CONSTANTS.YEAR_LIMITS;
        const [LIMIT_1, LIMIT_2, LIMIT_3] = CONSTANTS.U_VALUE_LIMITS;

        if (year > YEAR_LIMIT_2 && year < YEAR_LIMIT_3 && uValue < LIMIT_1) {
            return CONSTANTS.HIGH;
        } else if (year > YEAR_LIMIT_2 && year < YEAR_LIMIT_3 && uValue < LIMIT_2 && uValue > LIMIT_1) {
            return CONSTANTS.MEDIUM;
        } else if (year > YEAR_LIMIT_1 && year < YEAR_LIMIT_2) {
            return CONSTANTS.MEDIUM;
        } else if (year < YEAR_LIMIT_1 && uValue < LIMIT_1 && uValue > LIMIT_3) {
            return CONSTANTS.LOW;
        } else if ((year < YEAR_LIMIT_1 || year > YEAR_LIMIT_3) && uValue < LIMIT_2) {
            return CONSTANTS.LOW;
        } else if ((year < YEAR_LIMIT_1 || year > YEAR_LIMIT_3) && uValue > LIMIT_2) {
            return CONSTANTS.LOW;
        }
        return CONSTANTS.LOW;
    }

    public calculate(query: WindowQuery): CalculationResult {
        // Input validation
        if (![0, 1, 2].includes(query.coatingNumber)) {
            throw new Error('Invalid coating number. Must be 0, 1, or 2.');
        }
        if (![2, 3].includes(query.glassPanelNumber)) {
            throw new Error('Invalid glass panel number. Must be 2 or 3.');
        }

        const calculatedUValue = this.calculateUValue(query);
        const recyclingValue = this.calculateRecycling(query.coatingNumber);
        const reuseGlassValue = this.calculateReuseGlass(query.glassPanelNumber, calculatedUValue);
        const reuseSashesValue = this.calculateReuseSashes(query.glassPanelNumber, calculatedUValue);
        const reuseWindowValue = this.calculateReuseWindow(query.year, calculatedUValue);

        return {
            calculatedUValue,
            recycling: {
                value: recyclingValue,
                color: this.getStatusColor(recyclingValue),
            },
            reuseGlass: {
                value: reuseGlassValue,
                color: this.getStatusColor(reuseGlassValue),
            },
            reuseSashes: {
                value: reuseSashesValue,
                color: this.getStatusColor(reuseSashesValue),
            },
            reuseWindow: {
                value: reuseWindowValue,
                color: this.getStatusColor(reuseWindowValue),
            },
        };
    }
}

// Example usage with Express:
// api.ts
// import express from 'express';
// import { WindowOpportunitiesCalculator } from './windowCalculator';
// import { WindowQuery } from './types';

// const router = express.Router();
// const calculator = new WindowOpportunitiesCalculator();

// router.post('/calculate', (req: express.Request, res: express.Response) => {
//     try {
//         const query: WindowQuery = {
//             coatingNumber: Number(req.body.coatingNumber),
//             glassPanelNumber: Number(req.body.glassPanelNumber),
//             year: Number(req.body.year),
//             uValue: req.body.uValue ? Number(req.body.uValue) : undefined,
//         };

//         const result = calculator.calculate(query);
//         res.json(result);
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// });

// export default router;
