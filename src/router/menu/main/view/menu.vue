<template>
	<div>
		<img src="../../../../assets/img/logo.png" alt="">
		<ul>
			<li v-for='list in lists'>
				<a :href="list.url" title="">{{list.name}}</a>
			</li>
		</ul>
		<button type="button" @click='startMusic'>开始音乐</button>
		<button type="button" @click='stopMusic'>停止</button>
	</div>
</template>
<script>
	import audio from '../../../../libs/audio.js'
	import fileResource from './../../../../../config/srcConfig'
	export default {
		data() {
			return {
				lists:[]
			}
		},
		created() {
			fileResource.eachTemp.forEach((getUrl, i)=> {
				this.lists.push({url: '/' + getUrl.name + '.html', name: getUrl.name_cn})
				audio.play()
			})
		},
		methods: {
			startMusic() {
				audio.play()
			},
			stopMusic() {
				audio.stop()
			}
		}
	}
</script>
<style type="text/css" media="screen">
	
</style>