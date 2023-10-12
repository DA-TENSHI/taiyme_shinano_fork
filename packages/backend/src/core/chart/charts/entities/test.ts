/*
 * SPDX-FileCopyrightText: syuilo and other misskey contributors
 * SPDX-FileCopyrightText: Copyright © 2023 taiy https://github.com/taiyme
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import Chart from '../../core.js';

export const name = 'test';

export const schema = {
	'foo.total': { accumulate: true },
	'foo.inc': {},
	'foo.dec': {},
} as const;

export const entity = Chart.schemaToEntity(name, schema);
