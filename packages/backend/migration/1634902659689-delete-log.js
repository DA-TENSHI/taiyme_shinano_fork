/*
 * SPDX-FileCopyrightText: syuilo and other misskey contributors
 * SPDX-FileCopyrightText: Copyright © 2023 taiy https://github.com/taiyme
 * SPDX-License-Identifier: AGPL-3.0-only
 */

export class deleteLog1634902659689 {
    constructor() {
        this.name = 'deleteLog1634902659689';
    }
    async up(queryRunner) {
        await queryRunner.query(`DROP TABLE "log"`);
    }
    async down(queryRunner) {
    }
}
