<template>
	<div>
		<button
			@click="logContent"
		>
			log content
		</button>
		<pdf
			ref="myPdfComponent"
			src="https://cdn.jsdelivr.net/gh/mozilla/pdf.js@c6e8ca86/test/pdfs/calrgb.pdf"
      :rotate="1"
		></pdf>
	</div>
</template>

<script>

import pdf from 'vue-pdf'

export default {
	components: {
		pdf
	},
	methods: {
		logContent() {

			this.$refs.myPdfComponent.pdf.forEachPage(function(page) {
console.log(page);
				return page.getTextContent()
				.then(function(content) {

					var text = content.items.map(item => item.str);
					// console.log(text);
				})
			});
		}
	}
}

</script>