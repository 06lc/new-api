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

import { parseHeaderNavModulesFromStatus } from '@/lib/nav-modules'

import {
  HEADER_NAV_DEFAULT,
  parseHeaderNavModules,
} from '../maintenance/config'

describe('header navigation defaults', () => {
  test('hides rankings, docs, and about when no saved config exists', () => {
    expect(HEADER_NAV_DEFAULT).toMatchObject({
      home: true,
      console: true,
      pricing: { enabled: true },
      rankings: { enabled: false },
      docs: false,
      about: false,
    })
    expect(parseHeaderNavModules('')).toEqual(HEADER_NAV_DEFAULT)
    expect(parseHeaderNavModulesFromStatus(null)).toEqual(HEADER_NAV_DEFAULT)
  })

  test('preserves explicitly saved visibility settings', () => {
    const savedConfig = JSON.stringify({
      rankings: { enabled: true, requireAuth: false },
      docs: true,
      about: true,
    })

    expect(parseHeaderNavModules(savedConfig)).toMatchObject({
      rankings: { enabled: true },
      docs: true,
      about: true,
    })
  })
})
