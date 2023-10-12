/*
 * SPDX-FileCopyrightText: syuilo and other misskey contributors
 * SPDX-FileCopyrightText: Copyright © 2023 taiy https://github.com/taiyme
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { QueryFailedError } from 'typeorm';

export function isDuplicateKeyValueError(e: unknown | Error): boolean {
	return e instanceof QueryFailedError && e.driverError.code === '23505';
}
