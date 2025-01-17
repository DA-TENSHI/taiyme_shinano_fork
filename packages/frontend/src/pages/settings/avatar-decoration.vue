<!--
SPDX-FileCopyrightText: syuilo and misskey-project
SPDX-License-Identifier: AGPL-3.0-only
-->

<template>
	<MkStickyContainer>
		<template #header><MkPageHeader :actions="headerActions" :tabs="headerTabs"/></template>
		<MkSpacer :contentMax="900">
			<div>
				<div v-if="!loading" class="_gaps">
					<MkInfo>{{ i18n.tsx._profile.avatarDecorationMax({ max: $i.policies.avatarDecorationLimit }) }} ({{ i18n.tsx.remainingN({ n: $i.policies.avatarDecorationLimit - $i.avatarDecorations.length }) }})</MkInfo>

					<MkAvatar :class="$style.avatar" :user="$i" forceShowDecoration/>

					<div v-if="$i.avatarDecorations.length > 0" v-panel :class="$style.current" class="_gaps_s">
						<div>{{ i18n.ts.inUse }}</div>

						<div :class="$style.decorations">
							<XDecoration
								v-for="(avatarDecoration, i) in $i.avatarDecorations"
								:key="avatarDecoration.id"
								:decoration="avatarDecorations.find(d => d.id === avatarDecoration.id)!"
								:angle="avatarDecoration.angle"
								:flipH="avatarDecoration.flipH"
								:offsetX="avatarDecoration.offsetX"
								:offsetY="avatarDecoration.offsetY"
								:active="true"
								@click="openDecoration(avatarDecorations.find(d => d.id === avatarDecoration.id)!, i)"
							/>
						</div>

						<MkButton danger @click="detachAllDecorations">{{ i18n.ts.detachAll }}</MkButton>
					</div>

					<div :class="$style.decorations">
						<XDecoration
							v-for="(avatarDecoration, i) in $i.avatarDecorations"
							:key="avatarDecoration.id"
							:decoration="avatarDecorations.find(d => d.id === avatarDecoration.id)!"
							:angle="avatarDecoration.angle"
							:flipH="avatarDecoration.flipH"
							:offsetX="avatarDecoration.offsetX"
							:offsetY="avatarDecoration.offsetY"
							:active="true"
							@click="openDecoration(avatarDecorations.find(d => d.id === avatarDecoration.id)!, i)"
						/>
					</div>
				</div>
				<div v-else>
					<MkLoading/>
				</div>
			</div>
		</MkSpacer>
	</MkStickyContainer>
</template>

<script lang="ts" setup>
import { ref, defineAsyncComponent, computed } from 'vue';
import * as Misskey from 'misskey-js';
import XDecoration from './avatar-decoration.decoration.vue';
import MkButton from '@/components/MkButton.vue';
import * as os from '@/os.js';
import { misskeyApi } from '@/scripts/misskey-api.js';
import { i18n } from '@/i18n.js';
import { signinRequired } from '@/account.js';
import MkInfo from '@/components/MkInfo.vue';
import { definePageMetadata } from '@/scripts/page-metadata.js';

type AvatarDecoration = Misskey.entities.GetAvatarDecorationsResponse[number];
type AvatarDecorationWithPosition = Omit<Misskey.entities.UserDetailed['avatarDecorations'][number], 'id' | 'url'>;

const $i = signinRequired();

const loading = ref(true);
const avatarDecorations = ref<AvatarDecoration[]>([]);

misskeyApi('get-avatar-decorations').then(_avatarDecorations => {
	avatarDecorations.value = _avatarDecorations;
	loading.value = false;
});

function openDecoration(avatarDecoration: AvatarDecoration, index?: number) {
	const { dispose } = os.popup(defineAsyncComponent(() => import('./avatar-decoration.dialog.vue')), {
		decoration: avatarDecoration,
		usingIndex: index ?? null,
	}, {
		'attach': async (payload: AvatarDecorationWithPosition) => {
			const decoration = {
				...payload,
				id: avatarDecoration.id,
				url: avatarDecoration.url,
			} as const satisfies AvatarDecorationWithPosition & Pick<AvatarDecoration, 'id' | 'url'>;
			const update = [...$i.avatarDecorations, decoration];
			await os.apiWithDialog('i/update', {
				avatarDecorations: update,
			});
			$i.avatarDecorations = update;
		},
		'update': async (payload: AvatarDecorationWithPosition) => {
			if (index == null) return;
			const decoration = {
				...payload,
				id: avatarDecoration.id,
				url: avatarDecoration.url,
			} as const satisfies AvatarDecorationWithPosition & Pick<AvatarDecoration, 'id' | 'url'>;
			const update = [...$i.avatarDecorations];
			update[index] = decoration;
			await os.apiWithDialog('i/update', {
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				avatarDecorations: update.map(({ url, ...d }) => d),
			});
			$i.avatarDecorations = update;
		},
		'detach': async () => {
			if (index == null) return;
			const update = [...$i.avatarDecorations];
			update.splice(index, 1);
			await os.apiWithDialog('i/update', {
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				avatarDecorations: update.map(({ url, ...d }) => d),
			});
			$i.avatarDecorations = update;
		},
		closed: () => dispose(),
	});
}

function detachAllDecorations() {
	os.confirm({
		type: 'warning',
		text: i18n.ts.areYouSure,
	}).then(async ({ canceled }) => {
		if (canceled) return;
		await os.apiWithDialog('i/update', {
			avatarDecorations: [],
		});
		$i.avatarDecorations = [];
	});
}

const headerActions = computed(() => []);

const headerTabs = computed(() => []);

definePageMetadata(() => ({
	title: i18n.ts.avatarDecorations,
	icon: 'ti ti-sparkles',
}));
</script>

<style lang="scss" module>
.avatar {
	display: inline-block;
	width: 72px;
	height: 72px;
	margin: 16px auto;
}

.current {
	padding: 16px;
	border-radius: var(--MI-radius);
}

.decorations {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
	gap: 12px;
}
</style>
