/*
 * SPDX-FileCopyrightText: syuilo and other misskey contributors
 * SPDX-FileCopyrightText: Copyright © 2023 taiy https://github.com/taiyme
 * SPDX-License-Identifier: AGPL-3.0-only
 */

export const packedHashtagSchema = {
	type: 'object',
	properties: {
		tag: {
			type: 'string',
			optional: false, nullable: false,
			example: 'misskey',
		},
		mentionedUsersCount: {
			type: 'number',
			optional: false, nullable: false,
		},
		mentionedLocalUsersCount: {
			type: 'number',
			optional: false, nullable: false,
		},
		mentionedRemoteUsersCount: {
			type: 'number',
			optional: false, nullable: false,
		},
		attachedUsersCount: {
			type: 'number',
			optional: false, nullable: false,
		},
		attachedLocalUsersCount: {
			type: 'number',
			optional: false, nullable: false,
		},
		attachedRemoteUsersCount: {
			type: 'number',
			optional: false, nullable: false,
		},
	},
} as const;
