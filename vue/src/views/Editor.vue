<template>
    <div id="editor">
        <!-- Tips: Editor.md can auto append a `<textarea>` tag -->
        <mavon-editor v-model="value"
                      codeStyle="   "
                      placeholder="写点东西吧"
        />
        <textarea v-model="value">

        </textarea>
    </div>
</template>

<script>
    // Local Registration
    // import mavonEditor from 'mavon-editor'
    let mavonEditor = require('mavon-editor')
    import 'mavon-editor/dist/css/index.css'

    export default {
        name: 'editor2',
        data() {
            return {
                value: ""
            }
        },

        components: {
            'mavon-editor': mavonEditor.mavonEditor
        }
    }
</script>
