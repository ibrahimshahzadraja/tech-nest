import test from 'node:test';
import assert from 'node:assert/strict';
import { validateQuantity, calculateOrder, canCompare } from './businessRules.js';

test('quantity accepts a normal valid amount', () => assert.equal(validateQuantity(2, 5).valid, true));
test('quantity accepts exactly the per-order limit when stock allows it', () => assert.equal(validateQuantity(5, 8).valid, true));
test('quantity rejects an amount above the per-order limit', () => assert.equal(validateQuantity(6, 8).valid, false));
test('quantity rejects more than available stock', () => assert.equal(validateQuantity(3, 2).valid, false));
test('delivery is free at the threshold', () => assert.equal(calculateOrder(200000).delivery, 0));
test('comparison is limited to three products', () => assert.equal(canCompare([1, 2, 3, 4]), false));
