/*
 * SPDX-FileCopyrightText: syuilo and other misskey contributors
 * SPDX-FileCopyrightText: Copyright © 2023 taiy https://github.com/taiyme
 * SPDX-License-Identifier: AGPL-3.0-only
 */

export class logMessageLength1622681548499 {
    constructor() {
        this.name = 'logMessageLength1622681548499';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "log" ALTER COLUMN "message" TYPE character varying(2048)`, undefined);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "log" ALTER COLUMN "message" TYPE character varying(1024)`, undefined);
    }
}
