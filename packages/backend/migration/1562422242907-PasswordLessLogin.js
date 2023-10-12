/*
 * SPDX-FileCopyrightText: syuilo and other misskey contributors
 * SPDX-FileCopyrightText: Copyright © 2023 taiy https://github.com/taiyme
 * SPDX-License-Identifier: AGPL-3.0-only
 */

export class PasswordLessLogin1562422242907 {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "user_profile" ADD COLUMN "usePasswordLessLogin" boolean DEFAULT false NOT NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "user_profile" DROP COLUMN "usePasswordLessLogin"`);
    }
}
