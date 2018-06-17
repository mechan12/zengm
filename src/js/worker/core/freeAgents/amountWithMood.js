// @flow

import { g, helpers } from "../../util";

/**
 * Get contract amount adjusted for mood.
 *
 * @memberOf core.freeAgents
 * @param {number} amount Contract amount, in thousands of dollars or millions of dollars (fun auto-detect!).
 * @param {number} mood Player mood towards a team, from 0 (happy) to 1 (angry).
 * @return {number} Contract amoung adjusted for mood.
 */
const amountWithMood = (amount: number, mood: number = 0.5): number => {
    // Apply difficulty formula here, on the assumption that this only gets called for the user's team. If that ever changes, change this!
    let fudgeFactor = 0;
    if (mood > 0) {
        fudgeFactor = helpers.sigmoid(0.2 * (g.difficulty - 0.5), 40, 0.2);
    }

    console.log(amount, fudgeFactor, mood);
    amount *= 1 + fudgeFactor + 0.2 * mood;
    console.log(amount);

    if (amount >= g.minContract) {
        if (amount > g.maxContract) {
            amount = g.maxContract;
        }
        return 0.05 * Math.round(amount / 0.05); // Make it a multiple of 50k
    }

    if (amount > g.maxContract / 1000) {
        amount = g.maxContract / 1000;
    }
    return 0.05 * Math.round(amount / 0.05); // Make it a multiple of 50k
};

export default amountWithMood;
