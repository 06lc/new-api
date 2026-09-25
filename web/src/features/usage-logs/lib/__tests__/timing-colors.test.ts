/*
Copyright (C) 2023-2026 QuantumNous

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program. If not, see <https://www.gnu.org/licenses/>.

For commercial licensing, please contact support@quantumnous.com
*/
import { describe, expect, test } from 'vitest'

import {
  getFirstResponseTimeColor,
  getResponseTimeColor,
  getTimeColor,
} from '../format'

describe('usage log timing colors', () => {
  test.each([
    [19.999, 'success'],
    [20, 'warning'],
    [59.999, 'warning'],
    [60, 'danger'],
  ])('classifies first-token latency at %s seconds', (seconds, color) => {
    expect(getFirstResponseTimeColor(seconds)).toBe(color)
  })

  test.each([
    [39.999, 'success'],
    [40, 'warning'],
    [89.999, 'warning'],
    [90, 'danger'],
  ])('classifies duration at %s seconds', (seconds, color) => {
    expect(getTimeColor(seconds)).toBe(color)
  })

  test('uses duration thresholds when throughput is not eligible', () => {
    expect(getResponseTimeColor(40, 99)).toBe('warning')
    expect(getResponseTimeColor(90, 99)).toBe('danger')
  })
})
