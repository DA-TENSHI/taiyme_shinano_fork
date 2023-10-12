/*
 * SPDX-FileCopyrightText: syuilo and other misskey contributors
 * SPDX-FileCopyrightText: Copyright © 2023 taiy https://github.com/taiyme
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { Injectable } from '@nestjs/common';
import { Endpoint } from '@/server/api/endpoint-base.js';
import endpoints from '../endpoints.js';

export const meta = {
	requireCredential: false,

	tags: ['meta'],
} as const;

export const paramDef = {
	type: 'object',
	properties: {
		endpoint: { type: 'string' },
	},
	required: ['endpoint'],
} as const;

@Injectable()
export default class extends Endpoint<typeof meta, typeof paramDef> { // eslint-disable-line import/no-default-export
	constructor(
	) {
		super(meta, paramDef, async (ps) => {
			const ep = endpoints.find(x => x.name === ps.endpoint);
			if (ep == null) return null;
			return {
				params: Object.entries(ep.params.properties ?? {}).map(([k, v]) => ({
					name: k,
					type: v.type ? v.type.charAt(0).toUpperCase() + v.type.slice(1) : 'string',
				})),
			};
		});
	}
}
